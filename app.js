//app.js是入口文件

var koa=require('koa');//引入koa到项目里
var controller=require('koa-route');//路由
var app=koa();//koa实例化

var views=require('co-views');//中间键
var render=views('./view',{
	map:{html:'ejs'}//模板渲染类型 ejs:模板引擎
});//实例化

var koa_static=require('koa-static-server');

var service=require('./service/webAppService.js')

app.use(controller.get('/route_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body='Hello koa!';//body：返回体
}));

app.use(controller.get('/ejs_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('test',{title:'title_test'});//es6  test:模板名字
}));

app.use(koa_static({
	rootDir:'./static/',
	rootPath:'/static/',//路径可以是s或者别的
	maxage:0
}));

app.use(controller.get('/api_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body=service.get_test_data();
}));

////////////////////////////////////////
app.use(controller.get('/',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('index',{title:'书城首页'});//es6  test:模板名字
}));

var querystring=require('querystring');
app.use(controller.get('/book',function*(){
	this.set('Cache-Control','no-cache');
	var params=querystring.parse(this.req._parsedUrl.query);
	var bookId=params.id;
	this.body=yield render('book',{nav:'书籍详情',bookId:bookId}); 
}));

app.use(controller.get('/search',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('search',{nav:'搜索'});//es6  test:模板名字
}));

app.use(controller.get('/reader',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('reader'); 
}));

app.use(controller.get('/male',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('male',{nav:'男生频道'});//es6  test:模板名字
}));

app.use(controller.get('/female',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('female',{nav:'女生频道'});//es6  test:模板名字
}));

app.use(controller.get('/rank',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('rank',{nav:'排行'});
}));

app.use(controller.get('/category',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('category',{nav:'分类'}); 
}));

///////////////////////////////////////////////////
app.use(controller.get('/ajax/index',function*(){
	this.set('Cache-Control','no-cache');	
	this.body=service.get_index_data();
}));

var querystring=require('querystring');
app.use(controller.get('/ajax/book',function*(){
	this.set('Cache-Control','no-cache'); 
	var params=querystring.parse(this.req._parsedUrl.query);
	var id=params.id;
	if(!id){
		id=""
	}
	this.body=service.get_book_data(id);
}));

app.use(controller.get('/ajax/chapter',function*(){
	this.set('Cache-Control','no-cache'); 	 
	this.body=service.get_chapter_data();
}));

app.use(controller.get('/ajax/chapter_data',function*(){
	this.set('Cache-Control','no-cache'); 
	var params=querystring.parse(this.req._parsedUrl.query);
	var id=params.id;
	if(!id){
		id=""
	}
	this.body=service.get_chapter_content_data(id);
}));

app.use(controller.get('/ajax/rank',function*(){
	this.set('Cache-Control','no-cache');
	this.body=service.get_rank_data();
}));

app.use(controller.get('/ajax/male',function*(){
	this.set('Cache-Control','no-cache');
	this.body=service.get_male_data();
}));

app.use(controller.get('/ajax/female',function*(){
	this.set('Cache-Control','no-cache');
	this.body=service.get_female_data();
})); 

app.use(controller.get('/ajax/category',function*(){
	this.set('Cache-Control','no-cache');
	this.body=service.get_category_data();
}));

app.use(controller.get('/ajax/search',function*(){
	this.set('Cache-Control','no-cache');
	var querystring=require('querystring');
	var params=querystring.parse(this.req._parsedUrl.query);
	var start=params.start;
	var end=params.end;
	var keyword=params.keyword;
	this.body=yield service.get_search_data(start,end,keyword);
}));

app.listen(3002);//监听端口
console.log('koa server is started!')

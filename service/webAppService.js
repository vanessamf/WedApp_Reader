//并不直接提供数据给大家 而是把后端提供的原始数据经过一些转换然后变成一个json的数据格式传递给前端
//mock test.json 里面的数据暴露给前端或者暴露成接口，就需要这个了
var fs=require('fs');//require进来
exports.get_test_data=function(){
	var content=fs.readFileSync('./mock/test.json','utf-8');
	return content;//返回给接口
}

exports.get_chapter_data=function(){
	var content=fs.readFileSync('./mock/reader/chapter.json','utf-8');
	return content;//返回给接口
}

exports.get_chapter_content_data=function(id){
	if(!id){
		id="1"
	}
	var content=fs.readFileSync('./mock/reader/data/data'+id+'.json','utf-8');
	return content;//返回给接口
}

exports.get_index_data=function(){
	var content=fs.readFileSync('./mock/home.json','utf-8');
	return content;//返回给接口
}

exports.get_book_data=function(id){
	if(!id){
		id="18218"
	}
	var content=fs.readFileSync('./mock/book/'+id+'.json','utf-8');
	return content;//返回给接口
}

exports.get_rank_data=function(){
	var content=fs.readFileSync('./mock/rank.json','utf-8');
	return content;//返回给接口
}

exports.get_category_data=function(){
	var content=fs.readFileSync('./mock/category.json','utf-8');
	return content;//返回给接口
}

exports.get_male_data=function(){
	var content=fs.readFileSync('./mock/channel/male.json','utf-8');
	return content;//返回给接口
}
exports.get_female_data=function(){
	var content=fs.readFileSync('./mock/channel/female.json','utf-8');
	return content;//返回给接口
}
exports.get_search_data=function(start,end,keyword){
	return function(cb){
		var http=require('http');//http模块，用来发送请求的
		var qs=require('querystring');
		//{a:'1'}http://127.0.0.1/api?a=1
		var data={
			s:keyword,
			start:start,
			end:end
		};
		var content=qs.stringify(data);
		var http_request={
			hostname:'dushu.xiaomi.com',
			port:80,
			path:'/store/v0/lib/query/onebox?'+content
		}
		req_obj=http.request(http_request,function(_res){
			var content='';//返回的内容用个变量去保存它
			_res.setEncoding('utf8');
			_res.on('data',function(chunk){
				content+=chunk;
			});
			_res.on('end',function(){
				cb(null,content);
			});
		});
		
		req_obj.on('error',function(){
			
		});
		req_obj.end();
		
	}
}

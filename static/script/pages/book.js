var id=location.href.split('?id=').pop();//不传参数或者前面有别的参数的时候会报错。
$.get('/ajax/book?id='+id,function(d){
	new Vue({
		el:'#app',
		data:d,
		methods:{
			
		}
		});
},'json');
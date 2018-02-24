//连通界面和后端数据接口的一个文件
$.get('/ajax/index',function(d){
	new Vue({
		el:'#app',
		data:{
			//test:'test data'
			top:d.items[0].data.data,
			hot:d.items[1].data,
			recommend:d.items[2].data.data,
			female:d.items[3].data,
			male:d.items[4].data.data,
			free:d.items[5].data,
			topic:d.items[6].data.data,
		 
		}
	})
},'json');

var submitPost = function(){
	var data = {}; 
	data.collection = $('#postCollection').val();
	data.values = $('#postArray').val().replace(/\s+/g, '').split(',');
	$.ajax({
		method: 'post',
		url: '/api',
		data: data,
	})
	$('#postCollection').val(''); 
	$('#postArray').val(''); 
};

var submitGet = function(){
	coll = $('#getCollection').val(); 
	makeGetRequest(coll); 
};

var makeGetRequest = function(collection){
	$.ajax({
		method:'get',
		url: '/api/' + collection,
		success: appendResults
	})
};


var appendResults = function(data){
	if(data.length){
		var results = '';  
		for(var i = 0; i < data.length; i++){
			results+= data[i].name; 
			results += ', '; 
		}
		var newHtml = '<br><hr><h4> Collection ' + coll +'</h4><div>' + results + '</div>';
		$('#dataResults').html(newHtml); 
	}
	else{
		var newHtml = '<br><hr><h4> Collection ' + coll + 'is empty </h4>';
		$('#dataResults').html(newHtml); 
	}
};


var coll = window.location.pathname.slice(1); 
$(function(){
	if(coll){
		makeGetRequest(coll); 
	}
})
(function($){
	$.fn.initial=function(){
		getparkdata();
	};
	var getparkdata=function(){
		$.ajax(
				{
					url:'getParks',
					type: 'get',
					contentType: 'application/json;charset=utf-8',			
					datatype: 'json',
					success: function(data){
						var parkdata=data["body"];
						var parknum=parkdata.length;
						var cheweinum=0;
						for(var i=0;i<parkdata.length;i++){
							cheweinum+=parkdata[i].portLeftCount;
						}
						$('#parknum').text(parknum);
						$('#cheweinum').text(cheweinum);
					}
					
				}
		);
	}
	
})(jQuery);
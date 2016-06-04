(function($){
	$.fn.map={};	
	$.fn.map.initial=function(){
		mapInitial();
		optionListener();
		setInterval(getData,5000);
		
	};

	var map;
	var point;
	 var mapClusterer;
	var myIconred = new BMap.Icon("http://112.74.109.240/parkYanCheng/images/red.png", new BMap.Size(23, 25),{
	    });
	var myIcongreen = new BMap.Icon("http://112.74.109.240/parkYanCheng/images/green.png", new BMap.Size(23, 25),{
        });
    var myIconyellow = new BMap.Icon("http://112.74.109.240/parkYanCheng/images/yellow.png", new BMap.Size(23, 25),{
        });   
	var mapInitial=function(){
		map = new BMap.Map("mapyancheng",{minZoom:11,maxZoom:16});
		point = new BMap.Point(120.15755, 33.35);
		map.centerAndZoom(point, 15);	
		map.enableScrollWheelZoom();	
		var bottom_right_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT,offset:0});	
		map.addControl(bottom_right_control);//添加地图比例尺
		mapClusterer = new BMapLib.MarkerClusterer(map,{maxZoom:13,isAverangeCenter:true});
		getData();
	//	var marker = new BMap.Marker(new BMap.Point(120.15755,33.36664));  // 创建标注
		//map.addOverlay(marker);     
	};
	var data_info;
	var opts = {
				width : 250,     // 信息窗口宽度
				height: 150,     // 信息窗口高度
				title : "停车场信息:" , // 信息窗口标题
				enableMessage:true,//设置允许信息窗发送短息
			   };
	function addClickHandler(content,marker){
		marker.addEventListener("click",function(e){
			var infoWindow = new BMapLib.SearchInfoWindow(map,content,
				    {
				//    title: title, //标题
						width: 230, //宽度
						height: 180, //高度
						panel : "panel", //检索结果面板
						enableAutoPan : true, //自动平移
						enableSendToPhone: true, //是否显示发送到手机按钮
						searchTypes :[
							BMAPLIB_TAB_SEARCH,   //周边检索
							BMAPLIB_TAB_TO_HERE,  //到这里去
							BMAPLIB_TAB_FROM_HERE //从这里出发
						]
						}
					);
			var position=new BMap.Point(e.target.getPosition().lng,e.target.getPosition().lat);
			infoWindow.open(position); 
			bindReserve();
			}
		);
	}
	
	var optionListener=function(){
		$('#socia_cont .option').on('click',$(this),function(){
			 var choice = $(this).html();
			 var local = new BMap.LocalSearch(map, {
					renderOptions:{map: map}
					});
					local.search(choice);
		});
	};
	
	var showparks=function(){
	    map.clearOverlays();
		mapClusterer.clearMarkers();
		for(var i=0;i<data_info.length;i++){
		    var marker;
		 //   alert(data_info[i][3]);
		    if(data_info[i][3]==0)
		    {
		        marker= new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]),{icon: myIconred});  
		    }
			 else if(data_info[i][3]<10)
			 {
			     marker= new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]),{icon: myIconyellow}); 
			 }
			 else
			 {
			     marker= new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]),{icon: myIcongreen}); 
			 }
			var content = data_info[i][2];
			mapClusterer.addMarker(marker);
			addClickHandler(content,marker);
		}
	};
	var getData=function(){
		$.ajax({
			url:'getParks',
			type: 'get',
			contentType: 'application/json;charset=utf-8',			
			datatype: 'json',
			success: function(data){
				var parkdata=data["body"];
			//	alert(parkdata.length);
				data_info=new Array(parkdata.length);
				for(var i=0;i<parkdata.length;i++){
			//		console.log(parkdata[i].name+'\n');
					var tmparray=new Array(4);
					tmparray[0]=parkdata[i].longitude;
					tmparray[1]=parkdata[i].latitude;
					  var v_html = '<div id="tipsjt"></div>';
		                v_html += '    <h1 class="font14 green relative">' + parkdata[i].name + '<i class="i pointer" onclick="closeTip()"></i></h1>';
		                v_html += '<p class="font14">空余车位：<b class="red">' + parkdata[i].portLeftCount + '</b> 个' + (parkdata[i].portLeftCount > 0 ? '<a href="#" id="reservation" class="but_b back_orange font18 radius_3 absolute reservation" style="right:10px;" pname="' + parkdata[i].name+ '"><i class="i"></i>预定</a>' : '') + '</p>';
		                v_html += '<p class="green font14">收费标准：</p> ';
		                v_html += '  <div class="color_9">';
					tmparray[2]= v_html;
					tmparray[3]=parkdata[i].portLeftCount;
					data_info[i]=tmparray;	
				}		
				showparks();
				getPoints(parkdata);
				bindReserve();
			},
		});
	};
	var bindReserve=function(){
	   $('#reservation').off('click');
	   $('#parking_list').off('click');
	    $('#reservation').on('click',function(){
	        var name=$(this).attr('pname');
	        insertReserve(name);
	    });
	    $('#parking_list').on('click','.reservation',function(){
	        var name=$(this).attr('pname');
            insertReserve(name);
	    });
	};
	var insertReserve=function(name){
	      if ($('#islogin').text()!="yes") {
           alert("预定请先登录!");
           var modal = new $.Modal('errorHandle', "失败", "操作失败");
            modal.show();
           return;
       };
	    $.ajax({
	        url:"/parkYanCheng/reserve/insert",
	        type:'post',
	        contentType: 'application/json;charset=utf-8',         
            datatype: 'json',
            data:$.toJSON({"parkname":name}),
            success:function(data){
                if(data["status"]==1001)
                {
                    alert("预定成功");                  
                }
                else{
                    alert("失败");
                }
            },
            error:function(){
                alert("发送失败");
            }
	    });
	};
    function getPoints(parkdata) {
    	var v_html='';
        for (var i=0;i<parkdata.length;i++) {      	
            v_html += "<li p_id=" + i + ">";
            v_html += '<h1 class="font18 color_3">' + parkdata[i].name + '</h1>';
            v_html += '<p>空余车位：<b class="green">' + parkdata[i].portLeftCount + '</b></p>';

            if (parkdata[i].portLeftCount > 0)
                v_html += '<a href="#" class="res back_orange font18 radius_3 absolute reservation" pname="' + parkdata[i].name + '"><i class="i"></i>预定</a>';
            v_html += '</li>';
        }
        $("#parking_list").html(v_html);
        $("#parking_list li").hover(function () {
            var p_id = $(this).attr('p_id');
            $('#parking_rm_' + p_id).removeClass('map_p_btn').addClass('map_p_btn_on');          
        }, function () {
            var p_id = $(this).attr('p_id');
            $('#parking_rm_' + p_id).removeClass('map_p_btn_on').addClass('map_p_btn');
        });
    }

})(jQuery);
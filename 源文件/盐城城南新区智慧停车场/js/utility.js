(function($){
	
	/** config **/
	$.fn.config = {}
	$.fn.config.webroot = "/parkYanCheng/";
	
	/** wait style loader**/
	$.Loader = function(height){
		this.height = (height != undefined ? height : 30);
		this.conponent = $('<div style="height:'+ this.height +'px">load...</div>');
		
	};

	$.Loader.prototype.get = function(){
		return this.conponent;
	};
	
	$.Loader.prototype.show = function(){
	//	this.conponent.shCircleLoader();
		return this;
	};
	
	$.Loader.prototype.remove = function(){
		this.conponent.remove();
		return this;
	};
	
	$.fn.loader = {};
	$.fn.loader.appendLoader = function(root, height){
		if(height == undefined)
			height = 30;
		var loader = $('<div id="loader" style="height:'+ height +'px">load...</div>');
		root.append(loader);
		root.find('#loader').shCircleLoader();
	};
	
	$.fn.loader.removeLoader = function(root){
		var loader = root.find('#loader');
		if(loader == undefined)
			return;
		loader.shCircleLoader('destroy');
		loader.remove();
	};
	
	
	
	$.fn.page = {};
	$.fn.page.pageSize = 50;
	$.fn.page.currentPage = 1;
	$.fn.page.pageCount = 1;
	$.fn.page.pageShowCount = 10;
	$.fn.page.startPageIndex = 1;
	$.fn.page.pageFunction;
	$.fn.page.paginationUl = $('<ul class="pagination"></ul>');
	
	$.fn.page.initial = function(itemCount, func){
		$.fn.page.pageCount = Math.ceil(itemCount / $.fn.page.pageSize);
		$.fn.page.pageFunction = func;
		$.fn.page.pagination();
		return $.fn.page.paginationUl;
	};
	
	
	$.fn.page.getCurrentPage = function(){
		return $.fn.page.currentPage;
	};
	
	$.fn.page.setCurrentPage = function(pageIndex){
		$.fn.page.currentPage = pageIndex;
	};
	
	$.fn.page.pagination = function(){
		
		$.fn.page.paginationUl.html('');
		
		var leftPage = $('<li index=0 ><a href="#">&laquo;</a></li>');
		leftPage.on('click', $(this), bindLeftPageClick);
		$.fn.page.paginationUl.append(leftPage);
		
		
		var endPageIndex = $.fn.page.startPageIndex + $.fn.page.pageShowCount;
		if(endPageIndex > $.fn.page.pageCount)
			endPageIndex = $.fn.page.pageCount + 1;
		
		for(var i = $.fn.page.startPageIndex; i < endPageIndex; i++){
			var pageLi = "";
			if(i == $.fn.page.currentPage){
				pageLi = $('<li index=' + i + ' class="active"><a href="#">' + i + '</a></li>');
			}else{
				pageLi = $('<li index=' + i + '><a href="#">' + i + '</a></li>');
			}
			pageLi.on('click', $(this), function(event){bindPageClick(event)});
			$.fn.page.paginationUl.append(pageLi);
		}
		
		var rightPage = $('<li index=-1><a href="#">&raquo;</a></li>');
		rightPage.on('click', $(this), bindRightPageClick);
		$.fn.page.paginationUl.append(rightPage);
	};
	
	
	var bindLeftPageClick = function(){
		$.fn.page.startPageIndex = $.fn.page.startPageIndex - $.fn.page.pageShowCount;
		if($.fn.page.startPageIndex < 1)
			$.fn.page.startPageIndex = 1;
		$.fn.page.pagination();
	};
	
	var bindRightPageClick = function(){
		var nextStartPageIndex = $.fn.page.startPageIndex + $.fn.page.pageShowCount;
		if(nextStartPageIndex > $.fn.page.pageCount)
			return;
		$.fn.page.startPageIndex = nextStartPageIndex;
		$.fn.page.pagination();
	};
	
	var bindPageClick = function(event){
		$.fn.page.paginationUl.find('li[index=' + $.fn.page.currentPage + ']').removeClass('active');
		$.fn.page.currentPage = parseInt($(event.target).parent('li').attr('index'));
		$.fn.page.startPageIndex = $.fn.page.currentPage - Math.floor(($.fn.page.pageShowCount / 2 ));
		if($.fn.page.startPageIndex < 1)
			$.fn.page.startPageIndex = 1;
		$.fn.page.pagination();
		
		$.fn.page.pageFunction();
	};
	
	/**********success warning tips****************/

	$.fn.tip = {};
	$.fn.tip.success = function(msg){
		return $('<div class="alert alert-success"><button class="close" data-dismiss="alert">&times;</button><strong>成功！</strong>' + msg + '</div>');
	};
	
	$.fn.tip.error = function(msg){
		return $('<div class="alert alert-danger"><button class="close" data-dismiss="alert">&times;</button><strong>失败！</strong>' + msg + '</div>')
	};
	
	$.fn.tip.warning = function(msg){
		return $('<div class="alert alert-warning"><button class="close" data-dismiss="alert">&times;</button><strong>警告！</strong>' + msg + '</div>')
	};
	
	$.fn.tip.info = function(msg){
		return $('<div class="alert alert-info"><button class="close" data-dismiss="alert">&times;</button><strong>警告！</strong>' + msg + '</div>')
	};
	
	
	/**class modal**/
	$.Modal = function(Id, title, body){
		this.conponent = $('<div class="modal fade" id="' + Id + '" tabindex="-1" role="dialog" \
				   aria-labelledby="myModalLabel" aria-hidden="true"> \
				   <div class="modal-dialog">  \
				      <div class="modal-content"> \
				         <div class="modal-header"> \
				            <button type="button" class="close"  \
				               data-dismiss="modal" aria-hidden="true"> \
				                  &times; \
				            </button> \
				            <h4 class="modal-title" id="' + Id +'Label'+'"> \
				            </h4> \
				         </div> \
				         <div class="modal-body" id="' + Id + 'Body' + '"> \
				         </div> \
				         <div class="modal-footer"> \
				            <button type="button" class="btn btn-default"  \
				               data-dismiss="modal">关闭 \
				            </button> \
				            <button type="button" class="btn btn-primary" data-dismiss="modal" id="' + Id + 'Submit' + '"> \
				               确认 \
				            </button> \
				         </div> \
				      </div> \
				</div>');
		this.id = Id;
		this.title = this.conponent.find('#' + Id + 'Label').append(title);
		this.body = this.conponent.find('#' + Id + 'Body').append(body);	
		this.submitBtn = this.conponent.find('#' + Id + 'Submit');
		this.submitClickHandler = function(){};		
	};	
	
	$.Modal.prototype.get = function(){
		return this.conponent;
	};
	
	$.Modal.prototype.show = function(){
		this.conponent.modal('show');
	};
	
	$.Modal.prototype.hide = function(){
		this.conponent.modal('hide');
	};
	
	$.Modal.prototype.remove = function(){
		this.conponent.remove();
	};
	
	$.Modal.prototype.setBody = function(body){
		this.body.html('');
		this.body.append(body);
	};
	
	$.Modal.prototype.setTitle = function(title){
		this.title.html('');
		this.title.append(title);
	};
	
	$.Modal.prototype.setSubmitClickHandle = function(callback){
		var self = this;
		this.submitBtn.on('click', $(this), function(){
			callback();
		});
	};
	
	
	/**Date**
	 (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
	 (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
	*******/
	
	Date.prototype.format = function(fmt)   
	{   
	  var o = {   
	    "M+" : this.getMonth()+1,                 //月份   
	    "d+" : this.getDate(),                    //日   
	    "h+" : this.getHours(),                   //小时   
	    "m+" : this.getMinutes(),                 //分   
	    "s+" : this.getSeconds(),                 //秒   
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
	    "S"  : this.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(fmt))   
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
	    if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt;   
	};
	
})(jQuery);
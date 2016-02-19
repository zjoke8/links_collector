document.addEventListener('DOMContentLoaded', function () {
		
});


$(function(){
	var TabId = 0;

	chrome.tabs.getSelected(null, function(tab) { 
		window.TabId = tab.id;
	});

	function updateServerInfo(){
		$("#control .server_info #php_info").attr("class","working");
		$("#control .server_info #php_info").html("Checking");	
		$.ajax({
			url: "http://localhost/links_collector/test.php",
			cache: false,
			type: "POST", 
			dataType: "json",
			success:function(info){
				console.log(info)
				$("#control .server_info #php_info").attr("class","on");
				$("#control .server_info #php_info").html("On");
				$("#total_links_num").html(info.total);
				$("#finish_links_num").html(info.finish);
				$("#find_links_num").html(info.find);
			},
			error:function(){
				$("#control .server_info #php_info").attr("class","off");
				$("#control .server_info #php_info").html("Off");	
				$("#total_links_num").html(0);
				$("#finish_links_num").html(0);
				$("#find_links_num").html(0);
			}
		});
	}

	$("#refresh_server_info").click(function(){
		updateServerInfo();
	});

	$("#start").click(function(){
		startScanProgram(window.TabId);
	});

	function startScanProgram(TabId){
		chrome.extension.getBackgroundPage().saveLinksData(TabId);
	}

});


var ScanStatus = false;
var Links = new Array();
chrome.storage.local.get('ScanStatus', function(result){
	if(typeof(result.ScanStatus) != undefined)
		ScanStatus = result.ScanStatus;
});	



function getScanStatus(){
	return window.ScanStatus;
}

function setScanStatus(i){
	window.ScanStatus = i;
	chrome.storage.local.set({'ScanStatus': i});
	updateBrowserActionIcon();
}


function updateBrowserActionIcon() {
	if(window.ScanStatus)
			chrome.browserAction.setIcon({path:"icon_on.png"});
	else
			chrome.browserAction.setIcon({path:"icon_off.png"});
}


chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
	window.Links[sender.tab.id] = request;
});


function saveLinksData(tabid){
	if(tabid && typeof(window.Links[tabid])!= undefined ){
		$.ajax({
			url: "http://localhost/links_collector/data.php",
			cache: false,
			type: "POST",
			data: window.Links[tabid],
			dataType: "json"
		}).done(function(info) {
			console.log(info);
		}).fail(function(jqXHR, textStatus) {
			return false;
		});
	}
}

//chrome.tabs.onUpdated.addListener(checkLinks);




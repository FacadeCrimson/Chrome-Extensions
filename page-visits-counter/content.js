chrome.runtime.onMessage.addListener(
    function(request, sender, sendMessage) {
        if(request.method == "getText"){
            sendMessage({data: document.all[0].innerText, method: "getText"})
        }
    }
);
chrome.storage.local.get("state",function(result) {
    if(result.state==="stop"){return}
    else{
    chrome.storage.sync.get("filter",function(result) {
        var searchArray = result.filter
        var regArray = searchArray.map((v)=>new RegExp(v, "ig"))
        var elements = document.getElementsByTagName('*');

        var i = 0;
        while ( i < elements.length) {
            var element = elements[i];
            if(!(element.classList.contains("modified"))){
                var j = 0;
                while ( j < element.childNodes.length) {
                    var node = element.childNodes[j];

                    if (node.nodeType === 3) {
                        var text = node.nodeValue;
                        var replacedText = text;
                        for(let z=0; z<regArray.length; z++){
                            replacedText = replacedText.replace(regArray[z],  `<span class="modified" style="background-color:yellow;font-size:30px;">${searchArray[z]}</span>`);
                        }

                        if (replacedText !== text) {
                            let newNode = document.createElement("span")
                            newNode.classList.add("modified")
                            newNode.innerHTML = replacedText
                            element.replaceChild(newNode, node);
                        }
                    }
                    j++
                }
            }
            i++
        }
    })}
})
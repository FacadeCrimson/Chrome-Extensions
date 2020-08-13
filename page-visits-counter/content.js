chrome.runtime.onMessage.addListener(
    function(request, sender, sendMessage) {
        if(request.method == "getText"){
            sendMessage({data: document.all[0].innerText, method: "getText"})
            console.log(document.all[0].innerText)
        }
    }
);
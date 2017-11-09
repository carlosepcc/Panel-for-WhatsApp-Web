function receiveMessage(event)
{
    if (event.origin !== "https://web.whatsapp.com")
        return;
    console.log(event.data);
}

window.addEventListener("message", receiveMessage, false);

browser.webRequest.onHeadersReceived.addListener(function(details) {
    if (details.tabId > -1)
        return;
    var headers = details.responseHeaders;
    var indices = new Array();
    for (var i = 0; i < headers.length; ++i) {
        var name = headers[i].name.toLowerCase();
        if (name === 'x-frame-options' || name === 'frame-options') {
            indices.push(i);
        }
    }
    for (var i = indices.length - 1; i >= 0; --i) {
        headers.splice(indices[i], 1);
    }
    return {"responseHeaders": headers};
}, {"urls": ["*://*.web.whatsapp.com/*"]}, ["blocking", "responseHeaders"]);

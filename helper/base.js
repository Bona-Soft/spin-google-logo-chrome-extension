// This file is a helper method to comunicate between Content and Popup js.

var callInContent = async (functionName, functionArguments) => {
    return chrome.tabs.query({active: true, currentWindow: true}, async function(tabs){

        if(service
            && service.pages 
            && service.pages.length
            && !service.pages.some((element) => tabs[0].url.includes(element))) {
                alert(`Please go to ${pages[0]}`);
                return;
        }

        const payload = {
            fn: functionName,
            args: functionArguments
        };
        
        return chrome.tabs.sendMessage(tabs[0].id, payload);
    });
};

var callInPopup = (functionName, functionArguments) => {
    const payload = {
        fn: functionName,
        args: functionArguments
    };
    
    return chrome.runtime.sendMessage(
        payload,
        function (response) {
            return response;
        });
};

var service = {
    callInContent: callInContent,
    callInPopup: callInPopup
};

var executeFunctionByName = (functionName, context, args) => {
    // var args = null;
    // if(arguments){
    //     args = Array.prototype.slice.call(arguments, 2);
    // }
    
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    if(!context){
        context = window;
    }
    for(var i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
};

// function gotMessage (message, sender, sendResponse) {
//     var result = executeFunctionByName(message.fn);
//     return sendResponse({
//         data: result
//     });
// }

chrome.storage.local.get("pages", function (retrieved_data){
    service.pages = retrieved_data;
});

// chrome.runtime.onMessage.addListener(gotMessage);



// receive message from content-
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    var result;
    if(message && message.fn){
        result = executeFunctionByName(message.fn, window, message.args);
    }

    sendResponse();
    return Promise.resolve(result);
});

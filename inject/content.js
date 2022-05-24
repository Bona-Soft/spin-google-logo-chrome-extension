// Define here your DOM alteration, extraction of data, or any JS you want to inject on your tabs/DOM

var spinGoogleLogo = () => {
    document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transitionDuration = '3.0s';
    document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transform = 'rotate(3000deg)';

    service.callInPopup("logoSpinned", ["spinned!"]);
};

// Add the function that you want to be called or not from the popup
var injected = {
    spinLogo: spinGoogleLogo,
};

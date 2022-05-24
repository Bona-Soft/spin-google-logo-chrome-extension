// Define here your calls to content, the function that you want to be execute from content and your popup's javascript.

// Add a click function to the btn
$("#btn").click(async function () {

    // Will call and execute on your DOM the method injected.spinLogo on your content.js injected file.
    return await service.callInContent("injected.spinLogo");
});


// Function to be called from content.
var logoSpinned = (value) => {
    $("#spinResult").html(value);
};
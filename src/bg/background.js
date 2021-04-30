// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	chrome.pageAction.show(sender.tab.id);
//     sendResponse();
//   });

let urlArr;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'dom') {
    console.log('Message: ', request.message);
    console.log('Dom: ', request.dom);
    console.log('Sender ID: ', sender.id);
    sendResponse({
      message: 'Hi!',
    });
    return true;
  }
  if (request.message === 'sending_links_of_posts') {
    urlArr = request.url;
    console.log(urlArr);
  }
});

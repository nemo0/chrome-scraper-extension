// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	chrome.pageAction.show(sender.tab.id);
//     sendResponse();
//   });

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
    changeUrl(request);
  }
});

function changeUrl(request) {
  const urlArr = request.url;
  console.log(urlArr);
  chrome.storage.local.set({ urls: urlArr }, function () {
    console.log('Urls stored. \n' + urlArr);
  });
  chrome.storage.local.get(['urls'], async function (result) {
    for (let i = 1; i < result.urls.length; i++) {
      console.log('Value currently is ' + result.urls[i]);
      await chrome.tabs.update(undefined, {
        url: 'https://m.facebook.com' + urlArr[i],
      });
    }
  });

  // if (urlArr !== undefined) {
  //   for (let i = 1; i < urlArr.length; i++) {
  //     chrome.tabs.update(undefined, {
  //       url: 'https://m.facebook.com' + urlArr[i],
  //     });
  //   }
  // }
}

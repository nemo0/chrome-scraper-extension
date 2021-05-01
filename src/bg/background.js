// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	chrome.pageAction.show(sender.tab.id);
//     sendResponse();
//   });
let i;
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
    // initialize index
    i = 0;
    // add urls to local storage
    const urlArr = request.url;
    console.log(urlArr);
    chrome.storage.local.set({ urls: urlArr }, function () {
      console.log('Urls stored. \n' + urlArr);
    });
    // start changing the url
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // only update after the page has loaded
  if (changeInfo.status === 'complete') {
    i++;
    changeUrl(i);
  }
});

function changeUrl(i) {
  chrome.storage.local.get(['urls'], function (result) {
    if (i >= result.urls.length) {
      return;
    }
    console.log('Value currently is ' + result.urls[i]);
    if (result.urls[i] !== undefined) {
      chrome.tabs.update(undefined, {
        url: 'https://m.facebook.com' + result.urls[i],
      });
      chrome.runtime.sendMessage({ message: 'url_changed' });
    }
  });
}

// Old ChangeUrl function
// function changeUrl(request) {
//   const urlArr = request.url;
//   console.log(urlArr);
//   chrome.storage.local.set({ urls: urlArr }, function () {
//     console.log('Urls stored. \n' + urlArr);
//   });
//   chrome.storage.local.get(['urls'], async function (result) {
//     for (let i = 1; i < result.urls.length; i++) {
//       await chrome.tabs.update(undefined, {
//         url: 'https://m.facebook.com' + urlArr[i],
//       });
//       await chrome.runtime.sendMessage(
//         { message: 'url_changed' },
//         function (response) {
//           console.log(`message from background: ${JSON.stringify(response)}`); // shows undefined
//         }
//       );
//       console.log('Value currently is ' + result.urls[i]);
//     }
//   });

//   // if (urlArr !== undefined) {
//   //   for (let i = 1; i < urlArr.length; i++) {
//   //     chrome.tabs.update(undefined, {
//   //       url: 'https://m.facebook.com' + urlArr[i],
//   //     });
//   //   }
//   // }
// }

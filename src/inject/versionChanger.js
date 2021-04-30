chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'update_tab') {
    chrome.tabs.update(undefined, { url: request.url });
    console.log(request.message);
    sendResponse('Changed the URL');
  }
});

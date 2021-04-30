chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      console.log('Hello. This message was sent from scripts/inject.js');
      // ----------------------------------------------------------
      console.log('From inject page');
    }
  }, 10);
});

var html = document.documentElement.outerHTML;
chrome.extension.sendMessage({ message: 'dom', dom: html });

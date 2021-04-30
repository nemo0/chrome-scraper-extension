var html = document.documentElement.outerHTML;
// Node.js Starts Here
const cheerio = require('cheerio');
const $ = cheerio.load(html);

const title = $('title');
console.log(title.text());

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      console.log('Hello. This message was sent from scripts/inject.js');
      // ----------------------------------------------------------
      console.log('From inject page');
      console.log(window.location.href);
      if (window.location.href.toLowerCase().indexOf('permalink') === -1) {
        let links = [];
        $('a:contains("Comment")').each((index, elem) => {
          links.push($(elem).attr('href'));
        });
        console.log(links);

        let postId = [];
        let urlArr = [];

        for (link of links) {
          newLink = link.split('/');
          postId.push(newLink[5]);
          const urlPost = newLink.splice(0, 5).join('/');
          urlArr.push(urlPost);
        }

        urlArr = [...new Set(urlArr)];
        console.log(urlArr);

        chrome.runtime.sendMessage(
          {
            message: 'sending_links_of_posts',
            url: urlArr,
          },
          function (response) {
            console.log(`message from background: ${JSON.stringify(response)}`); // shows undefined
          }
        );
      }
    }
  }, 10);
});

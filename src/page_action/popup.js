let scrape = document.querySelector('#scrape');

scrape.addEventListener('click', () => {
  console.log('I am clicked');
  chrome.tabs.query(query, changeUrl);
  return true;
});

var query = { active: true, currentWindow: true };
function changeUrl(tabs) {
  var currentTab = tabs[0]; // there will be only one in this array
  console.log(currentTab); // also has properties like currentTab.id
  let url = currentTab.url;
  let mobileUrl = url.replace('www.', 'm.');
  chrome.tabs.update(undefined, { url: mobileUrl });
  return true;
}

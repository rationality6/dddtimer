function mainRun() {
  console.log("background work");
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg == "mainRun") mainRun();
});

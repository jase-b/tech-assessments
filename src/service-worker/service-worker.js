(() => {
  chrome.runtime.onInstalled.addListener((details) => {
    console.log("runtime.onInstalled", details);
  });

  chrome.runtime.onStartup.addListener((details) => {
    console.log("runtime.onStartup", details);
  });

  console.log("Service workers executed." + "\n");
})();

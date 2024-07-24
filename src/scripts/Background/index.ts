const initStorage = async () => {
  chrome.storage.local.get(['status', 'patterns'], async (data) => {
    if (data.status === undefined)
      await chrome.storage.local.set({ status: true });
    if (data.patterns === undefined)
      await chrome.storage.local.set({ patterns: [] });
  });
};

chrome.runtime.onInstalled.addListener(async () => {
  await initStorage();
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.local.get(['status', 'patterns'], (data) => {
      if (data.status) {
        const patterns = data.patterns as string[];
        const target = tab.url;

        for (const pattern of patterns) {
          if (target && new RegExp(pattern).test(target)) {
            chrome.tabs.remove(tabId, function () {});
            break;
          }
        }
      }
    });
  }
});

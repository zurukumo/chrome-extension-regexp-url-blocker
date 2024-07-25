const initStorage = async () => {
  chrome.storage.local.get(['until', 'patterns'], async (data) => {
    if (data.until === undefined)
      await chrome.storage.local.set({ until: '1900-01-01T00:00:00Z' });

    if (data.patterns === undefined)
      await chrome.storage.local.set({ patterns: [] });
  });
};

chrome.runtime.onInstalled.addListener(async () => {
  await initStorage();
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.local.get(['until', 'patterns'], (data) => {
      if (new Date(data.until) < new Date()) {
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

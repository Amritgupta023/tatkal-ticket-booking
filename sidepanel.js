btn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        type: 'CLICK_AVAILABLE_TRAIN',
        trainNumber: '22447'
      },
      (response) => {
        if (chrome.runtime.lastError) {
          output.textContent = '❌ Unable to access page';
          return;
        }

        if (!response?.found) {
          output.textContent = '❌ Train not found';
        } else if (response.available) {
          output.textContent = '✅ AVAILABLE → Clicked';
        } else {
          output.textContent = '⚠️ Train found but not AVAILABLE';
        }
      }
    );
  });
});

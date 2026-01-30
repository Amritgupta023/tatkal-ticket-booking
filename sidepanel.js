const btn = document.getElementById('btn');
const output = document.getElementById('output');

btn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;

    chrome.tabs.sendMessage(
      tabId,
      {
        type: 'GET_LOCAL_STORAGE_KEY',
        key: 'nget-spa.b-m-k'
      },
      (response) => {
        if (chrome.runtime.lastError) {
          output.textContent = 'Unable to access localStorage on this page';
          return;
        }

        output.textContent = response?.value ?? 'Key not found';
      }
    );
  });
});

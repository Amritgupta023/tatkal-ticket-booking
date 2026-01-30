const btn = document.getElementById('btn');
const output = document.getElementById('output');

btn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;

    chrome.tabs.sendMessage(
      tabId,
      {
        type: 'FIND_TRAIN_FORM_GROUP',
        trainNumber: '22447'
      },
      (response) => {
        if (chrome.runtime.lastError) {
          output.textContent = 'Unable to access page DOM';
          return;
        }

        if (response?.found) {
          output.textContent =
            `✅ Train found: ${response.trainText}\nForm-group detected`;
        } else {
          output.textContent = '❌ Train 22447 not found';
        }
      }
    );
  });
});

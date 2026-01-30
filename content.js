chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'FIND_TRAIN_FORM_GROUP') {
    const trainNumber = request.trainNumber;

    // Find all train-heading containers
    const trainHeadings = document.querySelectorAll('.train-heading');

    for (const heading of trainHeadings) {
      const strongEl = heading.querySelector('strong');

      if (!strongEl) continue;

      const text = strongEl.textContent || '';

      if (text.includes(trainNumber)) {
        // Found correct train, now locate nearest form-group
        const formGroup = heading.closest('.form-group');

        sendResponse({
          found: true,
          trainText: text.trim(),
          hasFormGroup: !!formGroup
        });

        return true; // stop after first match
      }
    }

    // If nothing matched
    sendResponse({
      found: false
    });
  }
});

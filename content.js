chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CLICK_AVAILABLE_TRAIN') {
    const trainNumber = request.trainNumber;

    const trainHeadings = document.querySelectorAll('.train-heading');

    for (const heading of trainHeadings) {
      const strongEl = heading.querySelector('strong');
      if (!strongEl) continue;

      const trainText = strongEl.textContent || '';

      // 1️⃣ Match train number
      if (!trainText.includes(trainNumber)) continue;

      // 2️⃣ Get the full train card container
      const trainCard =
        heading.closest('.ng-star-inserted') ||
        heading.closest('.form-group') ||
        heading.parentElement;

      if (!trainCard) continue;

      // 3️⃣ Find availability element
      const preAvl = trainCard.querySelector('.pre-avl');
      if (!preAvl) {
        sendResponse({ found: true, available: false, reason: 'pre-avl not found' });
        return true;
      }

      // 4️⃣ Check availability text
      const avlText = preAvl.textContent || '';

      if (avlText.includes('AVAILABLE')) {
        // 5️⃣ Click it
        preAvl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        preAvl.click();

        sendResponse({
          found: true,
          available: true,
          action: 'clicked'
        });
        return true;
      }

      sendResponse({
        found: true,
        available: false,
        action: 'not available'
      });
      return true;
    }

    // No matching train found
    sendResponse({ found: false });
  }
});

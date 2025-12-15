//--- Detects if the user clicked the 'copy link' button ---//
document.addEventListener('click', async (event) => {
    try {
        // Check if they clicked the 'copy link' button (update selector if needed)
        const copyButton = event.target.closest('[data-testid="copyLink"]');

        if (!copyButton) return; // Not the copy button

        // Prevent default action
        event.preventDefault();
        event.stopPropagation();

        // Go to the tweet article
        const tweet = copyButton.closest('article');
        if (!tweet) return;

        // Search for the link
        const statusLink = tweet.querySelector('a[href*="/status/"]');
        if (!statusLink) return;

        // Get the URL
        let url = statusLink.href;

        // Replace the domain
        url = url.replace(/^https:\/\/(x|twitter)\.com\//, 'https://fixupx.com/');

        // Copy to clipboard
        await navigator.clipboard.writeText(url);

        // Optional: log success
        console.log('FixupX Copy: URL copied to clipboard:', url);
    } catch (err) {
        console.error('FixupX Copy: error', err);
    }
});

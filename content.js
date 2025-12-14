//--- Detects if the user copied the link via 'Ctrl + C' ---//
document.addEventListener('copy', (event) => {
    // Collects the copied link
    const copiedLink = window.getSelection().toString();

    // Verifies link
    const linkRegex = /^https:\/\/(x|twitter)\.com\//;

    // Not an X|Twitter link
    if (!linkRegex.test(copiedLink)) return;

    // An X|Twitter link
    const newLink = copiedLink.replace(
        linkRegex,
        'https://fixupx.com/'
    );

    // Prevents default copy
    event.preventDefault();

    // Inserts into clipboard
    event.clipboardData.setData('text/plain', newLink);
});


//--- Detects if the user copied the link via Button ---//
document.addEventListener(
    'click',
    async (event) => {
        // Check if they clicked the 'copy link' button
        const copyButton = event.target.closest('[data-testid="copyLink"]');

        // Not the copy button
        if (!copyButton) return;

        // Prevents default action
        event.preventDefault();
        event.stopPropagation();

        // Goes to tweet article
        const tweet = copyButton.closest('article');
        if (!tweet) return;

        // Searches for the link
        const statusLink = tweet.querySelector('a[href*="/status/"]');
        if (!statusLink) return;

        // Gets the URL
        let url = statusLink.href;

        // Replaces the domain
        url = url.replace(
            /^https:\/\/(x|twitter)\.com\//,
            'https://fixupx.com/'
        );

        // Copies to clipboard
        try {
            await navigator.clipboard.writeText(url);
        } catch (err) {
            console.error('FixupX Copy: error copying', err);
        }
    },
    true
);

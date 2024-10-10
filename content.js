let isScrolling = false;
let interval ;
let isLinkOpen = false;


chrome.runtime.sendMessage({ action: 'getState' }, (response) => {
  isScrolling = response.isScrolling;
  if (isScrolling) startScrolling();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleScroll') {
    isScrolling = !isScrolling;
    chrome.storage.sync.set({ isScrolling: isScrolling });
    if (isScrolling) startScrolling();
    else stopScrolling();
  }
});



function startScrolling() {
  interval = setInterval(() => {
    window.scrollBy(0, 1);
    clickLinks();
  }, 4);
}


function stopScrolling() {
  clearInterval(interval);
}

// This function will automatically scroll the page
function autoScroll() {
  // Check if the current page is Twitter
  if (window.location.hostname.includes('twitter.com')) {
    startScrolling();
    clickLinks();
  }
}



// A set to keep track of links that have been clicked
const clickedLinks = new Set();

function clickLinks() {
  // Exit function if a link is already opened
  if (isLinkOpen) return;

  const links = document.querySelectorAll('a');

  links.forEach(link => {
    const linkText = link.innerText || link.textContent; // Added fallback to textContent
    
    if ((linkText.includes('.com') || linkText.includes('.net') || linkText.includes('.xyz') || linkText.includes('.cy') || linkText.includes('.org') || linkText.includes('.space') || linkText.includes('.io') || linkText.includes('.me')
    || linkText.includes('.lol') || linkText.includes('.ai') || linkText.includes('.jp') || linkText.includes('.app') || linkText.includes('.shop') || linkText.includes('t.me') || linkText.includes('.world') || linkText.includes('.pro')
  || linkText.includes('.fun') || linkText.includes('.eu') || linkText.includes('.edu') || linkText.includes('.site') || linkText.includes('.pw') || linkText.includes('.tech') || linkText.includes('.website') 
  || linkText.includes('.link') || linkText.includes('.co') || linkText.includes('.gg') || linkText.includes('.news')
  || linkText.includes('.net')|| linkText.includes('.uk') || linkText.includes('.au')) && !clickedLinks.has(link.href) && !isLinkOpen)  {
      const rect = link.getBoundingClientRect();

      if (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)) {
        
        // Add the link to the set of clicked links
        clickedLinks.add(link.href);

        isLinkOpen = true;

        // Opening the link in a new tab and keeping a reference to it
        const newTab = window.open(link.href, '_blank');
        
        // Attempting to close the new tab after 5 seconds
        setTimeout(() => {
          if (newTab) {
            newTab.close();
          }
          isLinkOpen = false;
        }, 7000);
      }
    }
  });
}
document.addEventListener('DOMContentLoaded',() => {
  const toggleButton = document.getElementById('toggleButton');
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { action: 'getState' }, (response) => {
      setButtonText(response.isScrolling);
    });
        
    

    toggleButton.addEventListener('click', () => {
      chrome.tabs.sendMessage(tab.id, { action: 'toggleScroll' }, (response) => {
        setButtonText(response.isScrolling);
      });
    });
  });

});
 

import { addTaskIdInTitle } from './scripts';

const ELEMENT_WAITING = 100;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === 'complete-call' && /.*app\.clickup\.com\/t\/.*/.test(location.href)) {
    const interval: NodeJS.Timeout
       = setInterval(() => addTaskIdInTitle(() => clearInterval(interval)), ELEMENT_WAITING);
  }
});

/* eslint-disable no-restricted-globals */
let timer = null;

self.onmessage = (e) => {
    const { command } = e.data;

    if (command === 'start') {
        if (!timer) {
            timer = setInterval(() => {
                self.postMessage('tick');
            }, 1000);
        }
    } else if (command === 'stop' || command === 'pause') {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }
};

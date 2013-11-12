chrome.app.runtime.onLaunched.addListener(function () {
//    chrome.tabs.create({url: 'index.html'});
//    chrome.app.window.open('index.html');
    chrome.app.window.create('index.html', {
        'state': 'maximized'
    });
});
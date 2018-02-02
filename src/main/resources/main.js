var mustacheLib = require('/lib/xp/mustache');
var router = require('/lib/router')();
var helper = require('/lib/helper');
var swController = require('/lib/pwa/sw-controller');
var upload = require('/upload.js');
var download = require('/download.js');

var siteTitle = 'PWA Starter';

var renderPage = function(pageName) {
    return function() {
        return {
            body: mustacheLib.render(resolve('pages/' + pageName), {
                title: siteTitle,
                version: app.version,
                baseUrl: helper.getBaseUrl(),
                precacheUrl: helper.getBaseUrl() + '/precache',
                themeColor: '#FFF',
                styles: mustacheLib.render(resolve('/pages/styles.html')),
                serviceWorker: mustacheLib.render(resolve('/pages/sw.html'), {
                    title: siteTitle,
                    baseUrl: helper.getBaseUrl(),
                    precacheUrl: helper.getBaseUrl() + '/precache',
                    appUrl: helper.getAppUrl()
                })
            })
        };
    }
};

router.get('/', renderPage('main.html'));

router.get('/about', renderPage('about.html'));

router.get('/contact', renderPage('contact.html'));

router.get('/capture', renderPage('capture.html'));

router.get('/sw.js', swController.get);

router.post('/upload', upload.handleUpload);

router.get('/download', download.handleDownload);

exports.all = function (req) {
    return router.dispatch(req);
};

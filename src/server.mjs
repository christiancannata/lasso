import express from 'express';
import lighthouse from 'lighthouse';
import perfConfig from './config.performance.js';
import puppeteer from 'puppeteer';

const app = express()

app.use(express.raw());
app.use(express.json({limit: '5mb', extended: true}));
app.use(express.urlencoded({limit: '5mb', extended: true}));


app.post('/audit', async (req, res) => {

    const payload = req.body;

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
    });

    let blockedRequests = []

    const page = await browser.newPage();
    const port = page.browser().wsEndpoint().split(':')[2].split('/')[0];

    const options = {
        blockedRequests,
        port,
    }

    let response = []
    for (let i = 0; i < payload.urls.length; i++) {
        const url = payload.urls[i];

        let auditConfig = perfConfig.auditConfig

       /* if (payload.preset) {
            auditConfig.settings.emulatedFormFactor = payload.preset
        }

        if (payload.headers) {
            auditConfig.settings.extraHeaders = payload.headers
        }

        if (payload.userAgent) {
            auditConfig.settings.emulatedUserAgent = payload.userAgent
        }*/


        console.log(auditConfig)
        const metrics = await lighthouse(url, options, auditConfig)
            .then((metrics) => {
                const audits = metrics.lhr.audits;

                if (typeof (audits) != 'undefined' && audits != null) {
                    audits['url'] = url;
                    return audits;
                }
            }).catch((e) => {

            });

        response.push(metrics)

    }

    return res.json(response);
})


const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
})
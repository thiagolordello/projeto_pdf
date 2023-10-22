const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/', (req, res) => {
    return res.send('ok! agora vamos para o puppeteer');
});

app.get('/pdf', async (req, res) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.google.com.br/', {
        waitUntil: 'networkidle0'
    });

    await page.setViewport({ width: 1200, height: 800 });

    const pdfBuffer = await page.pdf({ format: 'A4', quality: 100, preferCSSPageSize: true });

    await browser.close();

    // Configura o cabeçalho de resposta para download
    res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');
    res.contentType('application/pdf');
    res.send(pdfBuffer);
});

app.listen(3000, () => console.log('ouvindo a porta 3000'));
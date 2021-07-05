const kabum = require('./kabum')
const pichau = require('./pichau')
const terabyte = require('./terabyte')
const imprimir = require('./imprime')
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    const listaKabum = await kabum(page);
    await page.waitForTimeout(1000);
    const listaPichau = await pichau(page);
    await page.waitForTimeout(1000);
    const listaTerabyte = await terabyte(page);
    await page.waitForTimeout(1000);
    const listas = [listaKabum, listaPichau, listaTerabyte]
    imprimir(page, listas)
    console.log("Fim");
})();
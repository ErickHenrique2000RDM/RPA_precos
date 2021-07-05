//MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 MuiGrid-grid-lg-3 MuiGrid-grid-xl-2

const puppeteer = require('puppeteer');

module.exports = async (page) => {
    await page.goto('https://www.pichau.com.br/hardware/processadores?sort=price-asc', {waitUntil: 'networkidle2'});

    //await page.waitForTimeout(1000);

    const lista = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-6.MuiGrid-grid-sm-6.MuiGrid-grid-md-4.MuiGrid-grid-lg-3.MuiGrid-grid-xl-2');

        const array = [...nodeList];

        const listPrecos = array.map(item => {
            const preco = item.childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerText.toLowerCase();
            //console.log(preco)
            if(preco.indexOf('i5') >= 0 || preco.indexOf('i7') >= 0 || preco.indexOf('ryzen 5') >= 0 || preco.indexOf('ryzen 7') >= 0){
                var nome
                if(item.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].innerText.toLowerCase() == "à vista"){
                    nome = item.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[2].innerText
                }else{
                    nome = item.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].innerText
                }
                return {
                    nome: item.childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerText,
                    link: item.childNodes[0].href,
                    preco: nome
                }
            }else{
                return null
            }
        }).filter(item => item !== null)

        console.log(listPrecos)
        return listPrecos
    })

    //await browser.close();
    page.on('load', () => {
        //console.log('ola')
        return lista;
    })

    return lista;
}
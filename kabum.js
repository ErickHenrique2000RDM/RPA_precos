const puppeteer = require('puppeteer');

module.exports = async (page) => {
    await page.goto('https://www.kabum.com.br/hardware/processadores?pagina=1&ordem=3&limite=100&prime=false&marcas=[]&tipo_produto=[]&filtro=[]', {waitUntil: 'networkidle2'});

    //await page.waitForTimeout(1000);

    const lista = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('div.sc-fzqNqU.jmuOAh');

        const array = [...nodeList];

        const listPrecos = array.map(item => {
            const preco = item.childNodes[1].innerText.toLowerCase();

            if(preco.indexOf('i5') >= 0 || preco.indexOf('i7') >= 0 || preco.indexOf('ryzen 5') >= 0 || preco.indexOf('ryzen 7') >= 0){
                return {
                    nome: item.childNodes[1].innerText,
                    link: item.childNodes[0].href,
                    preco: item.childNodes[2].childNodes[0].childNodes[3].innerText.toLowerCase() === 'no boleto' ? item.childNodes[2].childNodes[0].childNodes[2].innerText : item.childNodes[2].childNodes[0].childNodes[3].innerText
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


  const puppeteer = require("puppeteer");


  async function scrapeEnvato(keyword){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://elements.envato.com/es/");
    const input = await page.waitForSelector("#autosuggest");
    await input.type(keyword);
    const button = await page.waitForSelector(
      "#app > div.Pwa91aRM > main > div > div > div.tt9Ej34g > div.S51DHinX > div > div > div > form > button"
    );
    await button.click();

    // Esperar a que la página termine de cargar
    await page.waitForSelector(".GsBXsKvH .u4c2Cda9");

    const jsonData = await page.evaluate(() => {
      const trendsList = document.querySelectorAll(
        ".GsBXsKvH > .u4c2Cda9 div h3 a"
      );
      const container = document.querySelectorAll(
        '.tXwhn5Zg div[data-test-selector="photogrid-photo"]'
      );

      const url = "https://elements.envato.com";

      const jsonData = [];

      for (let i = 0; i < trendsList.length; i++) {
        const title = trendsList[i].innerHTML;
        const dive = url + trendsList[i].getAttribute("href");

        let containerData;

        if (i === 0) {
          const autorSelector = ".trzLbgZD div .Ago_n9Jb a";
          const descripSelector = ".SZBxAOrq";
          const imagenSelector = ".NgtXrCQY img";

          containerData = Array.from(container).map((child) => {
            const autorElement = child.querySelector(autorSelector);
            const autor = autorElement.innerHTML;
            const autorUrl = url + autorElement.getAttribute("href");

            const descripElement = child.querySelector(descripSelector);
            const descripcion = descripElement
              .getAttribute("aria-label")
              .replace("See more details for ", "");
            const descripcionUrl = url + descripElement.getAttribute("href");

            const imagenElement = child.querySelector(imagenSelector);
            const imagenSrc = imagenElement.getAttribute("src");
            const imagenSrcset = imagenElement.getAttribute("srcset");

            return {
              autor: [autor, autorUrl],
              descripcion: [descripcion, descripcionUrl],
              imagen: [imagenSrc, imagenSrcset],
            };
          });
        } else {
          const lista = document.querySelectorAll(
            `#app > div.Pwa91aRM > main > div > div.GsBXsKvH > div:nth-child(${
              i + 1
            }) ul > li div a[data-test-selector="item-card-user-profile-link"]`
          );
          const listaArray = Array.from(lista).map((item) => {
            const autor = item.innerHTML;
            const autorurl = item.getAttribute("href");
            return [autor, url + autorurl];
          });

          const descripcion = document.querySelectorAll(
            `#app > div.Pwa91aRM > main > div > div.GsBXsKvH > div:nth-child(${
              i + 1
            }) ul > li div a[class*="_MwuC0KD"]`
          );
          const descripcionArray = Array.from(descripcion).map((item) => {
            const descripcion = item.getAttribute("title");
            const descripcionurl = url + item.getAttribute("href");
            return [descripcion, descripcionurl];
          });
          let imagenArray;
          if ((i + 1) == 2 || (i + 1) == 6) {
            const imagen = document.querySelectorAll(
              `#app > div.Pwa91aRM > main > div > div.GsBXsKvH > div:nth-child(${i+1}) > ul > li> div > div.F_mg954K.LpyZHUjX > div > div.o1ZyM67O`
            );
            imagenArray = Array.from(imagen).map((item) => {
              const src = item.querySelector("img").getAttribute("srcset");
              return [src];
            });
          }else{
            const imagen = document.querySelectorAll(
              `#app > div.Pwa91aRM > main > div > div.GsBXsKvH > div:nth-child(${i+1}) > ul > li> div > div.NgtXrCQY.Y0GQEttH > div.MY02g2dt`
            );
            imagenArray = Array.from(imagen).map((item) => {
              const src = item.querySelector("img").getAttribute("srcset");
              return [src];
            });
          }

          containerData = {
            authors: listaArray,
            descriptions: descripcionArray,
            imagen: imagenArray,
          };
        }

        const data = { title: [title, dive], containerData };
        jsonData.push(data);
      }
      
      
      return jsonData;
      
    });
    
    await browser.close();
    return jsonData;
    
};
module.exports = {
  scrapeEnvato
};
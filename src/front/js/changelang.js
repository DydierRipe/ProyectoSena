const langText = [];
const translate = document.querySelector(".translate");

const setLang = (lang, filename) => {
    
    fetch(`/language/${lang}/${filename}`, { 
        method: "POST",
    }).then(res => res.json())
    .then(res => {
        const textLang = document.querySelectorAll('.t');
        const plLang = document.querySelectorAll('.pl');

        for (let i = 0; i < textLang.length; i++) {
            if (textLang[i].textContent == '-1') {
                textLang[i].textContent = res[0][i+1];
            }
        }
        for (let i = 0; i < plLang.length; i++) {
            if (plLang[i].placeholder == '-1') {
                plLang[i].placeholder = res[1][i];
            }
        }
        
        langText.push(res[2], res[3]);
    });
}

translate.addEventListener("click", () => {
    const transCont = document.querySelector(".translation-container");
    translate.style.zIndex = 10;

    const fr = document.createDocumentFragment();
    const element1 = document.createElement("div");
    const element2 = document.createElement("div");
    const element3 = document.createElement("div");

    let i = 0;
    const lang = ['en', 'es', 'de'];
    const elementCol = [element1, element2, element3];
    for (const el of elementCol) {
        el.classList.add("translate", "lang");
        el.style.gridColumn = `${i+1}/${i+2}`;
        el.textContent = lang[i].toUpperCase();
        
        if (i == 1) {
            el.style.gridRow = '7 / 9';
            el.style.marginTop = '-75px';
        } else {
            el.style.gridRow = '6 / 8';
            el.style.marginTop = '-62.5px';
            el.style.marginLeft = (i == 0)? '68px' : '-68px';
        }

        el.style.animation = 'repos .3s forwards';

        el.addEventListener("click", () => {
            window.location.replace('/' + el.textContent.toLowerCase() + '/' + window.location.pathname.split('/')[2] + window.location.hash);
        });

        fr.appendChild(el);
        i++;
    }

    elementCol.push(translate, translate.firstElementChild);

    document.addEventListener("click", e => {
        if (!elementCol.includes(e.target)) {
            for (let i = 0; i < elementCol.length; i++) {
                if (i < 3) {
                    elementCol[i].style.animation = 'fader .3s forwards';
                    setTimeout(() => {elementCol[i].remove();}, 320);
                }
            }
        }
    });

    transCont.appendChild(fr);
});

const getLangText = () => {
    return langText;
}
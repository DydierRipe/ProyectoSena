const langText = [];

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

const getLangText = () => {
    return langText;
}
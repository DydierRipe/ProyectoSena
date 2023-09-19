const langText = [];

const setLang = (lang, filename) => {
    
    fetch(`/language/${lang}/${filename}`, { 
        method: "POST",
    }).then(res => res.json())
    .then(res => {
        const textLang = document.querySelectorAll('.t');
        const plLang = document.querySelectorAll('.pl');

        for (let i = 0; i < textLang.length; i++) textLang[i].textContent = res[0][i+1];
        for (let i = 0; i < plLang.length; i++) plLang[i].placeholder = res[1][i];
        
        langText.push(res[2], res[3]);
    });
}

const getLangText = () => {
    return langText;
}
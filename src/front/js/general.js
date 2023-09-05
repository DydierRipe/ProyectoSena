const searchB = document.querySelector("#search-bar");
const titLog = document.querySelector(".tit-log");
const cart = document.querySelector(".cart");
const menu = document.querySelector(".icon");
const usIcon = document.querySelector(".user-icon");

document.addEventListener("keyup", e => {
    if (searchB) {
        if (e.key == "Enter" && searchB.value.length != 0 && searchB === document.activeElement) {
            window.location.replace("/search" + "#" + searchB.value);
        }    
    }
});

titLog.addEventListener("click", () => {
    window.location.replace("/");
});

cart.addEventListener("click", () => {
    window.location.replace("/reserved");
});

menu.addEventListener("click", () => {
    const fr = document.createDocumentFragment();
    const list = document.createElement("ol");
    const item1 = document.createElement("li");
    const item2 = document.createElement("li");
    const item3 = document.createElement("li");
    const item4 = document.createElement("li");
    const item5 = document.createElement("li");
    const item6 = document.createElement("li");
    const item7 = document.createElement("li");

    list.classList.add("options");
    item1.textContent = "Create product";
    item2.textContent = "Search";
    item3.textContent = "Users";
    item4.textContent = "Facebook";
    item5.textContent = "Instagram";
    item6.textContent = "X";
    item7.textContent = "Quit";
    list.style.animation = "expander1 .3s forwards";

    const rem = e => {
        if (e.target != menu && e.target != list) {
            list.style.animation = "decreaser1 .3s forwards";
            setTimeout(() => list.remove(), "300");
            window.removeEventListener("click", window);   
        }
    }

    item1.addEventListener("click", () => window.location.replace('/creating'));
    item2.addEventListener("click", () => window.location.replace('/search'));
    item3.addEventListener("click", () => window.location.replace('/usersadmin'));
    item4.addEventListener("click", () => window.location.href = 'https://www.facebook.com/groups/1450191902191128/');
    item5.addEventListener("click", () => window.location.href = 'https://twitter.com/Capymusic_of?s=20');
    item6.addEventListener("click", () => window.location.href = 'https://www.instagram.com/capymusic_oficial/?hl=es');
    item7.addEventListener("click", e => rem(e));
    window.addEventListener("click", e => rem(e));

    list.appendChild(item1);
    list.appendChild(item2);
    list.appendChild(item3);
    list.appendChild(item4);
    list.appendChild(item5);
    list.appendChild(item6);
    list.appendChild(item7);
    fr.appendChild(list);
    document.body.appendChild(fr);
});

if (userString === null) {
    const pus = document.querySelector(".logged > p");
    pus.innerHTML = "Not logged";

    usIcon.addEventListener("click", () => {
        const fr = document.createDocumentFragment();
        const list = document.createElement("ol");
        const item1 = document.createElement("li");
        const item2 = document.createElement("li");
        const item3 = document.createElement("li");
    
        list.classList.add("options");
        item1.textContent = "Log in";
        item2.textContent = "Sign up";
        item3.textContent = "Quit";
        list.style.animation = "expander2 .3s forwards";
    
        const rem = e => {
            if (e.target != usIcon && e.target != list) {
                list.style.animation = "decreaser2 .3s forwards";
                setTimeout(() => list.remove(), "300");
                window.removeEventListener("click", window);   
            }
        }

        item1.addEventListener("click", () => window.location.replace('/login'));
        item2.addEventListener("click", () => window.location.replace('/signup'));
        item3.addEventListener("click", e => rem(e));
        window.addEventListener("click", e => rem(e));
    
        list.appendChild(item1);
        list.appendChild(item2);
        list.appendChild(item3);
        fr.appendChild(list);
        document.body.appendChild(fr);
    });
} else {
    usIcon.addEventListener("click", () => {
        const fr = document.createDocumentFragment();
        const list = document.createElement("ol");
        const item1 = document.createElement("li");
        const item2 = document.createElement("li");
    
        list.classList.add("options");
        item1.textContent = "Log out";
        item2.textContent = "Quit";
        list.style.animation = "expander3 .3s forwards";
    
        const rem = (e) => {
            if (e.target != usIcon && e.target != list) {
                list.style.animation = "decreaser3 .3s forwards";
                setTimeout(() => list.remove(), "300");
                window.removeEventListener("click", window);   
            }
        }

        item1.addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.replace("/login");
        });
        item2.addEventListener("click", e => rem(e));
        window.addEventListener("click", e => rem(e));
    
        list.appendChild(item1);
        list.appendChild(item2);
        fr.appendChild(list);
        document.body.appendChild(fr);
    });
}


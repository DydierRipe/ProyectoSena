const userString = localStorage.getItem("user"); // user info
const userTable = document.querySelector(".users-table");

let changes = [];

const notPermission = () => {
    console.log("you cant")
    const fragment = document.createDocumentFragment();
    const title = document.createElement("h1");
    title.innerText = "You can't allow to this page";
    title.style = "text-align: center;";
    fragment.appendChild(title);
    document.body.appendChild(fragment);
}

const crud = {
    "delete": (email) => {
        
    },
    "create": (email, username, permission, password) => {
        
    },
    "modify": (modifiedValues) => {
        
    },
    "save": (completedChanges) => {
        fetch("/usersAdmin", { 
            method: "POST",
            body: JSON.stringify({"reason": "permission", "user": completedChanges}),
            headers : { "Content-type" : "application/json" }
        }).then(res => res.text())
        .then(res => {
            res = JSON.parse(res);
        });
    }
}

if (userString === null) {
    notPermission();
} else {

    fetch("/usersAdmin", { 
        method: "POST",
        body: JSON.stringify({"reason": "permission", "user": JSON.parse(userString)}),
        headers : { "Content-type" : "application/json" }
    }).then(res => res.text())
    .then(res => {
        res = JSON.parse(res);
        
        res.forEach(e => {
            const fragment = document.createDocumentFragment();
            const email = document.createElement("div");
            const username = document.createElement("div");
            const level = document.createElement("div");
            const actions = document.createElement("div");

            email.textContent = e.email;
            username.textContent = e.username;
            level.textContent = e.permissionlevel;

            email.classList.add("user");
            username.classList.add("user");
            level.classList.add("user");
            actions.classList.add("user", "actions");

            fragment.appendChild(email);
            fragment.appendChild(username);
            fragment.appendChild(level);
            fragment.appendChild(actions);
            userTable.appendChild(fragment);
        });
    });

}
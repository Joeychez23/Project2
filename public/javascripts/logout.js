async function logout() {
    //What to send
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
    }


    try {
        //Send / Receive                //Location
        const response = await fetch('/api/users/logout', options);
        //If received successfully
        if (response.ok) {
            document.location.replace(`/`);
        }
    }
    catch (err) { }
}

let time = 0;
function inActiveTime() {
    //Checks each minute
    setInterval(checkTimer, 60000);
    document.onmousemove = function () {
        time = 0;
    }
    document.onkeydown = function () {
        time = 0;
    }
}

inActiveTime();

async function checkTimer() {
    //Sets for 5 mins
    if (time == 5) {
        logout();
    }
    time = time + 1;
}

//Frontend Events
let logoutBtn = document.querySelector('#logoutBtn')

if (logoutBtn != null) {
    logoutBtn.addEventListener('click', logout);
}





//Search Bar 

const cardTemplate = document.querySelector(".userTemplate");
const cardContainer = document.querySelector(".userCards");
const searchInput = document.querySelector("#search");

let users = new Array;
searchInput.addEventListener("input", function (event) {
    const input = event.target.value.toLowerCase()
    const elements = document.querySelectorAll(".singleCard")
    const nameLink = document.querySelectorAll(".nameLink")
    for (let i = 0; i < elements.length; i++) {
        const isVisible = nameLink[i].value.includes(input);
        elements[i].classList.toggle('hide', !isVisible)
    }
    if (input.length == 0) {
        const elements = document.querySelectorAll(".singleCard")
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.toggle('hide')
        }
    }
})

document.querySelector('#root').addEventListener('click', function () {
    const elements = document.querySelectorAll(".singleCard")
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add('hide')
    }
})


searchInput.addEventListener('click', function () {
    const elements = document.querySelectorAll(".singleCard")
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('hide')
    }
})



async function setSearchBar() {
    const options = {
        method: 'GET'
    }
    const response = await fetch('/api/users/', options);
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
        const card = cardTemplate.content.cloneNode(true);
        const username = card.querySelector(".nameLink")
        //const singleCard = card.querySelector(".singleCard")
        const nameLink = card.querySelector(".nameLink")
        username.innerText = `${data[i].username}`;
        username.setAttribute('href', `/portfolio/${data[i].id}`);
        nameLink.value = `${data[i].username.toLowerCase()}`
        cardContainer.append(card);
    }
    const elements = document.querySelectorAll(".singleCard")
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.toggle('hide')
    }

}

setSearchBar();


//Next Page 
/*
if (document.querySelector('#forwardPage') != null) {
    document.querySelector('#forwardPage').addEventListener('click', async function () {


        userID = document.querySelector('#root').getAttribute('fromID')
        if (userID == 0) {
            const response = await fetch('/api/posts/getAllPost')
            const data = await response.json();
            let splitLocation = window.location.href.split('/post/')


            let currPostId = Number(splitLocation[1]);
            let index;
            for (let i = 0; i < data.length; i++) {
                if(data[i].id == currPostId) {
                    index = i;
                }
            }

            if(data[index + 1] != null) {
                window.location.href = `${splitLocation[0]}/post/${data[index + 1].id}`
            }




        } else if (userID > 0 && userID != null) {
                   
        }




        console.log(data)

        //id += 1

        //window.location.href = `${findId[0]}/post/${id}`
    })
}*/
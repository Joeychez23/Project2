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
    catch (err) {}
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
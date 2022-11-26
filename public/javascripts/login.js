let currId;


async function checkLogin(event) {
    event.preventDefault();

    //Grabs username and password values from textbox
    const email = document.getElementById('emailLog').value.trim();
    const password = document.getElementById('passLog').value.trim();

    //Check if username and password != NULL
    if (email && password) {

        //What to send
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        }

        //Send / Receive                //Location
        const response = await fetch('/api/users/login', options);


        const data = await response.json()
        if (response.ok) {
            console.log(data);
            currId = data.user.id;
            setTimeout(function() {
                window.location.href = '/dashboard'
            }, 100)
        } else {
            alert(response.statusText);
        }
    }
}


//Frontend Events

document.querySelector('.logForm').addEventListener('submit', checkLogin);


window.addEventListener("keypress", function(event) {
    if(event.key == 13) {
        checkLogin
    }
});




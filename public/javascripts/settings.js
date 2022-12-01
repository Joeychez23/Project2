async function checkSettingUpdate() {
    //event.preventDefault();


    //Grabs username and password values from textbox
    const email = document.getElementById('emailSet').value.trim();
    const username = document.getElementById('userSet').value.trim();
    const currPass = document.getElementById('passCheck').value.trim();
    const password1 = document.getElementById('passSet1').value.trim();
    const password2 = document.getElementById('passSet2').value.trim();


    const userID = document.getElementById('settingBox').getAttribute('userID');


    const options = {
        method: 'GET'
    }
    const responseAll = await fetch('/api/users/', options)

    const dataAll = await responseAll.json();

    const reponseUser = await fetch(`api/users/getUserEmail/`)

    const userData = await reponseUser.json()


    const responseEmail = await fetch(`api/users/allEmail/`);

    const emailData = await responseEmail.json()

    let repeatUsername = false;

    let repeatEmail = false;

    //console.log(dataAll)

    //console.log(userData)

    //console.log(emailData)

    for(let i = 0; i < dataAll.length; i++) {
        if(dataAll[i].username.toLowerCase() == username.toLowerCase() && dataAll[i].username.toLowerCase() != userData.username.toLowerCase()) {
            repeatUsername = true
        }
        if(emailData[i].email == email && emailData[i].email != userData.email) {
            repeatEmail = true
        }
    }

    //console.log(repeatUsername)

    //console.log(repeatEmail)

    //Check if username and password != NULL
    if (username && password1 && password2 && email && password1 == password2  && currPass && repeatEmail == false && repeatUsername == false) {


        //What to send
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                email: email, 
                username: username, 
                currPass: currPass,
                password: password2,
            })
        }

        //Send / Receive                //Location
        const response = await fetch('/api/users/settingUpdate', options);

        //If received successfully
        if (response.ok) {
            window.location.reload();
        } else {
            alert(response.statusText);
        }
    } else {
        if(repeatEmail) {
            alert("Email already in use");
        }
        if(repeatUsername) {
            alert("Username already in use");
        }
        if(password1 != password2) {
            alert("New passwords don't match");
        }
    }
}


//Frontend Events
document.querySelector('.setForm').addEventListener('submit', checkSettingUpdate);


window.addEventListener("keypress", function(event) {
    if(event.key == 13) {
        checkSettingUpdate();
    }
});
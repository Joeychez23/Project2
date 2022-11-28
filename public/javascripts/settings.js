async function checkSettingUpdate() {
    //event.preventDefault();


    //Grabs username and password values from textbox
    const email = document.getElementById('emailSet').value.trim();
    const username = document.getElementById('userSet').value.trim();
    const currPass = document.getElementById('passCheck').value.trim();
    const password1 = document.getElementById('passSet1').value.trim();
    const password2 = document.getElementById('passSet2').value.trim();

    //Check if username and password != NULL
    if (username && password1 && password2 && email && password1 == password2  && currPass) {


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
            setTimeout(function() {
                window.location.reload()
            }, 100);
        } else {
            alert(response.statusText);
        }
    } else {
        alert("Invalid Inputs");
    }
}


//Frontend Events
document.querySelector('.setForm').addEventListener('submit', checkSettingUpdate);

/*
window.addEventListener("keypress", function(event) {
    if(event.key == 13) {
        checkSettingUpdate();
    }
});*/
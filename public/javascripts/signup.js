async function checkSignup(event) {
    event.preventDefault();


    //Grabs username and password values from textbox
    const email = document.getElementById('emailSign').value.trim();
    const username = document.getElementById('userSign').value.trim();
    const password1 = document.getElementById('passSign1').value.trim();
    const password2 = document.getElementById('passSign2').value.trim();

    //Check if username and password != NULL
    if (username && password1 && password2 && email && password1 == password2) {

        //What to send
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                email: email, 
                username: username, 
                password: password2,
            })
        }

        //Send / Receive                //Location
        const response = await fetch('/api/users/', options);

        //If received successfully
        if (response.ok) {
            setTimeout(function() {
                window.location.href = '/dashboard'
            }, 100);
        } else {
            alert(response.statusText);
        }
    } else {
        alert("Invalid Inputs");
    }
}


//Frontend Events
document.querySelector('.signForm').addEventListener('submit', checkSignup);
window.addEventListener("keypress", function(event) {
    if(event.key == 13) {
        checkSignup
    }
});
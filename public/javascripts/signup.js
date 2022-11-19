async function checkSignup(event) {
    event.preventDefault();


    //Grabs username and password values from textbox
    const username = document.getElementById('userSign').value.trim();
    const password = document.getElementById('passSign').value.trim();

    //Check if username and password != NULL
    if (username && password) {

        //What to send
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password })
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
    }
}


//Frontend Events
document.querySelector('.signForm').addEventListener('submit', checkSignup);
window.addEventListener("keypress", function(event) {
    if(event.key == 13) {
        checkSignup
    }
});
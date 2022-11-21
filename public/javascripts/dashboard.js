
const imageInput = document.querySelector("#imageInput");
let uploadedImage = "";
let base64;



imageInput.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", function() {
        uploadedImage = reader.result;
        document.querySelector('#displayImage').style.backgroundImage = `url(${uploadedImage})`
        base64 = uploadedImage
        console.log(base64)
    });
    reader.readAsDataURL(this.files[0]);
})





//Create new post
async function logToDash(event) {
    event.preventDefault();

    //const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();

    //title &&
    if (content && base64) {

        //What to send
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            // title, 
            body: JSON.stringify({content , base64})
        }

        //Send / Receive             //Location
        const response = await fetch('/api/posts/', options);

        //If received successfully
        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert(response.statusText);
        }
    }
}




//Sets users screen to allow the update 
async function uppost(event) {
    //const title = document.getElementById('postTitle')
    const content = document.getElementById('postContent')
    const displayImage = document.querySelector('#displayImage');
    //If more then 1 of the same button / event is present then event.target allows the computer to accosiate which element called the event
    //Thus the correct post id attribute can be grabed from getAttribute()
    const id = event.target.getAttribute('postId');

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }

    //Send / Receive               //Location
    const response = await fetch(`/api/posts/getpost/${id}`, options);


    //If received successfully
    if (response.ok) {
        let data = await response.json();
        console.log(data)
        //title.value = `${data.title}`;
        content.value = `${data.description}`;
        displayImage.style.backgroundImage = `url(${data.base64})`
        base64 = data.base64;
        let upEl = document.querySelector('#subUp')
        upEl.style.display = 'inline';
        upEl.setAttribute('postId', `${data.id}`)


    } else {
        alert('Failed to delete post');
    }
}


//Sends the update request to the server and reload the page if successful
async function upToDash(event) {
    event.preventDefault();


    //const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();


    const id = document.querySelector('#subUp').getAttribute('postId');

    //title &&
    if (content && base64) {

        //What to send
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            //title, 
            body: JSON.stringify({ id, content, base64})
        }

        //Send / Receive             //Location
        const response = await fetch(`/api/posts/${id}`, options);

        //If received successfully
        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert(response.statusText);
        }
    }
}



async function delpost(event) {
    //If more then 1 of the same button / event is present then event.target allows the computer to accosiate which element called the event
    //Thus the correct post id attribute can be grabed from getAttribute()
    const id = event.target.getAttribute('postId');

    //What to send
    const options = {
        method: 'DELETE',
    }

    //Send / Receive               //Location
    const response = await fetch(`/api/posts/${id}`, options);

    //If received successfully
    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert('Failed to delete post');
    }
}






//Frontend Events
document.querySelector('#creUp').addEventListener('click', logToDash);

document.querySelector('#subUp').addEventListener('click', upToDash);

let delpostBtn = document.querySelectorAll('.delBtn');


if (delpostBtn != null) {
    for (let i = 0; i < delpostBtn.length; i++) {
        delpostBtn[i].addEventListener('click', delpost);
    }
}


let uppostBtn = document.querySelectorAll('.upBtn');

if (uppostBtn != null) {
    for (let i = 0; i < uppostBtn.length; i++) {
        uppostBtn[i].addEventListener('click', uppost);
    }
}



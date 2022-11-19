async function createComment(event) {
    event.preventDefault();
    //Grabs commentId from the hjs attribute
    const postId = document.getElementById('comCre').getAttribute('postId');
    console.log(postId)
    //Grabs the users comment from the hjs element
    const description = document.querySelector('#comment_description').value.trim();

    if (description) {

        //What to send
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postId, description })
        }

        //Send / Receive             //Location
        const response = await fetch('/api/comments/', options);
        //If received successfully
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to send comment');
        }

    }
}




async function upPage(event) {
    const comInput = document.getElementById('comment_description')
    //If more then 1 of the same button / event is present then event.target allows the computer to accosiate which element called the event
    //Thus the correct post id attribute can be grabed from getAttribute()
    const id = event.target.getAttribute('commentId');

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }

    //Send / Receive               //Location
    const response = await fetch(`/api/comments/getComment/${id}`, options);

    //If received successfully
    if (response.ok) {
        let data = await response.json();
        comInput.value = `${data.comment_description}`;
        let upEl = document.querySelector('#upCom')
        upEl.style.display = 'inline';
        upEl.setAttribute('commentId', `${data.id}`)


    } else {
        alert('Failed to find comment');
    }
}








async function upComment(event) {
    event.preventDefault();


    const comInput = document.getElementById('comment_description').value.trim();


    const id = document.querySelector('#upCom').getAttribute('commentId');

    if (comInput) {

        //What to send
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, comInput })
        }

        //Send / Receive             //Location
        const response = await fetch(`/api/comments/${id}`, options);

        //If received successfully
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}


async function delComment(event) {
    //If more then 1 of the same button / event is present then event.target allows the computer to accosiate which element called the event
    //Thus the correct comment id attribute can be grabed from getAttribute()
    const id = event.target.getAttribute('commentId');

    //What to send
    const options = {
        method: 'DELETE',
    }

    //Send / Receive               //Location
    const response = await fetch(`/api/comments/${id}`, options);

    //If received successfully
    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to delete comment');
    }
}


//Frontend Events
let createComBtn = document.getElementById('comCre')

if (createComBtn != null) {
    createComBtn.addEventListener('click', createComment);
}



let upCom = document.querySelector('#upCom')

if (upCom != null) {
    upCom.addEventListener('click', upComment);
}


let delComBtn = document.querySelectorAll('.delCom');

if (delComBtn != null) {
    for (let i = 0; i < delComBtn.length; i++) {
        delComBtn[i].addEventListener('click', delComment);
    }
}


let upPageBtn = document.querySelectorAll('.upPage');

if (upPageBtn != null) {
    for (let i = 0; i < upPageBtn.length; i++) {
        upPageBtn[i].addEventListener('click', upPage);
    }
}
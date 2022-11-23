onPageLoad();


/*LOADS PAGE FUNCTION START*/


async function onPageLoad() {
    portBool = window.location.href.split('portfolio=')
    portBool = (portBool[1] === 'true')
    console.log(portBool)
    let userID = document.querySelector('#postBtnBox').getAttribute("userID");
    if (portBool == false) {
        const response = await fetch('/api/posts/getAllPost')
        const data = await response.json();
        let splitLocation = window.location.href.split('/post/')
        splitLocation = splitLocation[1].split('?');
        let currPostId = Number(splitLocation[0]);
        let index;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == currPostId) {
                index = i;
            }
        }

        if (data[index + 1] != null) {
            document.querySelector('#forwardBtn').classList.remove('hide')
        }
        if (data[index - 1] != null) {
            document.querySelector('#backBtn').classList.remove('hide')
        }




    } else if (portBool == true && portBool != null) {
        const response = await fetch(`/api/users/getUser/${userID}`);
        const data = await response.json();
        let splitLocation = window.location.href.split('/post/')
        splitLocation = splitLocation[1].split('?');
        let currPostId = Number(splitLocation[0]);
        let index;
        for (let i = 0; i < data.posts.length; i++) {
            if (data.posts[i].id == currPostId) {
                index = i;
            }
        }

        if (data.posts[index + 1] != null) {
            document.querySelector('#forwardBtn').classList.remove('hide')
        }
        if (data.posts[index - 1] != null) {
            document.querySelector('#backBtn').classList.remove('hide')
        }
    }
}


/* LOADS PAGE FUNCTION END




/*ALL THE BUTTON CLICK FUNCTIONS START*/

//Creates Comment 
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



//Updates the users page but not the database
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







//Updates the users page with the inputed values
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




//Deletes Comments
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





/*ALL THE BUTTON CLICK FUNCTIONS END*/




/* FRONT END EVERNTS START */



//Create comment button
let createComBtn = document.getElementById('comCre')

if (createComBtn != null) {
    createComBtn.addEventListener('click', createComment);
}


//update comment to page button
let upCom = document.querySelector('#upCom')

if (upCom != null) {
    upCom.addEventListener('click', upComment);
}


//update database and reload page button
let upPageBtn = document.querySelectorAll('.upPage');

if (upPageBtn != null) {
    for (let i = 0; i < upPageBtn.length; i++) {
        upPageBtn[i].addEventListener('click', upPage);
    }
}



//Delete comment button
let delComBtn = document.querySelectorAll('.delCom');

if (delComBtn != null) {
    for (let i = 0; i < delComBtn.length; i++) {
        delComBtn[i].addEventListener('click', delComment);
    }
}









//Next Post Button event
if (document.querySelector('#forwardBtn') != null) {
    document.querySelector('#forwardBtn').addEventListener('click', async function () {


        portBool = window.location.href.split('portfolio=')
        portBool = (portBool[1] === 'true')
        //console.log(portBool)
        let userID = document.querySelector('#postBtnBox').getAttribute("userID");
        if (portBool == false) {
            const response = await fetch('/api/posts/getAllPost')
            const data = await response.json();
            let splitLocation = window.location.href.split('/post/')
            let baseURL = splitLocation[0]
            splitLocation = splitLocation[1].split('?');
            let currPostId = Number(splitLocation[0]);
            let index;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == currPostId) {
                    index = i;
                }
            }

            if (data[index + 1] != null) {
                window.location.href = `${baseURL}/post/${data[index + 1].id}?portfolio=false`
            }




        } else if (portBool == true && portBool != null) {
            const response = await fetch(`/api/users/getUser/${userID}`);
            const data = await response.json();
            let splitLocation = window.location.href.split('/post/')
            let baseURL = splitLocation[0]
            splitLocation = splitLocation[1].split('?');
            let currPostId = Number(splitLocation[0]);
            let index;
            for (let i = 0; i < data.posts.length; i++) {
                if (data.posts[i].id == currPostId) {
                    index = i;
                }
            }

            if (data.posts[index + 1] != null) {
                window.location.href = `${baseURL}/post/${data.posts[index + 1].id}?portfolio=true`
            }
        }
    })
}


//Prevous Post Button event
if (document.querySelector('#backBtn') != null) {
    document.querySelector('#backBtn').addEventListener('click', async function () {


        portBool = window.location.href.split('portfolio=')
        portBool = (portBool[1] === 'true')
        console.log(portBool)
        let userID = document.querySelector('#postBtnBox').getAttribute("userID");
        if (portBool == false) {
            const response = await fetch('/api/posts/getAllPost')
            const data = await response.json();
            let splitLocation = window.location.href.split('/post/')
            let baseURL = splitLocation[0]
            splitLocation = splitLocation[1].split('?');
            let currPostId = Number(splitLocation[0]);
            let index;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == currPostId) {
                    index = i;
                }
            }

            if (data[index - 1] != null) {
                window.location.href = `${baseURL}/post/${data[index - 1].id}?portfolio=false`
            }




        } else if (portBool == true && portBool != null) {
            const response = await fetch(`/api/users/getUser/${userID}`);
            const data = await response.json();
            let splitLocation = window.location.href.split('/post/')
            let baseURL = splitLocation[0]
            splitLocation = splitLocation[1].split('?');
            let currPostId = Number(splitLocation[0]);
            let index;
            for (let i = 0; i < data.posts.length; i++) {
                if (data.posts[i].id == currPostId) {
                    index = i;
                }
            }

            if (data.posts[index - 1] != null) {
                window.location.href = `${baseURL}/post/${data.posts[index - 1].id}?portfolio=true`
            }
        }
    })
}




/* FRONT END EVERNTS END */

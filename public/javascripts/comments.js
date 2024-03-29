

onPageLoad();


/*LOADS PAGE FUNCTION START*/

//Runs on page load
async function onPageLoad() {
    portBool = window.location.href.split('portfolio=')
    let portUser = (portBool[1] === 'user');
    let portGlobal = (portBool[1] === 'global');
    let portHome = (portBool[1] === 'home');
    let userID = document.querySelector('#postBtnBox').getAttribute("userID");
    if (portGlobal) {
        const response = await fetch('/api/posts/getAllPost')
        const data = await response.json();
        console.log(data)
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
            document.querySelector('#forwardBtn').classList.remove('disabled')
            document.querySelector('#forwardBtn').classList.add('btn-primary')
        }
        if (data[index - 1] != null) {
            document.querySelector('#backBtn').classList.remove('disabled')
            document.querySelector('#backBtn').classList.add('btn-primary')
        }

    }


    if (portUser) {
        const response = await fetch(`/api/users/getUser/${userID}`);
        const data = await response.json();

        console.log(data)
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
            document.querySelector('#forwardBtn').classList.remove('disabled')
            document.querySelector('#forwardBtn').classList.add('btn-primary')
        }
        if (data.posts[index - 1] != null) {
            document.querySelector('#backBtn').classList.remove('disabled')
            document.querySelector('#backBtn').classList.add('btn-primary')
        }
    }

    if (portHome) {
        const response = await fetch(`/api/posts/userHomeData`);

        const data = await response.json()

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
            document.querySelector('#forwardBtn').classList.remove('disabled')
            document.querySelector('#forwardBtn').classList.add('btn-primary')
        }
        if (data[index - 1] != null) {
            document.querySelector('#backBtn').classList.remove('disabled')
            document.querySelector('#backBtn').classList.add('btn-primary')
        }
    }




    const likeBtnBox = document.querySelector('#likeBtnBox')

    const likeBtn = document.querySelector('#likeBtn')








    const visLikes = document.querySelector('#likes')



    //Sets amount of total like on page
    async function setLikeCount() {


        let splitLocation = window.location.href.split('/post/')
        checkParams = splitLocation[1].split('?');
        const currPostId = Number(checkParams[0]);
        const response = await fetch(`/api/posts/getPost/${currPostId}`)
        const data = await response.json()




        let likes

        let countLikes;

        if (data.likes != null) {
            likes = data.likes.split(',')
            countLikes = likes.length
        }

        if (data.likes == null) {
            countLikes = 0
        }

        visLikes.innerHTML = `<a class="userLink" href="/likes/${currPostId}">Likes</a>: ${countLikes}`;

        visLikes.classList.remove('hide')
    }
    setLikeCount();




    if (likeBtnBox != null) {
        async function setPage() {


            let splitLocation = window.location.href.split('/post/')
            checkParams = splitLocation[1].split('?');
            const currPostId = Number(checkParams[0]);
            const response = await fetch(`/api/posts/getPost/${currPostId}`)
            const data = await response.json()
            logID = likeBtnBox.getAttribute('logID')



            let currLikes = new Array

            if (data.likes != null) {
                currLikes = data.likes.split(',')
            }

            liked = false;


            for (let i = 0; i < currLikes.length; i++) {
                if (Number(currLikes[i]) == Number(logID)) {
                    liked = true;
                }
            }

            if (liked == true) {
                likeBtn.classList.remove('disabled')
                likeBtn.innerText = "Unlike"
                likeBtn.value = 1
                likeBtn.classList.add('btn-danger')
            }

            if (liked == false) {
                likeBtn.classList.remove('disabled')
                likeBtn.innerText = "Like"
                likeBtn.value = 0
                likeBtn.classList.add('btn-primary')
            }
        }
        setPage();
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
            body: JSON.stringify({ 
                postId: postId, 
                description: description })
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
        let portUser = (portBool[1] === 'user');
        let portGlobal = (portBool[1] === 'global');
        let portHome = (portBool[1] === 'home');
        let userID = document.querySelector('#postBtnBox').getAttribute("userID");
        if (portGlobal) {
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
                window.location.href = `${baseURL}/post/${data[index + 1].id}?portfolio=global`
            }




        }

        if (portUser) {
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
                window.location.href = `${baseURL}/post/${data.posts[index + 1].id}?portfolio=user`
            }
        }

        if (portHome) {
            const response = await fetch(`/api/posts/userHomeData`);

            const data = await response.json()

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
                window.location.href = `${baseURL}/post/${data[index + 1].id}?portfolio=home`
            }
        }
    })
}


//Prevous Post Button event
if (document.querySelector('#backBtn') != null) {
    document.querySelector('#backBtn').addEventListener('click', async function () {


        portBool = window.location.href.split('portfolio=')
        let portUser = (portBool[1] === 'user');
        let portGlobal = (portBool[1] === 'global');
        let portHome = (portBool[1] === 'home');
        let userID = document.querySelector('#postBtnBox').getAttribute("userID");
        if (portGlobal) {
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
                window.location.href = `${baseURL}/post/${data[index - 1].id}?portfolio=global`
            }




        }

        if (portUser) {
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
                window.location.href = `${baseURL}/post/${data.posts[index - 1].id}?portfolio=user`
            }
        }

        if (portHome) {
            const response = await fetch(`/api/posts/userHomeData`);

            const data = await response.json()

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
                window.location.href = `${baseURL}/post/${data[index - 1].id}?portfolio=home`
            }
        }
    })
}






















//Like Button Click
const likeBtnBox = document.querySelector('#likeBtnBox')

const likeBtn = document.querySelector('#likeBtn')

if (likeBtnBox != null) {
    likeBtn.addEventListener('click', async function () {
        let splitLocation = window.location.href.split('/post/')
        checkParams = splitLocation[1].split('?');
        const currPostId = Number(checkParams[0]);
        const response = await fetch(`/api/posts/getPost/${currPostId}`)
        const data = await response.json()
        logID = likeBtnBox.getAttribute('logID')
        let liked;

        if (likeBtn.value == 1) {
            liked = true
        }

        if (likeBtn.value == 0) {
            liked = false
        }


        if (liked == true) {

            let likeArr = new Array


            if (data.likes != null) {
                likeArr = data.likes.split(',')
            }

            if (data.likes == null) {
                likeArr = ""
            }

            let likeStr = "";
            for (let i = 0; i < likeArr.length; i++) {
                if (Number(likeArr[i]) != Number(logID)) {
                    likeStr += `${Number(likeArr[i])}`
                    likeStr += ','
                }
            }


            likeStr = likeStr.substring(0, likeStr.length - 1)

            console.log(likeStr)

            const likes = likeStr

            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    likes: likes
                })
            }

            const upResponse = await fetch(`/api/posts//updateLikes/${currPostId}`, options);

            if (upResponse.ok) {
                window.location.reload();
            }
        }

        if (liked == false) {

            let likeStr;
            if (data.likes != null) {
                likeStr = data.likes;
                likeStr += `,${logID}`
            }

            if (data.likes == null) {
                likeStr = "";
                likeStr += `${logID}`
            }


            const likes = likeStr

            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    likes: likes
                })
            }

            const upResponse = await fetch(`/api/posts//updateLikes/${currPostId}`, options);

            if (upResponse.ok) {
                window.location.reload();
            }
        }
    })
}





/* FRONT END EVERNTS END */

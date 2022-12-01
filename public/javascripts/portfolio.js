

const followBtn = document.querySelector('#followBtn');
const portfolioID = document.querySelector('#portfolio').getAttribute('fromID');



async function setFollowData() {
    const response = await fetch(`/api/users/getFollowData/${portfolioID}`);
    const data = await response.json();

    const setFollowers = document.querySelector('#followers')

    const setFollowing = document.querySelector('#following')

    let followers = data.followers.split(',')

    let following = data.following.split(',')

    if (followers == '') {
        followers = 0;
    }

    else {
        followers = followers.length
    }
    

    if (following == '') {
        following = 0;
    }

    else {
        following = following.length
    }

    setFollowers.innerHTML = `<a class="userLink" href="/followers/${portfolioID}">Followers</a>: ${followers}`;

    setFollowing.innerHTML = `<a class="userLink" href="/following/${portfolioID}">Following</a>: ${following}`;

    setFollowers.classList.remove('hide')

    setFollowing.classList.remove('hide')
}

setFollowData();







if (followBtn != null) {
    const currUser = followBtn.getAttribute('logID');
    async function setPage() {
        const response = await fetch(`/api/users/getFollowData/${currUser}`);
        const data = await response.json()

        let currFollowing = new Array

        console.log(data)
        if (data.following != null) {
            currFollowing = data.following.split(',')
        }

        following = false;

        for (let i = 0; i < currFollowing.length; i++) {
            if (Number(currFollowing[i]) == Number(portfolioID)) {
                following = true;
            }
        }

        if (following == true) {
            followBtn.innerText = "Unfollow"
            followBtn.value = 1
            followBtn.classList.remove('btn-primary')
            followBtn.classList.add('btn-danger')
        }

        if (data.id != portfolioID) {
            followBtn.classList.remove('hide');
        }

    }
    setPage();





    followBtn.addEventListener('click', async function () {
        let following;
        if (followBtn.value == 1) {
            following = true;
        }
        if (followBtn.value == 0) {
            following = false;
        }

        if (following == true) {
            const userResponse = await fetch(`/api/users/getFollowData/${currUser}`);
            const currUserData = await userResponse.json();


            const portResponse = await fetch(`/api/users/getFollowData/${portfolioID}`);
            const portUserData = await portResponse.json();


            let currUserArr = new Array
            if (currUserData.following != null) {
                currUserArr = currUserData.following.split(',')
            }

            let portUserArr = new Array;
            if (portUserData.followers != null) {
                portUserArr = portUserData.followers.split(',')
            }

            let userStr = "";
            let portStr = "";
            for (let i = 0; i < currUserArr.length; i++) {
                if (Number(currUserArr[i]) != portfolioID) {
                    userStr += `${Number(currUserArr[i])}`
                    userStr += ','
                }
            }

            for (let i = 0; i < portUserArr.length; i++) {
                if (Number(portUserArr[i]) != currUser) {
                    portStr += `${Number(portUserArr[i])}`
                    portStr += ','
                }
            }

            userStr = userStr.substring(0, userStr.length - 1)

            portStr = portStr.substring(0, portStr.length - 1)





            const currFollowing = userStr;
            const currFollowers = currUserData.followers


            console.log(`currFollowing: ${currFollowing}`)
            console.log(`currFollowers: ${currFollowers}`)


            const portFollowers = portStr;
            const portFollowing = portUserData.following


            console.log(`portFollowing: ${portFollowing}`)
            console.log(`portFollowers: ${portFollowers}`)




            const currOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    following: currFollowing,
                    followers: currFollowers
                })
            }

            const portOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    following: portFollowing,
                    followers: portFollowers
                })
            }

            const upCurrResponse = await fetch(`/api/users/updateUser/${currUser}`, currOptions);
            const upPortResponse = await fetch(`/api/users/updateUser/${portfolioID}`, portOptions);


            if (upCurrResponse.ok && upPortResponse.ok) {
                document.location.reload();
            }



        }

        if (following == false) {
            const userResponse = await fetch(`/api/users/getFollowData/${currUser}`);
            const currUserData = await userResponse.json();


            const portResponse = await fetch(`/api/users/getFollowData/${portfolioID}`);
            const portUserData = await portResponse.json();


            let currUserArr = new Array

            console.log(currUserData)
            if (currUserData.following != null && currUserData.following != '') {
                currUserArr = currUserData.following.split(',')
            }

            let portUserArr = new Array;
            if (portUserData.followers != null && portUserData.followers != '') {
                portUserArr = portUserData.followers.split(',')
            }

            let success1 = false;
            let success2 = false;

            let userStr = "";
            let portStr = "";
            for (let i = 0; i < currUserArr.length; i++) {
                if (Number(currUserArr[i]) != portfolioID) {
                    userStr += `${Number(currUserArr[i])}`
                    userStr += ','
                }
            }

            for (let i = 0; i < portUserArr.length; i++) {
                if (Number(portUserArr[i]) != currUser) {
                    portStr += `${Number(portUserArr[i])}`
                    portStr += ','
                }
            }

            userStr = userStr.substring(0, userStr.length - 1)

            portStr = portStr.substring(0, portStr.length - 1)


            if(userStr.length > 0) {
                userStr += `,${portfolioID}`
            }
            if(userStr == 0) {
                userStr += `${portfolioID}`
            }

            if(portStr.length > 0) {
                portStr += `,${currUser}`
            }

            if (portStr.length == 0) {
                portStr += `${currUser}`
            }



            const currFollowing = userStr;
            const currFollowers = currUserData.followers


            console.log(`currFollowing: ${currFollowing}`)
            console.log(`currFollowers: ${currFollowers}`)


            const portFollowers = portStr;
            const portFollowing = portUserData.following


            console.log(`portFollowing: ${portFollowing}`)
            console.log(`portFollowers: ${portFollowers}`)




            const currOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    following: currFollowing,
                    followers: currFollowers
                })
            }

            const portOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    following: portFollowing,
                    followers: portFollowers
                })
            }

            const upCurrResponse = await fetch(`/api/users/updateUser/${currUser}`, currOptions);
            const upPortResponse = await fetch(`/api/users/updateUser/${portfolioID}`, portOptions);



            if (upCurrResponse.ok && upPortResponse.ok) {
                document.location.reload();
            }



        }

    })
}
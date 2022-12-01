const router = require('express').Router();
const { Post, User, FollowData } = require('../../models');
const withAuth = require('../../utils/auth');


//Creates Post
router.post('/', withAuth, async function(req, res) {
    try {
        const data = await Post.create({
            description: req.body.content,
            base64: req.body.base64,
            user_id: req.session.user_id,
        });
        res.status(200).json(data);
    } 
    catch (err) {
        res.status(400).json(err);
    }
});


router.post('/:id', withAuth, async function(req, res) {
    try {
        const data = await Post.findByPk(req.params.id);
        await data.update({
            description: req.body.content,
            base64: req.body.base64,
            user_id: req.session.user_id,
        })

        await data.save();
        res.status(200).json(data);
    } 
    catch (err) {
        res.status(400).json(err);
    }
});



//Deletes Post with giving id
router.delete('/:id', withAuth, async function(req, res) {
    try {
        const data = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if(!data) {
            res.status(404).json({message: 'Post not found'})
            return
        }
        res.status(200).json(data)
    } 
    catch (err) {
        res.status(500).json(err);
    }
})

router.get('/getPost/:id',  withAuth, async function(req, res) {
    try {
        const data = await Post.findByPk(req.params.id);

        if(!data) {
            res.status(404).json({message: 'Post not found'})
            return
        }

        const post = data.get({
            plain: true
        })
        res.json(post)
    } 
    catch (err) {
        res.status(500).json(err);
    }
})

router.get('/getAllPost', async function(req, res) {
    try {;
        const data = await Post.findAll({
            //order: [["data_created", "DESC"]]
        });

        if(!data) {
            res.status(404).json({message: 'Post not found'})
            return
        }

        let posts = new Array
		for (let i = 0; i < data.length; i++) {
			posts[posts.length] = data[i].get({
				plain: true
			})
		}

        posts.sort(function (a, b) {
			return new Date(`${b.data_created}`).getTime() - new Date(`${a.data_created}`).getTime()
		})


        res.json(posts)
    } 
    catch (err) {
        res.status(500).json(err);
    }
})


router.get('/userHomeData', async function(req, res) {
    try {
		const response = await FollowData.findByPk(req.session.user_id);
		const followData = response.get({
			plain: true
		})

		let userFollowers = followData.following.split(',')



		if (userFollowers == '') {
			userFollowers = null;
		}


		let postIDs = new Array


		if (userFollowers != null) {
			for (let i = 0; i < userFollowers.length; i++) {
				const response = await User.findByPk(Number(userFollowers[i]), {
					attributes: {
						exclude: ['password']
					},
					include: [{
						model: Post
					}],
				})


				const data = await response.get({
					plain: true
				})


				for (let i = 0; i < data.posts.length; i++) {
					postIDs[postIDs.length] = data.posts[i].id
				}


			}


			let posts = new Array;

			for (let i = 0; i < postIDs.length; i++) {
				const data = await Post.findByPk(postIDs[i])


				for (let i = 0; i < 1; i++) {
					let addPostData = await data.get({
						plain: true
					})

					posts[posts.length] = addPostData
				}
			}

            posts.sort(function (a, b) {
                return new Date(`${b.data_created}`).getTime() - new Date(`${a.data_created}`).getTime()
            })

            res.json(posts)
		} else {
			let posts = new Array;
            res.json(posts);
		}

	} catch (err) {
		res.status(500).json(err)
	}
})



module.exports = router;
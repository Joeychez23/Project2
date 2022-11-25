const router = require('express').Router();
const { User, Post, Comment, FollowData } = require('../models');
const withAuth = require('../utils/auth');



//Gets all posts from all users to post to the Homepage 
router.get('/', async function (req, res) {
	try {
		const data = await Post.findAll({
			include: [{
				model: User,
				attributes: ['username']
			}]
		});

		let posts = new Array
		for (let i = 0; i < data.length; i++) {
			posts[posts.length] = data[i].get({
				plain: true
			})
		}

		res.render('global', {
			posts,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err)
	}
});



router.get('/home', withAuth, async function (req, res) {
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
				const data = await Post.findByPk(postIDs[i], {
					include: [{
						model: User,
						attributes: ['username']
					}]
				});


				for (let i = 0; i < 1; i++) {
					let addPostData = await data.get({
						plain: true
					})

					posts[posts.length] = addPostData
				}
			}


			res.render('home', {
				posts,
				logged_in: req.session.logged_in
			});
		} else {
			let posts = new Array;
			res.render('home', {
				posts,
				logged_in: req.session.logged_in
			});
		}

	} catch (err) {
		res.status(500).json(err)
	}
});


//If logged into session you'll be redirected to dashboard
router.get('/login', async function (req, res) {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}
	res.render('login');
});

//If logged into session you'll be redirected to dashboard
router.get('/signup', async function (req, res) {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}
	res.render('signup')
})


router.get('/dashboard', withAuth, async function (req, res) {
	try {

		//Grab current user from the User table using the primary key provided in the session
		const data = await User.findByPk(req.session.user_id, {
			attributes: {
				exclude: ['password']
			},
			include: [{
				model: Post
			}],
		})

		const user = data.get({
			plain: true
		})

		res.render('dashboard', {
			...user,
			logged_in: true,
			currUser: req.session.user_id

		})
	} catch (err) {
		res.status(500).json(err)
	}
})



////Gets 1 post from the id passed in to render the post and comments to the hjs file
router.get('/post/:id', async function (req, res) {
	try {
		const data = await Post.findByPk(req.params.id, {

			include: [
				{
					model: User,
					attributes: ['username']
				},
				{
					model: Comment,
					include: [
						User
					]
				},
			],

		});

		const post = data.get({
			plain: true
		})

		for (let i = 0; i < post.comments.length; i++) {
			post.comments[i].currUser = req.session.user_id

		}

		res.render('post', {
			...post,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
})




router.get('/portfolio/:id', async function (req, res) {
	try {
		const data = await User.findByPk(req.params.id, {
			attributes: {
				exclude: ['password']
			},
			include: [{
				model: Post
			}],
		})

		const post = data.get({
			plain: true
		})

		res.render('portfolio', {
			...post,
			logged_in: req.session.logged_in,
			currUser: req.session.user_id
		})
	} catch (err) {
		res.status(500).json(err);
	}
})



module.exports = router;
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
			logUser: req.session.user_id,
			posts,
			logged_in: req.session.logged_in,
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
				logUser: req.session.user_id,
				posts,
				logged_in: req.session.logged_in,
			});
		} else {
			let posts = new Array;
			res.render('home', {
				logUser: req.session.user_id,
				posts,
				logged_in: req.session.logged_in,
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
			logUser: req.session.user_id,
			...user,
			logged_in: true,

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
			logUser: req.session.user_id,
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
			logUser: req.session.user_id,
			...post,
			logged_in: req.session.logged_in,
		})
	} catch (err) {
		res.status(500).json(err);
	}
})





router.get('/following/:id', async function (req, res) {

	const response = await FollowData.findByPk(req.params.id);
	const followData = response.get({
		plain: true
	});


	let userFollowing = followData.following.split(',')


	const currResponse = await User.findByPk(req.params.id, {
		exclude: ['password']
	})


	const currData = currResponse.get({
		plain: true
	});


	if (userFollowing == '') {
		userFollowing = null;
	}


	let userIDs = new Array

	let users = new Array


	if (userFollowing != null) {
		for (let i = 0; i < userFollowing.length; i++) {
			userIDs[userIDs.length] = Number(userFollowing[i]);
		}


		for (let i = 0; i < userIDs.length; i++) {
			const response = await User.findByPk(userIDs[i], {
				attributes: {
					exclude: ['password']
				},
			})
			const data = await response.get({
				plain: true
			})
			users[users.length] = data;
		}
	
	
		res.render('following', {
			logUser: req.session.user_id,
			currId: currData.id,
			currUser: currData.username,
			users,
			logged_in: req.session.logged_in,
		})


	} 
	if (userFollowing == null) {
		res.render('following', {
			logUser: req.session.user_id,
			currId: currData.id,
			currUser: currData.username,
			users,
			logged_in: req.session.logged_in,
		})

	}
})


router.get('/followers/:id', async function (req, res) {

	const response = await FollowData.findByPk(req.params.id);
	const followData = response.get({
		plain: true
	});


	let userFollowers = followData.followers.split(',')


	const currResponse = await User.findByPk(req.params.id, {
		exclude: ['password']
	})


	const currData = currResponse.get({
		plain: true
	});


	if (userFollowers == '') {
		userFollowers = null;
	}


	let userIDs = new Array

	let users = new Array


	if (userFollowers != null) {
		for (let i = 0; i < userFollowers.length; i++) {
			userIDs[userIDs.length] = Number(userFollowers[i]);
		}


		for (let i = 0; i < userIDs.length; i++) {
			const response = await User.findByPk(userIDs[i], {
				attributes: {
					exclude: ['password']
				},
			})
			const data = await response.get({
				plain: true
			})
			users[users.length] = data;
		}
	
	
		res.render('following', {
			logUser: req.session.user_id,
			currId: currData.id,
			currUser: currData.username,
			users,
			logged_in: req.session.logged_in,
		})


	} 
	if (userFollowers == null) {
		res.render('following', {
			logUser: req.session.user_id,
			currId: currData.id,
			currUser: currData.username,
			users,
			logged_in: req.session.logged_in,
		})

	}
})



module.exports = router;
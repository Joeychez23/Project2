const router = require('express').Router();
const { User, Post, FollowData} = require('../../models');
const withAuth = require('../../utils/auth');
const validator = require('validator')
const Sequelize = require('sequelize')




//Signup / Create new user
router.post('/', async function (req, res) {
    try {
        const data = await User.create(req.body);

        const FollowConnect = await FollowData.create({
            id: data.id,
            following: '',
            followers: '',
        })

        req.session.save(function () {
            req.session.user_id = data.id;
            req.session.logged_in = true;

            res.json({ user: data, message: 'You are now signed up' });
        })

    } catch (err) {
        res.status(400).json(err);
    }
})






//Validates login information
router.post('/login', async function (req, res) {
    try {
        //Finds user data for desired username
        const data = await User.findOne({
            where: { email: req.body.email }
        });

        //Checks if 'data' / user data returns false
        if (!data) {
            res.status.json({ message: 'Incorrect username or password' });
            return;
        }



        //Conditionalize password against the eycrypted password to check if returned value is true
        const validPassword = await data.checkPassword(req.body.password);

        //Check password is false for desired username
        if (!validPassword) {
            res.status.json({ message: 'Invalid Password' })
            return
        }

        await req.session.save(function () {
            req.session.user_id = data.id;
            req.session.logged_in = true;

            res.json({ user: data, message: 'You are now logged in' });
        })

    } catch (err) {
        res.status(400).json(err);
    }
})





//Ends session when user logsout
router.post('/logout', async function (req, res) {
    try {
        if (req.session.logged_in) {
            req.session.destroy(function () {
                res.status(204).end();
            });
        }
    } catch (err) {
        res.json(err);
    }
})



//Gets all user data but with no email or password and at random
router.get('/', async function (req, res) {
    try {
        const data = await User.findAll({
            attributes: {
				exclude: ['password', 'email'],

			},
            order: Sequelize.literal('rand()'),
        });
        res.json(data);

    } catch (err) {
        res.json(err);
    }
})


//Gets all Emails but with out indexes and they're at random
router.get('/allEmail', withAuth, async function (req, res) {
    try {
        const data = await User.findAll({
            attributes: {
				exclude: ['password', 'id', 'username'],

			},
            order: Sequelize.literal('rand()')
        });
        res.json(data);

    } catch (err) {
        res.json(err);
    }
})


//Gets user by ID
router.get('/getUser/:id', async function (req, res) {
    try {
        const data = await User.findByPk(req.params.id,
        {
            attributes: {
				exclude: ['password', 'email']
			},
            include: {
                model: Post
            }
        });
        res.json(data);

    } catch (err) {
        res.json(err);
    }
})

//Gets user Email
router.get('/getUserEmail/', withAuth, async function (req, res) {
    try {
        const data = await User.findByPk(req.session.user_id, {
            attributes: {
				exclude: ['password']
			},
            include: {
                model: Post
            }
        });
        res.json(data);

    } catch (err) {
        res.json(err);
    }
})


//Gets follow data by ID
router.get('/getFollowData/:id', async function (req, res) {
    try {
        const data = await FollowData.findByPk(req.params.id)
        res.json(data);

    } catch (err) {
        res.json(err);
    }
})



//Update the user follower data
router.post('/updateUser/:id', withAuth, async function(req, res) {
    try {
        const data = await FollowData.findByPk(req.params.id);
        await data.update({
            followers: req.body.followers,
            following: req.body.following,
        })

        await data.save();
        res.status(200).json(data);
    } 
    catch (err) {
        res.status(400).json(err);
    }
});



//Updates user settings
router.post('/settingUpdate', withAuth, async function(req, res) {
    const data = await User.findByPk(req.session.user_id)

    const validatePassword = data.checkPassword(req.body.currPass);


    if (!validatePassword) {
        res.status(400).json({ message: 'Incorrect Password' })
        return
    }

    if(validator.isEmail(`${req.body.email}`) != true) {
        res.status(400).json({ message: 'Incorrect Email' })
        return
    }



    await data.update({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    })



    res.status(200).json(data);

})



module.exports = router;
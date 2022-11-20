const router = require('express').Router();
const { User } = require('../../models');




//Signup / Create new user
router.post('/', async function (req, res) {
    try {
        const data = await User.create(req.body);

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
            where: { username: req.body.username }
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

        //The server started a session for the users current browsing window when they started the site
        //This function saves the user id index into that session if logged in successfully
        //This allows the user to close the tab and open it back up and remain logged in
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




router.get('/', async function (req, res) {
    try {
        const data = await User.findAll({
            attributes: {
				exclude: ['password']
			}
        });
        res.json(data);

    } catch (err) {
        res.json(err);
    }
})



module.exports = router;
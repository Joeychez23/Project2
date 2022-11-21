const router = require('express').Router();
const { Post } = require('../../models');
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
        console.log(req.params.id);
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
        const data = await Post.findAll();

        if(!data) {
            res.status(404).json({message: 'Post not found'})
            return
        }

        res.json(data)
    } 
    catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;
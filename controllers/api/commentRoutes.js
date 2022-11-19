const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');





router.get('/getComment/:id', withAuth, async function(req, res) {
    try {
        console.log(req.params.id);
        const data = await Comment.findByPk(req.params.id);

        if(!data) {
            res.status(404).json({message: 'Comment not found'})
            return
        }

        const comment = data.get({
            plain: true
        })
        console.log(comment)
        res.json(comment)
    } 
    catch (err) {
        res.status(500).json(err);
    }
})





//Creates comment
router.post('/', withAuth, async function(req, res) {
    try {
        const data = await Comment.create({
            comment_description: req.body.description,
            post_id: req.body.postId,
            user_id: req.session.user_id
        });

        console.log(data)
        res.status(200).json(data);
    } 
    catch (err) {
        res.status(500).json(err);
    }
})




router.post('/:id', withAuth, async function(req, res) {
    try {
        const data = await Comment.findByPk(req.params.id);
        console.log(data)
        await data.update({
            comment_description: req.body.comInput,
            user_id: req.session.user_id,
        })

        await data.save();
        console.log(data);
        res.status(200).json(data);
    } 
    catch (err) {
        res.status(400).json(err);
    }
});



router.delete('/:id', withAuth, async function(req, res) {
    try {
        const data = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if(!data) {
            res.status(404).json({message: 'Comment not found'})
            return
        }
        res.status(200).json(data)
    } 
    catch (err) {
        res.status(500).json(err);
    }
})




module.exports = router;

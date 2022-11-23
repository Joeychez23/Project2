const sequelize = require('../config/connection');
const { User, Post, Comment, FollowData} = require('../models');
const postSeed = require('./postSeed.js');
const commentSeed = require('./commentSeed.js');
const userDataSeed = require('./userDataSeed.js');
const followData = require('./followDataSeed.js')

const seedAll = async () => {

    setTimeout(async function () {
        await sequelize.sync({ force: true });
        const users = await User.bulkCreate(userDataSeed, {
            individualHooks: true,
            returning: true,
        });

        const posts = await Post.bulkCreate(postSeed, {
            returning: true,
        });
        const comments = await Comment.bulkCreate(commentSeed, {
            returning: true,
        });
        const follows = await FollowData.bulkCreate(followData, {
            returning: true,
        })

    }, 50);
};

module.exports = seedAll();
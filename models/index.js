const User = require('./userData.js');
const Post = require('./post.js');
const Comment = require('./comments.js');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { Post, Comment, User };
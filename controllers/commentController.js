const {Comment, Reply} = require('../models');

module.exports.createComment = async function(req,res){
    let articleId = req.params.articleId;
    await Comment.create({
        author_name: req.body.author_name,
        body: req.body.body,
        commented_on: new Date,
        article_id: articleId
    });
    res.redirect(`/article/${articleId}`);
}

module.exports.addReply = async function(req,res){
    const parentComment = await Comment.findByPk(req.params.commentId);
    let articleId = parentComment.article_id;
    await Reply.create({
        author_name: req.body.author_name,
        body: req.body.body,
        commented_on: new Date,
        article_id: articleId,
        parent_comment_id: parentComment.id
    });
    res.redirect(`/article/${articleId}`);
}
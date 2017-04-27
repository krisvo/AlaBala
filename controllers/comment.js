
const Comment = require('mongoose').model('Comment');
const Article = require('mongoose').model('Article');
const Profile = require('mongoose').model('Profile');



module.exports = {
    commentPost: (req, res) => {
        let commentArgs = req.body;
        //console.log(commentArgs);
        let errorMsg = '';

        if (!req.isAuthenticated()) {
            errorMsg = 'You should be logged in to create comments!';
        }
        else if (commentArgs.content === null) {
            errorMsg = 'Invalid comments!';
        }
        if (errorMsg) {
            res.render('home/index', {error: errorMsg});
            return;
        }

        commentArgs.author = req.user.id;
        commentArgs.article = req.params.id;
        Article.findById(req.params.id).then(article => {
            if (!article) {
                res.render('article/index', {error: "No article found."});
                return;
            }
            req.user.isInRole('Admin').then(isAdmin => {
                let isUserAuthorized = isAdmin || req.user.isAuthor(article);

                Comment.create(commentArgs).then(comment => {
                    req.user.comments.push(comment.id);
                    req.user.save(err => {
                        if (err) {
                            res.redirect('/', {error: err.message});
                        }
                    });

                    article.comments.push(comment.id);
                    article.save(err => {
                        if (err) {
                            res.redirect('/', {error: err.message});
                            return;
                        }
                        res.redirect(`/article/details/${req.params.id}`);
                    });
                });
            });
        });
    },


    removeCommentGet: (req, res) => {
        let id = req.params.id;
        Comment.findOneAndRemove({ _id: id }).populate('article').then(comment => {
            let articleId = comment.article.id;
            req.user.isInRole('Admin').then(isAdmin => {
                let isUserAuthorized = isAdmin || req.user.isAuthor(comment);
                if (!isAdmin && !req.user.isAuthor(comment)) {
                    res.redirect(`/article/details/${articleId}`);
                    return;
                }
                res.redirect(`/article/details/${{articleId}}`);
            });
        });
    }
};


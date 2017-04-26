/**
 * Created by 450 G4 on 3/28/2017.
 */

const Article = require('mongoose').model('Article');
const Comment = require('mongoose').model('Comment');
const User = require('mongoose').model('User');
const Tag = require('mongoose').model('Tag');
const initializeTags = require('./../models/Tag');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },

    createPost: (req, res) => {
        let articleArgs = req.body;

        let errorMsg = '';

        if (!req.isAuthenticated()) {
            errorMsg = 'You should be logged in to make articles!';
        }
        else if (!articleArgs.title) {
            errorMsg = 'Invalid title!';
        }
        else if (!articleArgs.content) {
            errorMsg = 'Invalid content!';
        }
        if (errorMsg) {
            res.render('article/create', {error: errorMsg});
            return;
        }

        let image = req.files.image;

        if (image) {
            let filename = image.name;

            image.mv(`./public/images/${filename}`, err=> {
                if (err){
                    console.log(err.message);
                }

            });
        }

        articleArgs.author = req.user.id;

        articleArgs.imagePath = `/images/${image.name}`;

        articleArgs.tags = [];
        Article.create(articleArgs).then(article => {
            let tagNames = articleArgs.tagNames.split(/\s+|,/).filter(tag => {return tag});
            initializeTags(tagNames, artile.id);

            article.prepareInsert();
            res.redirect('/');
        });

    },

    details: (req, res) => {
        let id = req.params.id;

        Article.findById(id).populate('author')
            .populate({path: 'comments', model: 'Comment', populate: {path: 'author', model: 'User'}}).then(article => {
            if (!req.user) {
                res.render('article/details', {article: article, isUserAuthorized: false});
                return;
            }

            req.user.isInRole('Admin').then(isAdmin => {
                let isUserAuthorized = isAdmin || req.user.isAuthor(article);
                res.render('article/details', {article: article, isUserAuthorized: isUserAuthorized});
            });
//            res.render('article/details', article)
        });
    },

    editGet: (req, res) => {
        let id = req.params.id;

        if (!req.isAuthenticated()) {
            let returnUrl = `/article/edit/${id}`;
            req.session.returnUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        Article.findById(id).populate('tags').then(article => {
            req.user.isInRole('Admin').then(isAdmin => {
                if (!isAdmin && !req.user.isAuthor(article)) {
                    res.redirect('/');
                    return;
                }
                article.tagNames = article.tags.map(tag => {return tag.name});
                res.render('article/edit', article);
            });
        });
    },

    editPost: (req, res) => {
        let id = req.params.id;
        let articleArgs = req.body;
        let errorMsg = '';

        if (!articleArgs.title) {
            errorMsg = 'Article title cannot be empty!';
        }
        else if (!articleArgs.content) {
            errorMsg = 'Article content cannot be empty!';
        }

        if (errorMsg) {
            res.render('article/edit', {error: errorMsg});
        }
        else {
            Article.update({_id: id}, {$set: {title: articleArgs.title, content: articleArgs.content}})
                .then(updateStatus => {
                    res.redirect(`/article/details/${id}`);
                })
        }

        Article.findById(id).populate('category tags').then(article => {
            if (article.category.id !==articleArgs.category){
                article.category.articles.remove(article.id);
                article.category.save();
            }

            article.category = articleArgs.category;
            article.title = articleArgs.title;
            article.content = articleArgs.content;

            let newTagNames = articleArgs.tags.split(/\s+|,/).filter(tag => {return tag});

            let oldTags = article.tags.filter(tag => {
                return newTagNames.indexOf(tag.name) === -1;
            });

            for (let tag of oldTags){
                tag.deleteArticle(article.id);
                article.deleteTag(tag.id);
            }

            initializeTags(newTagNames, article.id);
        })
    },

    deleteGet: (req, res) => {
        let id = req.params.id;

        if (!req.isAuthenticated()) {
            let returnUrl = `/article/delete/${id}`;
            req.session.returnUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        Article.findById(id).populate('category tags').then(article => {
            req.user.isInRole('Admin').then(isAdmin => {
                if (!isAdmin && !req.user.isAuthor(article)) {
                    res.redirect('/');
                    return;
                }

                article.tagNames = article.tags.map(tag => {return tag.name});
                res.render('article/delete', article)
            });
        });
    },

    deletePost: (req, res) => {
        let id = req.params.id;
        Article.findOneAndRemove({_id: id}).populate('author')
            .then(article => {
                let author = article.author;
                let index = author.articles.indexOf(article.id);

                if (index < 0) {
                    let errorMsg = 'Article was not found for that author!';
                    res.render('article/delete', {error: errorMsg})
                }
                else {
                    let count = 1;
                    author.articles.splice(index, count);
                    author.save().then((user) => {
                        res.redirect('/');
                    });
                }
            })
    },


};

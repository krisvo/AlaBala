/**
 * Created by 450 G4 on 3/27/2017.
 */
const userController = require('./../controllers/user');
const homeController = require('./../controllers/home');
const articleController = require('./../controllers/article');
const commentController = require('./../controllers/comment');

module.exports = (app) => {
    app.get('/', homeController.index);

    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);

    app.get('/user/details',userController.detailsGet);
    app.post('/user/details',userController.detailsPost);

    app.get('/user/logout', userController.logout);



    app.get('/article/create', articleController.createGet);
    app.post('/article/create', articleController.createPost);

    app.get ('/article/details/:id', articleController.details);

    app.get ('/article/edit/:id', articleController.editGet);
    app.post ('/article/edit/:id', articleController.editPost);

    app.get ('/article/delete/:id', articleController.deleteGet);
    app.post('/article/delete/:id', articleController.deletePost);

    app.post('/article/comment/:id', commentController.commentPost);

};

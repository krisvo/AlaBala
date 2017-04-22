/**
 * Created by 450 G4 on 3/28/2017.
 */
const mongoose = require('mongoose');
const Article = mongoose.model('Article');

module.exports = {
    index: (req, res) => {
        Article.find({}).limit(6).populate('author').then(articles => {
            res.render('home/index',{articles:articles});
        })
       /* res.render('home/index');*/
    }
};

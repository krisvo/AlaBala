let Tag = require('mongoose').model('Tag');

module.exports = {
    createGet: (req,res)=> {
        res.render('article/create');
    },
    createPost:(req,res) => {
        let tagArgs = req.body;

        if(!Tag) {
            Tag.create(tagArgs).then(Tag => {
                req.article.tag.push(Tag.id);
                req.article.save(err => {
                    if (err) {
                        res.redirect('/', {error: err.message});
                    }
                    else {
                        res.redirect('/');
                    }
                });
            })
        }
    }
};
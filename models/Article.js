/**
 * Created by 450 G4 on 3/28/2017.
 */
const mongoose = require('mongoose');
let articleSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    comments: [{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
    date: {type:Date, default: Date.now()},
    imagePath: {type: String},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    date: {type: Date, default: Date.now()}
});

articleSchema.method({
    prepareInsert: function() {
        let User = mongoose.model('User');
        User.findById(this.author).then(user=> {
            user.articles.push(this.id);
            user.save();
        });

        let Category = mongoose.model('Category');
        Category.findById(this.category).then(category => {
            if(category){
                category.articles.push(this.id);
                category.save();
            }
        });

        let Tag = mongoose.model('Tag');
        for (let tagId of this.tags) {
            Tag.findById(tagId).then(tag => {
                if (tag) {
                    tag.articles.push(this.id);
                    tag.save();
                }
            });
        }
    },

    prepareDelete: function () {
        let User = mongoose.model('User');
        User.findById(this.author).then(user=> {
            user.articles.push(this.id);
            user.save();
        });

        let Category = mongoose.model('Category');
        Category.findById(this.category).then(category => {
            if(category){
                category.articles.push(this.id);
                category.save();
            }
        });

        let Tag = mongoose.model('Tag');
        for (let tagId of this.tags) {
            Tag.findById(tagId).then(tag => {
                if (tag) {
                    tag.articles.remove(this.id);
                    tag.save();
                }
            });
        }
    },
    
    deleteTag: function (tagId) {
        this.tags.remove(tagId);
        this.save();
    }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;

/**
 * Created by 450 G4 on 3/28/2017.
 */
const mongoose = require('mongoose');
let articleSchema = mongoose.Schema({
    title: {type:String, required: true},
    content: {type:String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    comments: [{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
    date: {type:Date, default: Date.now()}
});

const Article = mongoose.model ('Article',articleSchema);

module.exports = Article;

const Article = require('mongoose').model('Article');
const Comment = require('mongoose').model('Comment');
const User = require('mongoose').model('User');


module.exports= {


    profileGet: (req, res) => {
        res.render('user/profile');
    },

    profilePost: (req, res) => {
        let profileArgs = req.body;

        if (!req.isAuthenticated()) {
            errorMsg = 'You should be logged in to update your profile!';
        }


        else {
            let profilePicture = req.files.image;

            if (profilePicture) {
                let filename = profilePicture.name;
                profilePicture.mv(`/images/${filename}`, err => {
                    if (err) {
                        console.log(err.message);
                    }
                });
                profileArgs.profilePicture = `/images/${profilePicture.name}`;
                profileArgs.person = req.user.fullName;

                let profileObject = {
                    person: profileArgs.person,
                    profilePicture: profileArgs.profilePicture,
                    age: profileArgs.age,
                    town: profileArgs.town,
                    about: profileArgs.about
                };

                Profile.create(profileObject).then(profile => {
                    req.profile.push(profile.id);
                    req.profile.save(err => {
                        if (err) {
                            res.redirect('/', {error: err.message});
                        }
                        else {
                            res.redirect('user/details');
                        }
                    });

                    res.redirect('user/details')
                })
            }
        }
    },

    detailsGet: (req, res) => {
        res.render('user/details');
    },

    detailsPost: (req, res) => {
        res.render('user/details');
    }
};
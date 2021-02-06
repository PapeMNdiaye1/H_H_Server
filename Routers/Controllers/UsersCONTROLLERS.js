const Users = require("../../Models/UserModel");
const bcrypt = require('bcrypt');
// ###############################################################################
exports.signUp = async (req, res) => {
    bcrypt.hash(req.body.Password, 10)
        .then(async (hash) => {
            const user = await new Users({
                userName: req.body.Name,
                email: req.body.Email,
                password: hash,
                profilePicture: req.body.ProfilePicture,
            });
            user
                .save()
                .then((result) => {
                    res.status(201).json({ UserSignUp: true });
                })
                .catch((error) => {
                    console.error(error);
                    res.status(400).json({ UserSignUp: false });
                });
        });
};
// ###############################################################################
exports.login = async (req, res) => {
    Users.findOne({ email: req.body.UserEmail })
        .then((user) => {
            bcrypt.compare(req.body.Password, user.password)
                .then((valid) => {
                    if (valid) {
                        res.status(201).json({ UserSignUp: true });
                    } else {
                        res.status(404).json({ UserSignUp: 'wrong-password' });
                    }
                });
        })
        .catch((error) => {
            res.status(404).json({ UserSignUp: 'wrong-email' });
        });
};
// ###############################################################################
exports.getUserInfos = (req, res) => {
    Users.findOne({ email: req.params.UserEmail })
        // .select("_id username email profilePicture")
        .then((result) => {
            res.status(201).json({ User: result });
        })
        .catch((error) => {
            res.status(404).json({ User: false });
        });
};

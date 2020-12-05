const bcrypt = require('bcryptjs');
const passport = require('passport');
const userModel = require('../models/userModel');

const registerUser = async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 10);

    await userModel.getSingleUserByEmail(req.body.userEmail)
        .then(async (user) => {
            if (user) {
                res.status(400).json({ error: 'Duplicate_User', message: 'User already exists, please try a different account' });
            } else {
                await userModel.createUser(hashed, req.body.userEmail, req.body.firstName, req.body.lastName)
                    .then((data) => res.status(201)
                        .json({
                            message: "User Registered",
                            user: {
                                id: data.user.id
                            }
                        }))
            }
        })
        .catch((err) => {
            res.status(500).json({ error: 'Server_error', message: 'There was an exception on the server, please try again later.' })
            throw err;
        });
}

const loginUser = (req, res, next) => {

    passport.authenticate("local", (error, user) => {
        if (error) throw error;
        if (!user) res.status(404).json({ error: "INVALID_USER", message: "Invalid user ID or password" })
        else {
            req.login(user, (error) => {
                if (error) throw error;
                res.status(200).send({ message: "success", user: user });
            })
        }

    })(req, res, next);
}

const getUserData = async (req, res) => {
    await userModel.getSingleUsersData(req.body.id)
        .then((userData) => {
            if (userData) return res.status(200).send(userData)
            return res.status(404).json({ error: "INVALID_USER_ID", message: "User ID could not be matched to any active users" });
        })
}

module.exports = { registerUser, loginUser, getUserData };
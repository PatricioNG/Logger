//Creating one instance of passport
const prisma = require('./prismaClient');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    //Defining the local strategy
    passport.use(
        new localStrategy(async (username, password, done) => {
            //Find user
            await prisma.user_Accounts.findUnique({ where: { email: username }, include: { user: { select: { id: true } } } })
                .then((user) => {
                    //If there isn't a user, end here
                    if (!user) return done(null, false);
                    //Compare the hash
                    bcrypt.compare(password, user.hash, (error, result) => {
                        //Error
                        if (error) throw error;
                        //Positive result
                        if (result) {
                            //End and return user
                            return done(null, { id: user.id, user: user.user.id });
                        }
                        //Negative result
                        return done(null, false);
                    })
                }).catch((err) => { throw err });
        }));

    passport.serializeUser((user, next) => {
        next(null, user.id);
    });

    passport.deserializeUser(async (id, next) => {
        await prisma.user_Accounts.findUnique({ where: { id: id }, include: { user: { select: { id: true } } } })
            .then((user, error) => {
                next(error, user.user.id); //Only send back user ID
            })
    })
}
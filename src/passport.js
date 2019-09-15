const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const User = require('./models/user')

passport.use(new BearerStrategy(
	async function(token, done) {
		try {
			const user = await User.findOne({ where: {token} })
			if (!user) {
				return done(null, false) 
			}
			return done(null, user);
		} catch (error) {
			return done(error)
		}
	}
));

module.exports = passport
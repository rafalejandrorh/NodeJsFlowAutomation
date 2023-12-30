const boom = require('@hapi/boom');
const passport = require('passport');
const { Strategy:Local } = require('passport-local');
const { Strategy:JWT, ExtractJwt } = require('passport-jwt');

const config = require('../../../../config/');
const AuthService = require('../../services/auth.service');
const UserService = require('../../services/user.service');
const authService = new AuthService();
const userService = new UserService();

const LocalStrategy = new Local({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            let data = {};
            const user = await authService.login(email, password);
            done(null, user);
        } catch (error) {
            //boom.unauthorized('Unauthorized');
            done(error, false);
        }
    }
);

const JwtStrategy = new JWT({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secretKeyJwt
    }, 
    async (payload, done) => {
        try {
            user = await userService.findOne(payload.sub);
            if (!user) {
                error = 'Unauthorized';
                return done(error, false);
            }
            return done(null, payload);
        } catch (error) {
            //boom.unauthorized('Unauthorized');
            done(error, false);
        }

    }
);

passport.use(LocalStrategy);
passport.use(JwtStrategy);
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("../constants/env");
 const userService = require("../services/identification");
const errorCreater = require("../utils/createError");
 const ERROR_TYPES = require("../constants/ERROR_CODES");

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

const jwtStrategy = new Strategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor,
      ]),
    },
    async (payload, done) => {
      try {
        const _id = payload.sub
        const user = await userService.getClientByOptions({_id});
        if (user) {
          return done(null, user);
        } else {
          const err = errorCreater(ERROR_TYPES.UNAUTHORIZED, {
            message: 'Unauthorized',
          });
          return done(err, null);
        }
      } catch (err) {
        return done(err, null);
      }
    },
  );

passport.use(jwtStrategy);
module.exports = passport
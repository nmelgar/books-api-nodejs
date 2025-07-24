import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../models/usersOauth";

const clientID = process.env.GOOGLE_CLIENT_ID || "";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

if (!clientID || !clientSecret) {
  throw new Error(
    "Google OAuth credentials are not set in environment variables."
  );
}

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        const email = profile.emails && profile.emails[0]?.value;

        // try to find by email if googleId not found and email exists
        if (!user && email) {
          user = await User.findOne({ email });
        }

        // only create user if not found and email exists
        if (!user && email) {
          user = await User.create({
            name: profile.displayName,
            email: email,
            googleId: profile.id,
          });
        }

        // if user is still not found (no email), do not create user
        if (!user) {
          return done(
            new Error("No email found in Google profile. Cannot create user."),
            undefined
          );
        }

        return done(null, user);
      } catch (err) {
        return done(err, undefined);
      }
    }
  )
);

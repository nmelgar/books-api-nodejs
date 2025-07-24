import express from "express";
import {
  login,
  googleAuth,
  logout,
  googleRedirect,
  renderProfile,
  ensureAuthenticated,
} from "../controllers/loginController";

const router = express.Router();

// login route
router.get("/login", login);

// logout route
router.get("/logout", logout);

// auth with google
router.get("/google", googleAuth);

// callback route for google to redirect
router.get("/google/redirect", googleRedirect, (req, res) =>
  res.redirect("/auth/profile")
);

router.get("/profile", ensureAuthenticated, renderProfile);

export default router;

import express, { Router, Request, Response, NextFunction } from "express";
import passport from "passport";

// login route
export const login = (req: Request, res: Response) => {
  res.render("login", { title: "Login | Budget Tracker API" });
};

// logout route
export const logout = (req: Request, res: Response) => {
  // handle with passport
  res.send("Logging out");
};

// auth with google
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// google redirect
export const googleRedirect = passport.authenticate("google", {
  // handle with passport
  failureRedirect: "/login",
});

export const renderProfile = (req: Request, res: Response) => {
  // req.user will be set by Passport
  res.render("profile", { user: req.user });
};

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

import express, { Router, Request, Response } from "express";

// home route
export const getHome = (req: Request, res: Response) => {
  res.render("home", { title: "Budget Tracker API" });
};

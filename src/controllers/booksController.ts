import express, { Router, Request, Response } from "express";

// home route
export const getHome = (req: Request, res: Response) => {
  try {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is the home page");
  } catch (error) {
    res.status(500).json({ message: "Home failed to load." });
  }
};

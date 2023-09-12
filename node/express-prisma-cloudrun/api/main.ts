// import express from "express";
import app from "./config/express";

// const app = exprese();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running at Port ${port}...`);
});

import express from "express";
import questions from "./questions.json";
import * as Mailer from "./mailer";
const r = express.Router();

r.post("/answer", (req,res)=>{
  const {id,choice}=req.body;
  const q=questions.find(q=>q.id===id);
  if(!q) return res.status(404).end();
  const correct=q.choices.find(c=>c.id===choice)?.correct||false;
  const next=questions[questions.findIndex(x=>x.id===id)+1]?.id||null;
  res.json({correct,next});
});

r.post("/email", async (req,res)=>{
  await Mailer.sendResults(req.body);
  res.status(204).end();
});

export default r;

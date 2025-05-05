import nodemailer from "nodemailer";
const {SMTP_HOST,SMTP_PORT,SMTP_USER,SMTP_PASS,HR_EMAIL}=process.env;
const tx=nodemailer.createTransport({
  host:SMTP_HOST, port:+SMTP_PORT, secure:+SMTP_PORT===465,
  auth:{user:SMTP_USER,pass:SMTP_PASS}
});
export async function sendResults({name,email,score,timeline}){
  await tx.sendMail({
    from:`"SRE‑Quiz"<${SMTP_USER}>`,
    to:HR_EMAIL,
    subject:`[SRE quiz] ${name} scored ${score}`,
    text:`${name} (${email}) timeline:\n${timeline}`
  });
}

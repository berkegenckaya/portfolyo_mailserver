import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5500", credentials: false }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  Port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  },
});

app.post("/", (req, res) => {
  console.log(req.body);
  const mailinfo = req.body;
  var mailOptions = {
    from: process.env.MAIL,
    to: "inthecasual@gmail.com",
    subject: `${mailinfo.email} - ${mailinfo.name} `,
    text: mailinfo.message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});
app.get("/", (req, res) => {
  res.send("selam");
});
app.listen(process.env.PORT || 5000, () => {});

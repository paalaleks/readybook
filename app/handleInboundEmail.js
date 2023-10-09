// pages/api/inbound.js
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer();

export default async function handler(req, res) {
  upload.any()(req, res, async function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    const email = {
      to: req.body.to,
      from: req.body.from,
      subject: req.body.subject,
      text: req.body.text,
    };

    // TODO: Save email data to Firebase or handle it according to your needs

    console.log(email);

    res.status(200).send("Email received");
  });
}

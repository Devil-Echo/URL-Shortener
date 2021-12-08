const express = require("express");
const router = express.Router();

const config = require("config");
const validUrl = require("valid-url");
const shortid = require("shortid");

const Url = require("../model/Url");

// @route  POST /api/url/shorten
// @desc   Create short url

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  // check base url i.e. url from which request is made
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url!!");
  }

  // create short url code
  const urlCode = shortid.generate();

  // check long url (to be shortened)
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl: longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error!!");
    }
  } else {
    res.status(401).json("Invalid long url !!");
  }
});

module.exports = router;

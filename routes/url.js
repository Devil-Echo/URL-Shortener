const express = require("express");
const router = express.Router();

const config = require("config");
const validUrl = require("valid-url");
const shortid = require("shortid");

const Url = require("../model/Url");

// @route  POST /api/url/shorten
// @desc   Create short url

router.post("/shorten", (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }
});

module.exports = router;

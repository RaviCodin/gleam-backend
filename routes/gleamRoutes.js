const express = require("express");
const {  createInfo } = require("../controlers/gleamControler");

const router = express.Router();

router.route("/create").post(createInfo)



module.exports = router;

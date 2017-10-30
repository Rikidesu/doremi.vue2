/*
* @Author: Rikiponzu*
* @Date:   2017-10-04 20:27:33
* @Last Modified by:   Rikiponzu*
* @Last Modified time: 2017-10-04 20:56:05
*/
const express = require("express")
const router = express()
const { createWebAPIRequest } = require("../util/util")

router.get("/", (req, res) => {


    // console.log(req.query);
    // res.send(JSON.stringify(req));
    res.redirect(req.query.url)

})

module.exports = router
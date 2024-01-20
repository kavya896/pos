const qrcode = require("qrcode")
const express = require("express")
const router = express.Router()


router.get("/", async (req, res) => {
    try {
        const url = "https://www.w3schools.com/"
        qrcode.toDataURL(url, (err, qrCodeurl) => {
            res.send(qrCodeurl)
        })
    } catch (err) {
        console.log(err)
    }
})


module.exports = router

const express = require("express")
const { dashboard, test, searchedUser } = require("../controllers/dashboard")

const router = express()

router.post('/', dashboard)
router.post('/test', test)
router.post('/search/:id', searchedUser)

module.exports = router
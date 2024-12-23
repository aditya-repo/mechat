const express = require("express")
const { dashboard, test, searchedUser, pairUser } = require("../controllers/dashboard")

const router = express()

router.post('/', dashboard)
router.post('/pair')
router.post('/test', test)
router.post('/search/:email', searchedUser)
router.post('/pairing', pairUser)

module.exports = router
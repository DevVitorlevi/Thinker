const router = require('express').Router()
const UserController = require('../controllers/UserController')
const VerifyToken = require('../helpers/verify-token')
const {ImageUpload} = require("../helpers/image-up")

router.post('/register', UserController.register)
router.post("/login", UserController.login);
router.get('/checkuser',UserController.checkUser)
router.get("/:id", UserController.getUser);
router.patch('/edit/:id',VerifyToken,ImageUpload.single("image"),UserController.editUser)
module.exports = router
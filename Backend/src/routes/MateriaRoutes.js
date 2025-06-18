const router = require('express').Router()
const MateriaController = require('../controllers/MateriasControllers')

router.get('/', MateriaController.getAll)

module.exports = router
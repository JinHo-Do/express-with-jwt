const router = require('express').Router();
const { getHome } = require('../controllers/homeController');

router.get('/', getHome);

module.exports = router;

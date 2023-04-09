const express = require('express')
const router = express.Router();
const { getAllList, addNew, update } = require('../services/CategoryService');

router.get('/getalllist', getAllList);
router.post('/addnew', addNew);
router.put('/update', update);

module.exports = router;
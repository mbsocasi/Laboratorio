const express = require('express');
const router = express.Router();
const examenController = require('../controllers/examenController');

router.get('/', examenController.getExamenes);
router.post('/', examenController.createExamen);
router.put('/:id', examenController.updateExamen);
router.delete('/:id', examenController.deleteExamen);

module.exports = router;

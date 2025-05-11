const express = require('express');
const router = express.Router();
const actividadController = require('../controllers/actividadController');

router.get('/', actividadController.getActivities);
router.post('/', actividadController.createActivity);
router.put('/:id', actividadController.updateActivity);
router.delete('/:id', actividadController.deleteActivity);

module.exports = router;

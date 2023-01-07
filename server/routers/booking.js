const express = require('express');
const router = express.Router();

const { createSlot, getSlotByEventId } = require('../controllers/bookingControl');

router.route('/create').post(createSlot);
router.route('/:eventId').get(getSlotByEventId);

module.exports = router;
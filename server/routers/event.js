const express = require('express');
const router = express.Router();

const { createEvent, getEventByUserId, getAllEvents, getEventById, deleteEventById, updateEventById } = require('../controllers/eventControl');

router.route('/create').post(createEvent);
router.route('/:id').get(getEventByUserId);
router.route('/').get(getAllEvents);
router.route('/event/:id&:userId').get(getEventById).delete(deleteEventById).put(updateEventById);

module.exports = router;
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createTicket,
    getTickets,
    getTicket,
    updateTicket,
    deleteTicket
} = require('../controllers/ticketController');


// Tickets
router.post('/', protect, createTicket);
router.get('/', protect, getTickets);
router.get('/:id', protect, getTicket);
router.delete('/:id', protect, deleteTicket)
router.put('/:id', protect, updateTicket)

//Notes
const noteRoutes = require('./noteRoutes');
router.use('/:ticketId/notes', noteRoutes);

module.exports = router;
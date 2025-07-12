const asyncHandler = require('express-async-handler')

const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')
const Note = require('../models/noteModel')

// @desc    Create a note
// @route   POST /api/tickets/:ticketId/notes
// @acess   Private
const createNote = asyncHandler(async (req, res) =>{

    //Get user using the ID in the JWT
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('Usuário não encontrado')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuário não autorizado a adicionar notas neste ticket')
    }

    const note = await Note.create({
        content: req.body.content,
        user: req.user.id,
        ticket: req.params.ticketId,
        isStaff: req.body.isStaff || false,
    })

    res.status(201).json(note)
})

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @acess   Private
const getNotes = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('Usuário não encontrado')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuário não autorizado a visualizar notas deste ticket')
    }


    const notes = await Note.find({ ticket: req.params.ticketId})

    res.status(200).json(notes)
})

module.exports = {
    createNote,
    getNotes
}
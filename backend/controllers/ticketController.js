const asyncHandler = require('express-async-handler')

const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')

// @desc    Create a new ticket
// @route   POST /api/tickets
// @acess   Private
const createTicket = asyncHandler(async (req, res) => {
    const { title, description, departament, priority, status } = req.body

    if( !title || !description || !departament || !priority){
        res.status(400)
        throw new Error('Por favor, preencha todos os campos!')
    }

    // Get user using the ID in the JWT
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('Usuário não encontrado')
    }

    const ticket = await Ticket.create({
        title,
        description,
        departament,
        priority,
        status: 'new',
        user: req.user.id
    })

    res.status(201).json(ticket)
})

// @desc    Get user tickets
// @route   GET /api/tickets
// @acess   Private
const getTickets = asyncHandler(async (req, res) =>{

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('Usuário não encontrado')
    }

    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})

// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @acess   Private
const getTicket = asyncHandler(async (req, res) =>{

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('Usuário não encontrado')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket não encontrado')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuário não autorizado')
    }

    res.status(200).json(ticket)
})

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await ticket.deleteOne()

  res.status(200).json({ success: true })
})

// @desc    Update a ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) =>{

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('Usuário não encontrado')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket não encontrado')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuário não autorizado')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(updatedTicket)
})

module.exports = {
    createTicket,
    getTickets,
    getTicket,
    deleteTicket,
    updateTicket
}
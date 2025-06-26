const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: [true, 'Por favor, adicione um título']
        },
        description: {
            type: String,
            required: [true, 'Por favor, adicione uma descrição']
        },
        departament: {
            type: String,
            required: [true, 'Por favor, selecione um departamento'],
            enum: ['dho', 'financeiro', 'comercial', 'sucesso']
        },
        priority: {
            type: String,
            required: [true, 'Por favor, selecione uma prioridade'],
            enum: ['low', 'medium', 'high', 'urgent'],
            default: 'low',
        },
        status: {
            type: String,
            enum: ['new', 'open', 'closed'],
            default: 'new'
        },
    },
        {
            timestamps: true
        }
)

module.exports = mongoose.model('Ticket', ticketSchema);
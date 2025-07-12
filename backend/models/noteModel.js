const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ticket'
    },
    content: {
        type: String,
        required: [true, 'Por favor, adicione um conteúdo para a nota']
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Note', noteSchema);
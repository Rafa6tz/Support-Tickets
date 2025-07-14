import axios from 'axios';

const API_URL = '/api/tickets/';

//Get notes for a ticket
const getNotes = async(ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + ticketId + '/notes', config)

    return response.data
}

const createNote = async(noteData, ticketId, token) => {
    const config = {
        Authorization: `Bearer ${token}`
    }

    const response = await axios.post(API_URL + ticketId + '/notes', {content: noteData}, config)

    return response.data
}

const noteService = {
    getNotes,
    createNote
}
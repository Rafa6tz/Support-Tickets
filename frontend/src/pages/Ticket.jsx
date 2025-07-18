import BackButtom from '@/components/BackButtom'
import Spinner from '@/components/Spinner'
import TicketNote from '@/components/TicketNote'
import { Button } from '@/components/ui/button'
import { createNote, getNotes } from '@/features/note/noteSlice'
import { getTicket } from '@/features/ticket/ticketSlice'
import { useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Ticket() {
    const { ticket, isLoading, isError, message } = useSelector((state) => state.tickets)
    const { notes, isLoading: noteIsLoading } = useSelector((state) => state.note)
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [noteText, setNoteText] = useState('')

    const params = useParams()
    const {ticketId} = useParams()

    useEffect(() =>{
        if(isError){
            toast.error(message)
        }

        dispatch(getNotes(ticketId))
        dispatch(getTicket(ticketId))
    }, [dispatch, isError, message, ticketId])

    const handleModal = () =>{
        setModal(!modal)
        setNoteText('')
    }

    const handleNoteSubmit = (e) =>{
        e.preventDefault()
        dispatch(createNote({noteText, ticketId}))
        handleModal()
    }

    if (isLoading || !ticket || noteIsLoading) {
        return <Spinner/>
    }

    if (isError) {
    return <h3>Something Went Wrong</h3>
  }

  return (
    <section className="flex flex-col gap-4 w-full text-wrap text-center p-6 md:pt-10">
        {modal && (
            <>
            <div className='fixed inset-0 bg-input opacity-80 flex items-center justify-center z-50'/>
            <div className='fixed inset-0 flex items-center justify-center z-60'>
                <div className='bg-white p-6 rounded-md shadow-lg w-11/12 md:w-1/3 relative'>
                <Button onClick={handleModal} className='bg-card-foreground text-white cursor-pointer border-accent border-1 absolute right-0 top-0 m-2 hover:bg-destructive'>X</Button>
                    <h2 className='text-xl font-bold mb-4'>Adicionar Comentário</h2>
                    <form onSubmit={handleNoteSubmit}>
                        <textarea value={noteText}
                            onChange={(e) => setNoteText(e.target.value)} 
                            className='w-full p-2 border border-border rounded-md mb-4'
                            placeholder='Escreva seu comentário aqui...'
                        ></textarea>
                        <Button type='submit' className='bg-card-foreground text-white cursor-pointer border-accent border-1'>Enviar</Button>
                    </form>
                </div>
            </div>
            </>
        )}
        <div className='flex gap-2 md:justify-center items-center text-xs md:text-sm w-full'>
            <div className='w-1/2 flex justify-start items-start'>
        <BackButtom url='/tickets'/>
            </div>
        </div>
        <div className='h-full flex flex-col items-center justify-center'>
        <div className='flex gap-2 text-xs md:text-sm justify-between w-9/10 md:w-5/10'>
            <h4 className='text-wrap'>Ticket ID: {ticket._id}</h4>
            <span className={
        ticket.status === 'new' ? 'bg-green-400 text-white font-bold rounded-2xl p-1 min-w-24 max-h-6 md:max-h-8' :
        ticket.status === 'open' ? 'bg-yellow-200 text-white font-bold rounded-2xl p-1 min-w-24 max-h-6 md:max-h-8' :
        'bg-red-400 text-white font-bold rounded-2xl p-1 min-w-24 max-h-6 md:max-h-8' 
       }>{ticket.status}</span>
        </div>
        <div className='py-6 flex flex-col gap-2 w-full md:w-5/10 h-full'>
        <div className='flex items-center gap-2'>
            <p>Título:</p>
            <h2 className='text-xl font-bold'>{ticket.title}</h2>
        </div>
            <div className='text-sm bg-input border-1 border-border p-4 md:w-full min-h-26 flex flex-col gap-2 justify-center items-center text-wrap rounded-md mt-4'>
            <p className='font-bold'>Descrição do ticket:</p>
            <p >{ticket.description}</p>
            </div>
        </div>
        <div className='flex justify-start w-full md:w-5/10 p-2 text-xs'>
            <p>Data de criação: {new Date(ticket.createdAt).toLocaleString('pt-BR')}</p>
        </div>
        </div>
        <div className='flex flex-col justify-center items-center w-full gap-4'>
            <div className='border-b-1 w-1/2 border-accent'/>
        <div className='md:w-1/2'><Button onClick={handleModal} className='bg-card-foreground text-white cursor-pointer border-accent border-1'><FaPlusCircle/> Adicionar Comentário</Button></div>
        
       {notes.map((note) => (
        <TicketNote key={note._id} note={note} />
       ))}
        </div>
    </section>
  )
}

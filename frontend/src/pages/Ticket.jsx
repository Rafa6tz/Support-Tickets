import BackButtom from '@/components/BackButtom'
import Spinner from '@/components/Spinner'
import { getTicket } from '@/features/ticket/ticketSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Ticket() {
    const { ticket, isLoading, isError, message } = useSelector((state) => state.tickets)
    const dispatch = useDispatch()

    const params = useParams()
    const navigate = useNavigate()
    const {ticketId} = useParams()

    useEffect(() =>{
        if(isError){
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
    }, [dispatch, isError, message, ticketId])

    if (isLoading) {
        return <Spinner/>
    }

  return (
    <section className="flex flex-col gap-4 w-full text-wrap text-center p-6 md:pt-10">
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
            <div className='text-sm bg-gray-100 border-1 border-gray-300 p-4 w-full min-h-26 flex flex-col gap-2 justify-center items-center text-wrap rounded-md mt-4'>
            <p className='font-bold'>Descrição do ticket:</p>
            <p >{ticket.description}</p>
            </div>
        </div>
        <div className='flex justify-start w-full md:w-5/10 p-2 text-xs'>
            <p>Data de criação: {new Date(ticket.createdAt).toLocaleString('pt-BR')}</p>
        </div>
        </div>
    </section>
  )
}

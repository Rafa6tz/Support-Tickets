import BackButtom from '@/components/BackButtom'
import TicketItem from '@/components/TicketItem'
import { reset } from '@/features/ticket/ticketSlice'
import { getTickets } from '@/features/ticket/ticketSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function TicketList() {
    const {tickets, isError, isSuccess, isLoading, message } = useSelector((state) => state.tickets)
    const dispatch = useDispatch()

    useEffect(() =>{
        return () => {
        if(isSuccess){
            dispatch(reset())
        }
        dispatch(getTickets)
        }  
    }, [dispatch, isSuccess])

    useEffect(()=>{
        dispatch(getTickets())
    }, [dispatch])

  return (
    <section className="flex flex-col items-center justify-center gap-4  w-full text-wrap text-center p-6">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold">Lista de Tickets</h2>
          <p className="text-sidebar-foreground">Veja todos os seus tickets e o status de cada um.</p>
        
        </div>
        <div className='flex gap-2 md:justify-center items-center text-xs md:text-sm w-full mb-6'>
            <div className='w-1/2 flex justify-start items-start'>
                <BackButtom url='/'/>
            </div>
        </div>
        <div>
            <div className='grid grid-cols-2 md:grid-cols-4 font-bold items-center justify-center'>
                <div>Data</div>
                <div>Título</div>
                <div className='hidden md:block'>Status</div>
                <div></div>
            </div>
            {tickets.map((ticket) =>(
                <TicketItem key={ticket._id} ticket={ticket}/>
            ))}
        </div>

    </section>
  )
}

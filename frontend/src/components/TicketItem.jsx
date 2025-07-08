import React from 'react'

export default function TicketItem({ticket}) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 p-4 text-sm bg-accent m-4 items-center justify-center rounded-md'>
       <div className='text-xs text-wrap'>{new Date(ticket.createdAt).toLocaleString('pt-BR')}</div>
       <div>{ticket.title}</div>
       <div className={
        ticket.status === 'new' ? 'bg-green-400 text-white font-bold rounded-2xl p-1' :
        ticket.status === 'open' ? 'bg-yellow-200 text-white font-bold rounded-2xl p-1' :
        'bg-red-400 text-white font-bold rounded-2xl p-1' 
       }>{ticket.status}</div>
       <div>Ver mais</div>
    </div>
  )
}

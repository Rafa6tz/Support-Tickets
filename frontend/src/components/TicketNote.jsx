import React from 'react'
import { useSelector } from 'react-redux'

export default function TicketNote({note}) {
    const { user } = useSelector((state) => state.auth)
  return (
    <div className='bg-white border-border border-1 rounded-md md:w-1/2 text-base p-4 flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
            <p>De: {user.name}</p>
            <p className='text-xs'>Data: {new Date(note.createdAt).toLocaleString('pt-br')}</p>
        </div>
        <div className='flex flex-col gap-2 justify-start items-start'>
            <p>{note.content}</p>
        </div>
        
    </div>
  )
}

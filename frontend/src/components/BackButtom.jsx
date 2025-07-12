import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { FaArrowCircleLeft } from 'react-icons/fa'

export default function BackButtom({url}) {
  return (
    <Link to={url} className='flex items-center justify-center gap-2'>
      <Button className='w-32 bg-white cursor-pointer border-1 border-accent'>
    <FaArrowCircleLeft/> Voltar
    </Button></Link>
  )
}

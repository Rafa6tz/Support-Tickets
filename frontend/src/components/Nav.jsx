import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className='flex items-center p-4 md:px-8 h-18 justify-between text-sm fixed w-full'>
        <div>
            <Link to='/' className='font-semibold'>Support Tickets</Link>
        </div>
        <ul className='flex justify-end gap-4 md:gap-8 w-2/5'>
            <li><Link to='login' className='flex justify-center items-center gap-1 md:gap-2'><FaSignInAlt/>Login</Link></li>
            <li><Link to='register' className='flex justify-center items-center gap-1 md:gap-2'><FaUser/>Register</Link></li>
        </ul>
    </nav>
  )
}

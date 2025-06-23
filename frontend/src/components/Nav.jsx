import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '@/features/auth/authSlice'

export default function Nav() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <nav className='flex items-center md:px-8 h-18 justify-center text-sm fixed w-full'>
        <div className='flex md:w-4/8 w-19/20 justify-between items-center border-b-1 border-accent p-4'>
        <div>
            <Link to='/' className='font-semibold'>Support Tickets</Link>
        </div>
        <ul className='flex justify-end gap-4 md:gap-8 w-2/5'>
        { user ? (
          <li>
            <a className='flex justify-center items-center gap-1 md:gap-2 cursor-pointer' onClick={onLogout}><FaSignOutAlt/> Logout</a>
          </li>
        ) : (<>
        <li><Link to='login' className='flex justify-center items-center gap-1 md:gap-2'><FaSignInAlt/>Login</Link></li> 
        <li><Link to='register' className='flex justify-center items-center gap-1 md:gap-2'><FaUser/>Register</Link></li>
        </>)}
            </ul>
          </div> 
    </nav>
  )
}

import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../features/auth/authSlice"
import Spinner from "@/components/Spinner"

export default function Login() {
  const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isError, isSuccess, message} = 
    useSelector(state => state.auth)

    useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

    const handleChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }

    const handleSubmit = (e) => {
      e.preventDefault()

      const userData = {
        email, password
      }

      dispatch(login(userData))
    }

    if(isLoading){
      return <Spinner/>
    }

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 lg:gap-8 w-full">
        <div className="flex items-center justify-center flex-col gap-2">
        <h2 className="flex lg:text-2xl font-bold gap-2 items-center"><FaSignInAlt/>Login</h2>
        <p className="text-sm lg:text-base">Acesse agora mesmo sua conta!</p>
        </div>
        
          <form onSubmit={handleSubmit} className="lg:w-2/6 md:w-3/6 flex flex-col gap-4 justify-center items-center border-1 border-border shadow-xl md:p-8 p-4 rounded-2xl text-sm">
            <div className="flex flex-col w-9/10">
              <Label>E-mail</Label>
              <Input className="w-full" type="email" id="email" name="email" value={email} onChange={handleChange} required/>
            </div>
            <div className="flex flex-col w-9/10">
              <Label>Senha</Label>
              <Input className="w-full" type="password" id="password" name="password" value={password} onChange={handleChange} required/>
            </div>
            <Button type="submit" className="w-9/10 font-semibold cursor-pointer m-2">Cadastrar</Button>
          </form>
      </section>
    </>
  )
}

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"

export default function Register() {
  const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2} = formData

    const handleChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }

    const handleSubmit = (e) => {
      e.preventDefault()

      if(password !== password2){
        toast.error('As senhas precisam ser iguais')
      }
    }

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 lg:gap-8 w-full">
        <div className="flex items-center justify-center flex-col gap-2">
        <h2 className="flex lg:text-2xl font-bold gap-2 items-center"><FaUser/>Register</h2>
        <p className="text-sm lg:text-base">Crie uma conta para acessar!</p>
        </div>
        
          <form onSubmit={handleSubmit} className="lg:w-2/6 md:w-3/6 flex flex-col gap-4 justify-center items-center border-1 border-border shadow-xl md:p-8 p-4 rounded-2xl text-sm">
            <div className="flex flex-col w-9/10">
              <Label>Nome</Label>
              <Input className="w-full" type="text" id="name" name="name" value={name} onChange={handleChange} required/>
            </div>
            <div className="flex flex-col w-9/10">
              <Label>E-mail</Label>
              <Input className="w-full" type="email" id="email" name="email" value={email} onChange={handleChange} required/>
            </div>
            <div className="flex flex-col w-9/10">
              <Label>Senha</Label>
              <Input className="w-full" type="password" id="password" name="password" value={password} onChange={handleChange} required/>
            </div>
            <div className="flex flex-col w-9/10">
              <Label>Confirme sua senha</Label>
              <Input className="w-full" type="password" id="password2" name="password2" value={password2} onChange={handleChange} required/>
            </div>
            <Button type="submit" className="w-9/10 font-semibold cursor-pointer m-2">Cadastrar</Button>
          </form>
      </section>
    </>
  )
}

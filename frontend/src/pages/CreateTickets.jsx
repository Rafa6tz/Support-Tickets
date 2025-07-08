import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectTrigger, SelectValue,SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createTicket, reset } from "@/features/ticket/ticketSlice"

export const CreateTickets = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    departament: '',
    priority: 'low',
    status: 'new'
  })

  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess){
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    console.log(formData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(createTicket(formData))
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4  w-full text-wrap text-center p-6">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold">Crie Um Novo Ticket</h2>
          <p className="text-sidebar-foreground">Preencha os campos abaixo com as informações necessárias.</p>
        </div>

    <form onSubmit={handleSubmit} className="lg:w-2/6 md:w-3/6 flex flex-col gap-4 justify-center items-center border-1 border-border shadow-xl md:p-6 p-4 rounded-2xl text-sm">
            <div className="flex flex-col w-9/10 gap-1">
              <Label>Título</Label>
              <Input className="w-full" type="text" id="title" name="title" value={formData.title} onChange={handleChange} required/>
            </div>
            <div className="flex flex-col w-9/10 gap-1">
              <Label>Descrição</Label>
              <Input className="w-full" type="text" id="description" name="description" value={formData.description} onChange={handleChange} required/>
            </div>
            <div className="flex flex-col w-9/10 gap-1">
              <Label>Setor</Label>
              <Select value={formData.departament || undefined} onValueChange={(value) => setFormData((prev) => ({ ...prev, departament: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder='Setor'/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dho">DHO</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="sucesso">Sucesso</SelectItem>
                </SelectContent>
              </Select>
              </div>
              <div className="flex flex-col w-9/10 gap-1">
              <Label>Prioridade</Label>
              <RadioGroup value={formData.priority} defaultValue="low" onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high">High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent">Urgent</Label>
                  </div>
              </RadioGroup>
              </div>
            <Button type="submit" className="w-9/10 font-semibold cursor-pointer m-2">Cadastrar</Button>
      </form>
         
    </section>
  )
}

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"

export const CreateTickets = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 lg:gap-16 w-full text-wrap text-center p-8">
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-xl md:text-2xl font-bold">Crie um novo Ticket</h2>
          <p className="text-sidebar-foreground">Preencha os campos abaixo com as informações necessárias.</p>
        </div>

         
    </section>
  )
}

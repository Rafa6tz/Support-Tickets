import { Button } from "@/components/ui/button";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <>
        <section className="flex flex-col items-center justify-center gap-4 lg:gap-16 w-full text-wrap text-center p-8">
          <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="font-semibold text-xl md:text-2xl">O que precisa de ajuda?</h2>
          <p className="text-sidebar-foreground">Selecione uma das opções abaixo para continuar.</p>
          </div>
          <div className="flex flex-col gap-6 w-4/5 md:w-2/5">
          <Button asChild className="bg-background hover:bg-accent shadow-sm">
          <Link to='/new-ticket'><FaQuestionCircle/>Crie um Novo Ticket</Link>
          </Button>
          <Button asChild>
          <Link to='/tickets'><FaTicketAlt/>Ver Meus Tickets</Link>
          </Button>
          </div>
        </section>
    </>
  )
}

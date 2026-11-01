import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      {/* Código 404 em destaque com transparência */}
      <h1 className="text-8xl font-extrabold text-slate-700 tracking-widest select-none">
        404
      </h1>

      {/* Título e Mensagem */}
      <div className="mt-4 flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-slate-100">
          Página não encontrada
        </h2>
        <p className="text-sm text-slate-400 max-w-md">
          A página que você está procurando não existe, foi removida ou o endereço digitado está incorreto.
        </p>
      </div>
      
      <Link
        to="/"
        className="mt-6 px-5 py-2.5 rounded-lg text-sm font-medium bg-orange-500 text-slate-900 hover:bg-orange-400 transition-all cursor-pointer shadow-lg shadow-orange-500/10 inline-flex items-center gap-2"
      >
        &larr; Voltar para as Tarefas
      </Link>
    </div>
  );
}
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="max-w-2xl flex flex-col gap-3">
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-100">
                Bem-vindo ao <span className="text-orange-500">GenFlow</span>
                </h1>
                <p className="text-base text-slate-400">
                Sua plataforma centralizada para gerenciamento de tarefas em Kanban e controle financeiro inteligente. Escolha por onde deseja começar abaixo:
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10 max-w-xl w-full">
                <Link
                to="/kanban"
                className="group bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-orange-500/50 rounded-xl p-6 text-left transition-all shadow-lg flex flex-col justify-between gap-4"
                >
                <div>
                    <h2 className="text-lg font-bold text-slate-100 group-hover:text-orange-400 transition-colors">
                    Quadro Kanban &rarr;
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                    Organize suas tarefas, filtre por prioridade, prazos e gerencie seus projetos com facilidade.
                    </p>
                </div>
                <span className="text-xs font-semibold text-orange-500">Acessar Tarefas</span>
                </Link>

                <Link
                to="/financeiro"
                className="group bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-orange-500/50 rounded-xl p-6 text-left transition-all shadow-lg flex flex-col justify-between gap-4"
                >
                <div>
                    <h2 className="text-lg font-bold text-slate-100 group-hover:text-orange-400 transition-colors">
                    Módulo Financeiro &rarr;
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                    Controle de fluxo de caixa, entradas, saídas e relatórios financeiros do seu negócio.
                    </p>
                </div>
                <span className="text-xs font-semibold text-orange-500">Acessar Finanças</span>
                </Link>
            </div>
        </div>
    );
}
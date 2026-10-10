import { useState } from 'react';

export default function Header() {
    const [activeTab, setActiveTab] = useState<'kanban' | 'financeiro'>('kanban');

    return (
        <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 px-4 sm:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 items-center h-16 w-full">
                <div className="flex items-center justify-start">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-black tracking-wide">
                        <span className="text-white">Gen</span>
                        <span className="text-orange-500">Flow</span>
                        </h1>
                    </div>
                </div>

                <div className="hidden md:flex justify-center">
                    <nav className="flex space-x-2 bg-slate-950/40 p-1 rounded-xl border border-slate-800/60">
                        <button onClick={() => setActiveTab('kanban')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all 
                            ${ activeTab === 'kanban'
                            ? 'bg-slate-800 text-orange-400 border border-slate-700 shadow-sm'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
                            <span>Kanban</span>
                        </button>

                        <button
                        onClick={() => setActiveTab('financeiro')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            activeTab === 'financeiro'
                            ? 'bg-slate-800 text-orange-400 border border-slate-700 shadow-sm'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                        }`}
                        >   
                            <span>Financeiro</span>
                        </button>
                    </nav>
                </div>

                {/* Perfil */}
                <div className="flex items-center justify-end space-x-4">
                    <div className="h-6 w-[1px] bg-slate-800 hidden sm:block"></div>

                    <div className="flex items-center gap-3 pl-1 cursor-pointer group">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 flex items-center 
                        justify-center text-slate-900 font-bold text-sm shadow-md group-hover:ring-2 group-hover:ring-orange-500 
                        transition-all">
                            P
                        </div>
                        <div className="hidden lg:block text-left">
                            <p className="text-sm font-semibold text-slate-200 leading-tight">Pedro</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE */}
            <div className="md:hidden border-t border-slate-800 -mx-4 sm:-mx-8 px-4 py-2 flex justify-around bg-slate-900/95">
                <button onClick={() => setActiveTab('kanban')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium 
                ${ activeTab === 'kanban' ? 'bg-slate-800 text-orange-400' : 'text-slate-400'}`}>
                    Kanban
                </button>
                <button onClick={() => setActiveTab('financeiro')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium 
                ${ activeTab === 'financeiro' ? 'bg-slate-800 text-orange-400' : 'text-slate-400'}`}>
                    Financeiro
                </button>
            </div>
        </header>
    );
}
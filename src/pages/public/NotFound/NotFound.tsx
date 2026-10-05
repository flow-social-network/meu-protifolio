import React from 'react';
import { Compass, ArrowLeft, Home } from 'lucide-react';
import { usePageSEO } from '../../../context/SiteContext';

interface NotFoundProps {
  onNavigate: (path: string) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  usePageSEO({
    title: 'Página Não Encontrada (404) — NoteAgents',
    description: 'A página solicitada não foi encontrada ou foi movida.',
    isPrivate: true
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm border border-blue-100">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div>
          <span className="text-4xl sm:text-6xl font-black text-blue-600 tracking-tight block">
            404
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Página não encontrada
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            O endereço que você tentou acessar não existe ou foi removido do sistema NoteAgents.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar página
          </button>
          <button
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Página Inicial
          </button>
        </div>
      </div>
    </div>
  );
};

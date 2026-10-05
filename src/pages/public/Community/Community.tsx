import React from 'react';
import { Users, MessageSquare, Sparkles, Github, ArrowRight } from 'lucide-react';
import { usePageSEO } from '../../../context/SiteContext';

interface CommunityProps {
  onNavigate: (path: string) => void;
}

export const Community: React.FC<CommunityProps> = ({ onNavigate }) => {
  usePageSEO({
    title: 'NoteAgents Community — Comunidade Open Source',
    description: 'Participe da comunidade NoteAgents de engenheiros de software e entusiastas de IA.',
    canonicalPath: '/comunidade'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Comunidade Global
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
          Comunidade NoteAgents
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Conecte-se com outros desenvolvedores, compartilhe pipelines de agentes e tire dúvidas com a equipe core.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Github className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">GitHub Discussions</h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Espaço oficial para debater RFCs, propor arquiteturas de novos agentes, relatar casos de uso e colaborar.
            </p>
          </div>
          <a
            href="https://github.com/deevo-solucoes/noteagents/discussions"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs text-center transition"
          >
            Acessar Discussões
          </a>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Canal Direto & Suporte</h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Precisa de ajuda com implementação em produção na sua empresa? Fale diretamente com Vini Amaral.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/atendimento')}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs text-center shadow-sm transition"
          >
            Falar com a Equipe
          </button>
        </div>
      </div>
    </div>
  );
};

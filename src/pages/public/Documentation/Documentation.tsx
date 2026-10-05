import React from 'react';
import { Book, Code, Terminal, Layers, ArrowRight } from 'lucide-react';
import { usePageSEO } from '../../../context/SiteContext';

interface DocumentationProps {
  onNavigate: (path: string) => void;
}

export const Documentation: React.FC<DocumentationProps> = ({ onNavigate }) => {
  usePageSEO({
    title: 'NoteAgents Documentation — Documentação Técnica',
    description: 'Documentação técnica da plataforma NoteAgents, arquitetura, contratos e instalação.',
    canonicalPath: '/documentacao'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Documentação Técnica
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
          Guia do Desenvolvedor
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Aprenda como instalar, configurar e integrar o NoteAgents ao seu fluxo de trabalho.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h2 className="text-base font-bold text-slate-900">Visão Geral da Arquitetura</h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            O NoteAgents é dividido em três camadas desacopladas: Site Público, Painel Administrativo CMS e Backend RESTful com contratos tipados e suporte nativo ao PostgreSQL / Neon.
          </p>
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
            <code>
              {`NOTEAGENTS
├── SITE PÚBLICO (React 19 + Tailwind CSS)
├── PAINEL CMS (Gestão de Páginas, Posts, Mídia, Agendamentos)
└── BACKEND REST (Express + TypeScript + Neon Postgres/Prisma)`}
            </code>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h2 className="text-base font-bold text-slate-900">Contratos da API REST</h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Todas as rotas da API em <code>/api/*</code> utilizam tipagem rigorosa exportada em <code>contracts/index.ts</code>, garantindo sincronia perfeita entre frontend e backend.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h2 className="text-base font-bold text-slate-900">Configuração de Ambiente</h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Consulte o arquivo <code>.env.example</code> para configurar <code>DATABASE_URL</code> do Neon PostgreSQL e <code>JWT_SECRET</code> para autenticação de administradores.
          </p>
        </div>
      </div>
    </div>
  );
};

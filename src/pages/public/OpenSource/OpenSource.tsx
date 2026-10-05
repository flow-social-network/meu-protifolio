import React from 'react';
import { Github, GitPullRequest, Code2, Users, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { usePageSEO } from '../../../context/SiteContext';

interface OpenSourceProps {
  onNavigate: (path: string) => void;
}

export const OpenSource: React.FC<OpenSourceProps> = ({ onNavigate }) => {
  usePageSEO({
    title: 'NoteAgents Open Source — Código Aberto e Colaboração',
    description: 'Plataforma open source de engenharia de software assistida por IA. Contribua no GitHub.',
    canonicalPath: '/open-source'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Open Source & Comunidade
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
          NoteAgents Open Source
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Engenharia de software assistida por inteligência artificial, construída em público e aberta à colaboração global.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <Github className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">Repositório no GitHub</h2>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Acesse o código fonte completo do NoteAgents, documentação de pipelines e exemplos de orquestração.
          </p>
          <a
            href="https://github.com/deevo-solucoes/noteagents"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            Acessar repositório →
          </a>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <GitPullRequest className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">Como Contribuir</h2>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Aceitamos pull requests para melhorias nos agentes, correção de bugs, suporte a novos modelos e traduções.
          </p>
          <button
            onClick={() => onNavigate('/documentacao')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            Guia de contribuição →
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">Licença Apache 2.0</h2>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Livre para uso comercial, modificação e distribuição com total transparência e segurança jurídica.
          </p>
          <span className="text-xs font-semibold text-slate-700">Licença permissiva e amigável</span>
        </div>
      </div>
    </div>
  );
};

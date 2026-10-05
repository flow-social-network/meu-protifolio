import React from 'react';
import { Terminal, Code, Cpu, ArrowRight } from 'lucide-react';
import { usePageSEO } from '../../../context/SiteContext';

interface DevelopersProps {
  onNavigate: (path: string) => void;
}

export const Developers: React.FC<DevelopersProps> = ({ onNavigate }) => {
  usePageSEO({
    title: 'NoteAgents Developers — Recursos para Desenvolvedores',
    description: 'Ferramentas, SDKs e guias de integração com a API do NoteAgents.',
    canonicalPath: '/desenvolvedores'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Portal do Desenvolvedor
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
          Recursos para Desenvolvedores
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Construa integrações com a API REST, orquestre agentes de IA e automatize pipelines de software.
        </p>
      </div>

      <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-slate-900">Exemplo de Requisição à API</h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
          <code>
            {`// Buscar projetos públicos
const res = await fetch('https://deevo.com.br/api/public/projects');
const projects = await res.json();
console.log('Projetos:', projects);`}
          </code>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => onNavigate('/atendimento')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
          >
            Falar com Suporte Técnico
          </button>
        </div>
      </div>
    </div>
  );
};

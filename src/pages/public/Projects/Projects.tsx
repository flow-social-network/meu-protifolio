import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Layers, ArrowRight } from 'lucide-react';
import { ProjectDTO } from '@/contracts/index';
import { api } from '../../../services/api';
import { usePageSEO } from '../../../context/SiteContext';

interface ProjectsProps {
  onNavigate: (path: string) => void;
  selectedSlug?: string;
}

export const Projects: React.FC<ProjectsProps> = ({ onNavigate, selectedSlug }) => {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [filter, setFilter] = useState<string>('ALL');

  usePageSEO({
    title: 'Projetos — DEEVO Soluções & NoteAgents',
    description: 'Conheça nossos principais projetos de software, IA, sistemas financeiros e automação.',
    canonicalPath: '/projetos'
  });

  useEffect(() => {
    api.public.getProjects().then(setProjects).catch(() => {});
  }, []);

  const filtered = filter === 'ALL' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Portfólio de Engenharia
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
          Projetos Desenvolvidos
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Sistemas em produção, arquitetura orientada a agentes e soluções escaláveis.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {['ALL', 'AI', 'WEB', 'FINANCE', 'AUTOMATION'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filter === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'ALL'
                ? 'Todos'
                : cat === 'AI'
                ? 'Inteligência Artificial'
                : cat === 'WEB'
                ? 'Aplicações Web'
                : cat === 'FINANCE'
                ? 'Sistemas Financeiros'
                : 'Automação'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-400 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  {proj.category}
                </span>
                {proj.featured && (
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Destaque
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">{proj.name}</h3>
              <p className="text-xs text-blue-600 font-semibold mb-3">{proj.tagline}</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">{proj.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {proj.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              {proj.repositoryUrl ? (
                <a
                  href={proj.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
                >
                  <Github className="w-4 h-4" />
                  Repositório
                </a>
              ) : (
                <span className="text-xs text-slate-400">Privado</span>
              )}

              {proj.demoUrl && (
                <a
                  href={proj.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
                >
                  Ver Projeto
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

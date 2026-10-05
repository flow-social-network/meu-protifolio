import React, { useState } from 'react';
import { Code, Server, Database, Cloud, Bot, Wrench, CheckCircle2 } from 'lucide-react';
import { usePageSEO } from '../../../context/SiteContext';

interface ResourcesProps {
  onNavigate: (path: string) => void;
}

export const Resources: React.FC<ResourcesProps> = ({ onNavigate }) => {
  usePageSEO({
    title: 'Habilidades & Recursos Técnicos — Vini Amaral',
    description: 'Tecnologias, frameworks e ferramentas que utilizo no desenvolvimento de software de alta performance.',
    canonicalPath: '/recursos'
  });

  const [activeTab, setActiveTab] = useState<'ALL' | 'FRONT' | 'BACK' | 'DB' | 'DEVOPS' | 'AI' | 'TOOLS'>('ALL');

  const categories = [
    { id: 'ALL', label: 'Todas' },
    { id: 'FRONT', label: 'Frontend' },
    { id: 'BACK', label: 'Backend' },
    { id: 'DB', label: 'Banco de Dados' },
    { id: 'DEVOPS', label: 'DevOps & Cloud' },
    { id: 'AI', label: 'Inteligência Artificial' },
    { id: 'TOOLS', label: 'Ferramentas' }
  ];

  const skillGroups = [
    {
      id: 'FRONT',
      title: 'Frontend Moderno',
      icon: Code,
      items: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5 Semântico', 'Acessibilidade WCAG', 'Responsividade Fluida']
    },
    {
      id: 'BACK',
      title: 'Backend & APIs',
      icon: Server,
      items: ['Node.js', 'Express', 'Python', 'FastAPI', 'REST APIs', 'WebSockets', 'Autenticação JWT', 'Clean Architecture']
    },
    {
      id: 'DB',
      title: 'Banco de Dados',
      icon: Database,
      items: ['PostgreSQL', 'Neon Tech', 'Prisma ORM', 'MongoDB', 'Redis', 'MySQL', 'Modelagem Relacional', 'Migrations']
    },
    {
      id: 'DEVOPS',
      title: 'DevOps & Infraestrutura',
      icon: Cloud,
      items: ['Docker', 'AWS (S3, ECS, Lambda)', 'Vercel', 'GitHub Actions', 'CI/CD Pipelines', 'Linux', 'Cloudflare', 'Monitoramento']
    },
    {
      id: 'AI',
      title: 'Inteligência Artificial & Agentes',
      icon: Bot,
      items: ['Google Gemini API', 'OpenAI', 'LangChain', 'Ollama', 'Model Context Protocol (MCP)', 'RAG Pipelines', 'Orquestração de Agentes']
    },
    {
      id: 'TOOLS',
      title: 'Ferramentas de Engenharia',
      icon: Wrench,
      items: ['VS Code', 'Git & GitHub', 'Postman', 'Figma', 'Notion', 'Zod', 'ESLint', 'Jest / Vitest']
    }
  ];

  const filteredGroups = activeTab === 'ALL' ? skillGroups : skillGroups.filter((g) => g.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Stack & Ferramentas
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
          Minhas Habilidades
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Tecnologias e ferramentas que utilizo no dia a dia para desenvolver produtos robustos e seguros.
        </p>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => {
          const Icon = group.icon;
          return (
            <div
              key={group.title}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-slate-900">{group.title}</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

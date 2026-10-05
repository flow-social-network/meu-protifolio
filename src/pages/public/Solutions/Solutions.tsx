import React from 'react';
import { Layers, Bot, Network, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePageSEO } from '../../../context/SiteContext';

interface SolutionsProps {
  onNavigate: (path: string) => void;
}

export const Solutions: React.FC<SolutionsProps> = ({ onNavigate }) => {
  usePageSEO({
    title: 'Soluções — DEEVO Soluções Financeiras & Tecnologia',
    description: 'Sistemas sob medida, inteligência artificial, automação financeira e consultoria em tecnologia.',
    canonicalPath: '/solucoes'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Serviços & Especialidades
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
          DEEVO Soluções Financeiras
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Tecnologia e inteligência para fortalecer a gestão financeira e acelerar a operação do seu negócio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Layers className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Sistemas Personalizados</h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Desenvolvimento de software sob medida para empresas que precisam de regras de negócio específicas,
              alta performance, estabilidade e arquitetura preparada para escala.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                Painéis administrativos e dashboards executivos
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                Sistemas financeiros e gestão de crédito
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                Controle de acesso granular e auditoria de ações
              </li>
            </ul>
          </div>
          <button
            onClick={() => onNavigate('/atendimento')}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
          >
            Solicitar Proposta
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
              <Bot className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Automação de Processos & IA</h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Reduza custos e aumente a eficiência com pipelines automatizados e agentes autônomos de IA
              integrados aos seus sistemas e rotinas diárias.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                Auditoria automática de fluxos e documentos
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                Agentes de atendimento e triagem inteligente
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                Eliminação de tarefas manuais repetitivas
              </li>
            </ul>
          </div>
          <button
            onClick={() => onNavigate('/atendimento')}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
          >
            Solicitar Proposta
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6">
              <Network className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Integrações e APIs REST</h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Conecte seus sistemas existentes com gateways bancários, ERPs, CRMs, WhatsApp e
              serviços em nuvem com segurança máxima.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                Webhooks resilientes e mensageria
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                Sincronização bidirecional de dados
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                Documentação OpenAPI/Swagger completa
              </li>
            </ul>
          </div>
          <button
            onClick={() => onNavigate('/atendimento')}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
          >
            Solicitar Proposta
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Consultoria em Tecnologia</h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Apoio estratégico para tomada de decisões tecnológicas, escolha de stack, refatoração
              de legado e modernização para a nuvem.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Revisão e auditoria de arquitetura de código
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Dimensionamento de infraestrutura em nuvem
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Mentoria técnica para squads de desenvolvimento
              </li>
            </ul>
          </div>
          <button
            onClick={() => onNavigate('/atendimento')}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
          >
            Solicitar Proposta
          </button>
        </div>
      </div>
    </div>
  );
};

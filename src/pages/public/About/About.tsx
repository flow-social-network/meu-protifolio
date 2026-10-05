import React from 'react';
import { Download, Sparkles, Target, Compass, Award, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePageSEO } from '../../../context/SiteContext';
import { useToast } from '../../../context/ToastContext';
import { FounderAvatar } from '../../../components/shared/FounderAvatar/FounderAvatar';

interface AboutProps {
  onNavigate: (path: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const toast = useToast();

  usePageSEO({
    title: 'Sobre Mim — Vini Amaral & DEEVO',
    description: 'Minha história, valores e visão sobre engenharia de software e inteligência artificial.',
    canonicalPath: '/sobre'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Sobre Mim
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Desenvolvedor, fundador e apaixonado por tecnologia.
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Sou Vini Amaral, desenvolvedor de software e fundador da <strong>DEEVO Soluções Financeiras</strong>.
            Atuo há mais de 10 anos criando soluções digitais completas, unindo tecnologia moderna,
            automação, inteligência artificial e boas práticas de engenharia de software.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Meu propósito é usar a tecnologia para gerar eficiência, inovação e crescimento sustentável para
            pessoas e empresas em todo o Brasil.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('/atendimento')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition"
            >
              Falar Comigo
            </button>
            <a
              href="/curriculo-vini-amaral.pdf"
              onClick={(e) => {
                e.preventDefault();
                toast.info('Currículo de Vini Amaral disponível para consulta e download.');
              }}
              className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              Baixar Currículo (PDF)
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-center">
          <FounderAvatar size="xl" />
        </div>
      </div>

      {/* 4 Pillars Values */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 text-center">Meus Princípios de Engenharia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Visão Estratégica</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tecnologia alinhada ao modelo de negócio, evitando complexidade desnecessária e focando em escala.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Foco em Resultados</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Entrega contínua de valor mensurável, velocidade de execução e monitoramento em tempo real.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Soluções Completas</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Do planejamento de arquitetura, banco e APIs até o frontend responsivo e deploy de alta disponibilidade.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Parceria de Longo Prazo</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Relacionamento transparente, suporte contínuo e evolução constante de sistemas críticos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

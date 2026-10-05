import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Download,
  Send,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Bot,
  Layers,
  Users,
  TrendingUp,
  Quote,
  Cpu,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Code2
} from 'lucide-react';
import { ProjectDTO, PostDTO, BannerDTO } from '@/contracts/index';
import { api } from '../../../services/api';
import { usePageSEO } from '../../../context/SiteContext';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [banners, setBanners] = useState<BannerDTO[]>([]);

  usePageSEO({
    title: 'NoteAgents — Engenharia de Software Assistida por IA',
    description:
      'Plataforma open source de engenharia de software assistida por IA e soluções de engenharia digital por Vini Amaral.',
    canonicalPath: '/'
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projData, postData, bannerData] = await Promise.all([
          api.public.getProjects().catch(() => []),
          api.public.getPosts().catch(() => []),
          api.public.getBanners().catch(() => [])
        ]);
        setProjects(projData);
        setPosts(postData);
        setBanners(bannerData);
      } catch {
        // Safe offline
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Dynamic Active Banners from CMS */}
      {banners.length > 0 && (
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white px-4 py-3 text-center text-xs font-semibold flex items-center justify-center gap-3">
          <span>{banners[0].title}</span>
          {banners[0].buttonUrl && (
            <a
              href={banners[0].buttonUrl}
              className="underline hover:text-blue-100 flex items-center gap-1 font-bold"
            >
              {banners[0].buttonText || 'Ver novidade'}
              <ArrowRight className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14">
        {/* Soft background glow */}
        <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-1/3 left-10 -z-10 w-80 h-80 bg-cyan-100/50 rounded-full blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Desenvolvedor Full Stack | Fundador
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                  Olá, eu sou <br />
                  <span className="text-blue-600">Vini Amaral</span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  Desenvolvedor de software e fundador da{' '}
                  <span className="text-blue-600 font-extrabold">DEEVO Soluções Financeiras</span>.
                </h2>
              </div>

              <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                Transformo ideias em soluções digitais reais. Desenvolvo sistemas modernos,
                escaláveis e orientados a resultados, unindo tecnologia, inteligência artificial e
                boas práticas de engenharia de software.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('/contato')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  Falar Comigo
                </button>

                <button
                  onClick={() => onNavigate('/sobre')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-xs transition"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  Baixar Currículo
                </button>
              </div>

              {/* Social and availability badge */}
              <div className="flex flex-wrap items-center gap-4 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://github.com/deevo-solucoes"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/viniamaral"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:vini@deevo.com.br"
                    aria-label="E-mail"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Brasil</span>
                </div>

                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Disponível para novos projetos
                </div>
              </div>
            </div>

            {/* Right Column: Founder Card & Metric Badges */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full max-w-md">
                {/* Clean Photo Frame */}
                <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2.5 bg-gradient-to-tr from-amber-400 via-orange-400 to-blue-600 shadow-2xl mb-8">
                  <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center relative">
                    <img
                      src="/icon.svg"
                      alt="Vini Amaral - Fundador DEEVO Soluções Financeiras"
                      className="w-32 h-32 object-contain opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-4 text-center">
                      <span className="text-white font-bold text-sm">Vini Amaral</span>
                      <span className="text-[11px] text-blue-300">Fundador & Full Stack</span>
                    </div>
                  </div>
                </div>

                {/* 4 Metrics Grid matching Image 1 */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 transition">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">+10 anos</div>
                    <div className="text-xs text-slate-500 font-medium">de experiência</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 transition">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">+50</div>
                    <div className="text-xs text-slate-500 font-medium">projetos entregues</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 transition">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">Clientes</div>
                    <div className="text-xs text-slate-500 font-medium">empresas e startups</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 transition">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">Especialista</div>
                    <div className="text-xs text-slate-500 font-medium">em soluções com IA</div>
                  </div>
                </div>

                {/* Purpose Quote matching Image 1 */}
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
                  <Quote className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    “Meu propósito é usar a tecnologia para gerar eficiência, inovação e crescimento
                    para pessoas e empresas.”
                    <span className="block mt-1 font-bold text-slate-900 not-italic">— Vini Amaral</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION matching Image 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Projetos em Destaque
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Alguns dos principais projetos que desenvolvi e lidero.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/projetos')}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
          >
            Ver todos os projetos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: NoteAgents */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 p-2.5 mb-4 group-hover:scale-105 transition">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <polygon points="50,8 88,30 88,70 50,92 12,70 12,30" fill="#0B5FFF" />
                  <circle cx="50" cy="50" r="16" fill="#FFFFFF" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-slate-900">NoteAgents</h4>
              <p className="text-xs text-blue-600 font-semibold mb-2">AI Engineering Control Plane</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Plataforma open source de engenharia de software assistida por IA. Coordena
                projetos, agentes, código, testes, auditoria, observabilidade e deployment.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">
                  Next.js
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">
                  TypeScript
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-semibold">
                  IA
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">
                  Open Source
                </span>
              </div>
              <button
                onClick={() => onNavigate('/projetos/noteagents')}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                Ver Detalhes
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: DEEVO Soluções Financeiras */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white p-2.5 mb-4 group-hover:scale-105 transition">
                <TrendingUp className="w-full h-full" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">DEEVO Financeiro</h4>
              <p className="text-xs text-blue-600 font-semibold mb-2">Sistemas Financeiros e Gestão</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Soluções completas para gestão financeira, automação de processos e inteligência de
                dados. Tecnologia a serviço do crescimento do negócio.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">
                  Web
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">
                  Cloud
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-semibold">
                  Integrações
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">
                  Dashboard
                </span>
              </div>
              <button
                onClick={() => onNavigate('/projetos/deevo-financeiro')}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                Ver Detalhes
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Plataforma de Auditoria IA */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 p-2.5 mb-4 group-hover:scale-105 transition">
                <CheckCircle2 className="w-full h-full" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Auditoria IA</h4>
              <p className="text-xs text-cyan-600 font-semibold mb-2">Auditoria e Qualidade de Código</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Sistema de auditoria automática de código, segurança e arquitetura usando agentes
                de IA. Detecta problemas, corrige e gera evidências completas.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-semibold">
                  IA
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">
                  Segurança
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">
                  Observabilidade
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">
                  API
                </span>
              </div>
              <button
                onClick={() => onNavigate('/projetos')}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                Ver Detalhes
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Orquestrador de Agentes */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 p-2.5 mb-4 group-hover:scale-105 transition">
                <Bot className="w-full h-full" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Orquestrador IA</h4>
              <p className="text-xs text-indigo-600 font-semibold mb-2">Automação e Pipelines</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Sistema para orquestrar múltiplos agentes de IA em pipelines de desenvolvimento,
                testes, revisão, deploy e monitoramento contínuo.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 text-[10px] font-semibold">
                  Agentes
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">
                  Pipelines
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">
                  DevOps
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">
                  Automação
                </span>
              </div>
              <button
                onClick={() => onNavigate('/projetos')}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                Ver Detalhes
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS & JOURNEY & ABOUT DEEVO GRID matching Image 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Minhas Habilidades (Col 4) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Minhas Habilidades</h3>
              <button
                onClick={() => onNavigate('/recursos')}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                Ver todas →
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-6">Tecnologias que utilizo no dia a dia.</p>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { name: 'React', category: 'Frontend' },
                { name: 'Next.js', category: 'Full Stack' },
                { name: 'TypeScript', category: 'Language' },
                { name: 'Node.js', category: 'Backend' },
                { name: 'Python', category: 'AI & Data' },
                { name: 'PostgreSQL', category: 'Database' },
                { name: 'MongoDB', category: 'NoSQL' },
                { name: 'Docker', category: 'DevOps' },
                { name: 'AWS', category: 'Cloud' },
                { name: 'Git', category: 'VCS' },
                { name: 'GitHub', category: 'CI/CD' },
                { name: 'Vercel', category: 'Deploy' }
              ].map((skill) => (
                <div
                  key={skill.name}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/70 transition flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block leading-tight">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-slate-400">{skill.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Minha Jornada (Col 4) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Minha Jornada</h3>
            <p className="text-xs text-slate-500 mb-6">Principais marcos da minha carreira.</p>

            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              <div className="relative pl-6">
                <div className="w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100 absolute left-0 top-0.5" />
                <span className="text-[11px] font-bold text-blue-600">2024 - Atual</span>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">Fundador e Desenvolvedor</h4>
                <p className="text-xs text-slate-500">DEEVO Soluções Financeiras & NoteAgents</p>
              </div>

              <div className="relative pl-6">
                <div className="w-4 h-4 rounded-full bg-slate-400 absolute left-0 top-0.5" />
                <span className="text-[11px] font-bold text-slate-500">2022 - 2024</span>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">Desenvolvedor Full Stack</h4>
                <p className="text-xs text-slate-500">Projetos para empresas e startups</p>
              </div>

              <div className="relative pl-6">
                <div className="w-4 h-4 rounded-full bg-slate-400 absolute left-0 top-0.5" />
                <span className="text-[11px] font-bold text-slate-500">2019 - 2022</span>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">Desenvolvedor de Sistemas</h4>
                <p className="text-xs text-slate-500">Soluções web e automação</p>
              </div>

              <div className="relative pl-6">
                <div className="w-4 h-4 rounded-full bg-slate-400 absolute left-0 top-0.5" />
                <span className="text-[11px] font-bold text-slate-500">2015 - 2019</span>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">Início da Carreira</h4>
                <p className="text-xs text-slate-500">Primeiros projetos e aprendizado contínuo</p>
              </div>
            </div>
          </div>

          {/* Sobre a DEEVO (Col 4) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900">Sobre a DEEVO</h3>
                <button
                  onClick={() => onNavigate('/sobre')}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  Ver mais →
                </button>
              </div>
              <p className="text-xs text-slate-500 mb-6">Conheça a empresa que fundei.</p>

              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center text-xs font-bold">
                    D
                  </div>
                  <span className="font-extrabold text-sm tracking-wide">DEEVO</span>
                </div>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Tecnologia e inteligência para fortalecer a gestão financeira e engenharia de software da sua empresa.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  Sistemas personalizados sob medida
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  Automação de processos & Pipelines IA
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  Integrações e APIs seguras
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  Consultoria em tecnologia e arquitetura
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('/atendimento')}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              Agendar Conversa com Especialista
            </button>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Vamos construir sua próxima solução digital?
            </h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              Atendimento especializado para empresas, startups e desenvolvedores. Agende um horário
              online ou entre em contato diretamente.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/atendimento')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-blue-600 hover:bg-blue-50 font-bold text-sm shadow-md transition"
            >
              Agendar Horário Online
            </button>
            <button
              onClick={() => onNavigate('/contato')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-sm transition"
            >
              Enviar Mensagem
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

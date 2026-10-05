import React, { useState, useEffect } from 'react';
import {
  FileText,
  BookOpen,
  Image as ImageIcon,
  Sliders,
  Calendar,
  Rocket,
  Search,
  Settings,
  Plug,
  ExternalLink,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowRight,
  TrendingUp,
  Layout,
  GitBranch,
  ShieldAlert
} from 'lucide-react';
import { DashboardMetricsDTO } from '../../../../contracts';
import { api } from '../../../services/api';
import { useToast } from '../../../context/ToastContext';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const toast = useToast();
  const [metrics, setMetrics] = useState<DashboardMetricsDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMetrics = async () => {
    setIsLoading(true);
    try {
      const data = await api.dashboard.getMetrics();
      setMetrics(data);
    } catch (err: any) {
      toast.error('Não foi possível carregar métricas.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Painel do Site</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gerencie todo o conteúdo, aparência, agendamentos e integrações do site da DEEVO.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchMetrics}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition"
            title="Atualizar dados"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => onNavigate('/admin/posts')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Novo Post
          </button>
        </div>
      </div>

      {/* 4 Top Metric Cards matching Image 3 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('/admin/pages')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 transition cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">Páginas</span>
              <span className="text-[11px] text-slate-400">Gerenciar páginas</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-slate-900">{metrics?.pagesCount ?? 0}</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('/admin/posts')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 transition cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">Posts do Blog</span>
              <span className="text-[11px] text-slate-400">Criar e editar</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-slate-900">{metrics?.postsCount ?? 0}</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('/admin/media')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 transition cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">Mídia</span>
              <span className="text-[11px] text-slate-400">Imagens e arquivos</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-slate-900">{metrics?.mediaCount ?? 0}</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('/admin/appointments')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 transition cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">Agendamentos</span>
              <span className="text-[11px] text-slate-400">Atendimentos</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-slate-900">{metrics?.appointmentsCount ?? 0}</span>
          </div>
        </div>
      </div>

      {/* Large Welcome Banner matching Image 3 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-100 text-[11px] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
            Site Público Conectado
          </div>
          <h2 className="text-2xl font-black tracking-tight">Bem-vindo ao painel do site</h2>
          <p className="text-xs text-blue-100 leading-relaxed">
            Aqui você pode gerenciar todo o conteúdo, páginas, posts do blog, agendamentos, SEO e integrações
            da sua plataforma com total controle.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('/admin/pages')}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-600 hover:bg-blue-50 font-bold text-xs shadow-sm transition"
            >
              Gerenciar Páginas
            </button>
            <button
              onClick={() => window.open('/', '_blank')}
              className="px-4 py-2.5 rounded-xl border border-white/30 hover:bg-white/10 text-white font-semibold text-xs transition flex items-center gap-1.5"
            >
              Ver Site
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Database Status Pill */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-blue-100 space-y-2 z-10 w-full md:w-64">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Banco de Dados:</span>
            <span className="font-bold text-white flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-cyan-300" />
              {metrics?.databaseStatus === 'connected' ? 'Neon Tech (Online)' : 'Local / Preparado'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Status do Site:</span>
            <span className="font-bold text-emerald-300 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/10 text-blue-200">
            <span>Última Sincronização:</span>
            <span>Agora mesmo</span>
          </div>
        </div>
      </div>

      {/* Grid of Action Sections matching Image 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Ações Rápidas */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onNavigate('/admin/pages')}
              className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 text-left transition"
            >
              <FileText className="w-4 h-4 text-blue-600 mb-1" />
              <span className="text-xs font-bold text-slate-800 block">Nova Página</span>
              <span className="text-[10px] text-slate-400">Criar conteúdo</span>
            </button>
            <button
              onClick={() => onNavigate('/admin/posts')}
              className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 text-left transition"
            >
              <BookOpen className="w-4 h-4 text-indigo-600 mb-1" />
              <span className="text-xs font-bold text-slate-800 block">Novo Post</span>
              <span className="text-[10px] text-slate-400">Blog da DEEVO</span>
            </button>
            <button
              onClick={() => onNavigate('/admin/media')}
              className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 text-left transition"
            >
              <ImageIcon className="w-4 h-4 text-cyan-600 mb-1" />
              <span className="text-xs font-bold text-slate-800 block">Subir Mídia</span>
              <span className="text-[10px] text-slate-400">Imagens do site</span>
            </button>
            <button
              onClick={() => onNavigate('/admin/seo')}
              className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 text-left transition"
            >
              <Search className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="text-xs font-bold text-slate-800 block">SEO & Tags</span>
              <span className="text-[10px] text-slate-400">Otimizar busca</span>
            </button>
          </div>
        </div>

        {/* Gerenciar Conteúdo */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Layout className="w-4 h-4 text-blue-600" />
            Gerenciar Conteúdo
          </h3>
          {[
            { label: 'Páginas do Site', sub: 'Crie e edite as páginas institucionais', path: '/admin/pages' },
            { label: 'Posts do Blog', sub: 'Publique novidades, tutoriais e artigos', path: '/admin/posts' },
            { label: 'Biblioteca de Mídia', sub: 'Imagens, documentos e logotipos', path: '/admin/media' },
            { label: 'Banners da Home', sub: 'Gerencie carrossel e chamadas de ação', path: '/admin/banners' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.path)}
              className="w-full p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left transition group"
            >
              <div>
                <span className="text-xs font-bold text-slate-800 block group-hover:text-blue-600">
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-400">{item.sub}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
            </button>
          ))}
        </div>

        {/* Repositórios & Deploy */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Rocket className="w-4 h-4 text-blue-600" />
            Repositórios & Deploy
          </h3>
          {[
            { label: 'Repositórios GitHub', sub: 'Gerencie os códigos e sincronização', path: '/admin/repositories' },
            { label: 'Publicação & Vercel', sub: 'Monitore status e histórico de deploys', path: '/admin/deployments' },
            { label: 'Integrações Externas', sub: 'WhatsApp, GA4, GTM e Webhooks', path: '/admin/integrations' },
            { label: 'Configurações do Site', sub: 'Domínio, e-mails e metadados', path: '/admin/settings' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.path)}
              className="w-full p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left transition group"
            >
              <div>
                <span className="text-xs font-bold text-slate-800 block group-hover:text-blue-600">
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-400">{item.sub}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

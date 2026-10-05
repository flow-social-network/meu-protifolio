import React, { useState, useEffect } from 'react';
import { Rocket, RefreshCw, CheckCircle2, ExternalLink, GitCommit, Clock } from 'lucide-react';
import { api } from '../../../services/api';
import { useToast } from '../../../context/ToastContext';

export const AdminDeployments: React.FC = () => {
  const toast = useToast();
  const [deployments, setDeployments] = useState<any[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);

  const loadDeployments = async () => {
    try {
      const data = await api.deployments.list();
      setDeployments(data);
    } catch {
      toast.error('Erro ao consultar histórico de deploy.');
    }
  };

  useEffect(() => {
    loadDeployments();
  }, []);

  const handleRedeploy = async () => {
    setIsDeploying(true);
    try {
      const res = await api.deployments.redeploy();
      toast.success(res.message);
      loadDeployments();
    } catch {
      toast.error('Erro ao acionar novo deploy.');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Deploy / Publicação</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Acompanhe o status de publicação contínua e histórico de deploys na Vercel.
          </p>
        </div>

        <button
          onClick={handleRedeploy}
          disabled={isDeploying}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition disabled:opacity-50"
        >
          <Rocket className="w-4 h-4" />
          {isDeploying ? 'Publicando...' : 'Fazer Novo Deploy'}
        </button>
      </div>

      {/* Production Environment Status Card matching Image 5 Screen 14 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Ambiente Principal</span>
            <h2 className="text-lg font-bold text-slate-900">Produção (deevo.com.br)</h2>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-emerald-700">Online & Ativo</span>
              <span>•</span>
              <span className="text-slate-400">Branch: main</span>
            </div>
          </div>
          <a
            href="https://deevo.com.br"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-blue-600 transition"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Ambiente de Testes</span>
            <h2 className="text-lg font-bold text-slate-900">Preview & Staging</h2>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="font-semibold text-blue-700">Pronto para Validação</span>
            </div>
          </div>
          <button
            onClick={() => toast.info('Ambiente de staging sincronizado com o commit mais recente.')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition"
          >
            Ver Logs
          </button>
        </div>
      </div>

      {/* Deployments History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-900">
          Histórico Recente de Publicações
        </div>
        <div className="divide-y divide-slate-100 text-xs">
          {deployments.map((dep) => (
            <div key={dep.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{dep.environment}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {dep.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <GitCommit className="w-3.5 h-3.5" />
                  <span className="font-mono">{dep.commitHash}</span>
                  <span>-</span>
                  <span>{dep.commitMsg}</span>
                </div>
              </div>
              <div className="text-right text-slate-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 inline mr-1" />
                {new Date(dep.createdAt).toLocaleDateString('pt-BR')} às{' '}
                {new Date(dep.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

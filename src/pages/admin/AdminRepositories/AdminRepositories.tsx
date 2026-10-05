import React, { useState, useEffect } from 'react';
import { GitBranch, RefreshCw, CheckCircle2, Lock, Globe, ExternalLink } from 'lucide-react';
import { api } from '../../../services/api';
import { useToast } from '../../../context/ToastContext';

export const AdminRepositories: React.FC = () => {
  const toast = useToast();
  const [data, setData] = useState<{ connected: boolean; repositories: any[] }>({
    connected: false,
    repositories: []
  });
  const [isSyncing, setIsSyncing] = useState(false);

  const loadRepos = async () => {
    try {
      const res = await api.repositories.list();
      setData(res);
    } catch {
      toast.error('Erro ao consultar repositórios.');
    }
  };

  useEffect(() => {
    loadRepos();
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await api.repositories.sync();
      toast.success(res.message);
      loadRepos();
    } catch (err: any) {
      toast.error(err.message || 'Falha ao sincronizar.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Repositórios</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Conecte e gerencie seus repositórios sincronizados com o GitHub.
          </p>
        </div>

        {data.connected && (
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            Sincronizar com GitHub
          </button>
        )}
      </div>

      {!data.connected ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xs text-center max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
            <GitBranch className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Integração GitHub não configurada</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Para listar branches, commits e sincronizar projetos automaticamente, configure o token do GitHub nas integrações.
            </p>
          </div>
          <button
            onClick={async () => {
              await api.integrations.connect('int_github', { token: 'configured' });
              toast.success('GitHub conectado com sucesso!');
              loadRepos();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition"
          >
            Conectar com GitHub
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-slate-800">GitHub Conectado (3 repositórios sincronizados)</span>
            </div>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {data.repositories.map((repo) => (
              <div key={repo.name} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                    <GitBranch className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{repo.fullName}</span>
                    <span className="text-[11px] text-slate-400">Branch padrão: {repo.branch}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Sincronizado
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

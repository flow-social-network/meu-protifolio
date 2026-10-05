import React, { useState, useEffect } from 'react';
import { Activity, Search, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { SystemLogDTO } from '../../../../contracts';
import { api } from '../../../services/api';

export const AdminLogs: React.FC = () => {
  const [logs, setLogs] = useState<SystemLogDTO[]>([]);
  const [filterLevel, setFilterLevel] = useState<'ALL' | 'info' | 'warning' | 'error'>('ALL');

  useEffect(() => {
    api.logs.list().then(setLogs).catch(() => {});
  }, []);

  const filtered = filterLevel === 'ALL' ? logs : logs.filter((l) => l.level === filterLevel);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Logs do Sistema</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Eventos operacionais, requisições de API e integridade do backend.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
          {(['ALL', 'info', 'warning', 'error'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                filterLevel === lvl ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {lvl === 'ALL' ? 'Todos' : lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-950 text-slate-200 rounded-3xl p-6 font-mono text-xs shadow-xl border border-slate-800 space-y-3 overflow-x-auto">
        <div className="text-[11px] text-slate-500 border-b border-slate-800 pb-2">
          NoteAgents Server Runtime Logs • Stream Ativo
        </div>
        {filtered.map((log) => (
          <div key={log.id} className="flex items-start gap-3 hover:bg-slate-900/60 p-2 rounded-lg transition">
            <span className="text-slate-500 text-[10px] shrink-0">
              {new Date(log.timestamp).toLocaleTimeString('pt-BR')}
            </span>
            <span
              className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold shrink-0 ${
                log.level === 'error'
                  ? 'bg-rose-500/20 text-rose-400'
                  : log.level === 'warning'
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}
            >
              [{log.level}]
            </span>
            <span className="text-cyan-400 font-bold shrink-0">{log.service}:</span>
            <span className="text-slate-300">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

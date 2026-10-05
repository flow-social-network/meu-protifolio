import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, Clock, User, Globe } from 'lucide-react';
import { AuditLogDTO } from '../../../../contracts';
import { api } from '../../../services/api';

export const AdminAudit: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.audit.list().then(setLogs).catch(() => {});
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.details || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Auditoria do Sistema</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Registro imutável de todas as ações administrativas, alterações e eventos de segurança.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar por ação ou recurso..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Ação</th>
                <th className="p-3.5">Recurso</th>
                <th className="p-3.5">Usuário</th>
                <th className="p-3.5">Detalhes</th>
                <th className="p-3.5 text-right">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="p-3.5 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString('pt-BR')}
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 font-mono text-[11px]">{log.action}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {log.resource}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-700">{log.userName || 'Sistema'}</td>
                  <td className="p-3.5 text-slate-600 max-w-xs truncate" title={log.details}>
                    {log.details || '-'}
                  </td>
                  <td className="p-3.5 text-right font-mono text-slate-400 text-[11px]">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

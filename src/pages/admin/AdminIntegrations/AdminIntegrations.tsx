import React, { useState, useEffect } from 'react';
import { Plug, CheckCircle2, XCircle, AlertCircle, RefreshCw, Key } from 'lucide-react';
import { IntegrationDTO } from '../../../../contracts';
import { api } from '../../../services/api';
import { Modal } from '../../../components/shared/Modal/Modal';
import { useToast } from '../../../context/ToastContext';

export const AdminIntegrations: React.FC = () => {
  const toast = useToast();
  const [integrations, setIntegrations] = useState<IntegrationDTO[]>([]);
  const [selectedInt, setSelectedInt] = useState<IntegrationDTO | null>(null);
  const [configKey, setConfigKey] = useState('');

  const loadIntegrations = async () => {
    try {
      const data = await api.integrations.list();
      setIntegrations(data);
    } catch {
      toast.error('Erro ao carregar integrações.');
    }
  };

  useEffect(() => {
    loadIntegrations();
  }, []);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInt) return;

    try {
      await api.integrations.connect(selectedInt.id, { token: configKey });
      toast.success(`Integração "${selectedInt.name}" conectada com sucesso!`);
      setSelectedInt(null);
      setConfigKey('');
      loadIntegrations();
    } catch {
      toast.error('Falha ao conectar integração.');
    }
  };

  const handleDisconnect = async (id: string, name: string) => {
    try {
      await api.integrations.disconnect(id);
      toast.success(`Integração "${name}" desconectada.`);
      loadIntegrations();
    } catch {
      toast.error('Erro ao desconectar.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Integrações</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Conecte seu site com ferramentas de automação, analytics, e-mail e repositórios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Plug className="w-5 h-5" />
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                    item.connected
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${item.connected ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                  {item.connected ? 'Conectado' : 'Não conectado'}
                </span>
              </div>

              <h2 className="text-sm font-bold text-slate-900">{item.name}</h2>
              <p className="text-xs text-slate-500 leading-relaxed mt-1 mb-4">{item.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Atualizado em {new Date(item.updatedAt).toLocaleDateString('pt-BR')}
              </span>

              {item.connected ? (
                <button
                  onClick={() => handleDisconnect(item.id, item.name)}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition"
                >
                  Desconectar
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedInt(item);
                    setConfigKey('');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition"
                >
                  Conectar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Connection Modal */}
      {selectedInt && (
        <Modal
          isOpen={!!selectedInt}
          onClose={() => setSelectedInt(null)}
          title={`Conectar ${selectedInt.name}`}
        >
          <form onSubmit={handleConnect} className="space-y-4 text-xs">
            <p className="text-slate-600 leading-relaxed">
              Insira a chave de API, Webhook URL ou credencial pública para habilitar a integração.
            </p>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Chave / Token de Acesso *</label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={configKey}
                  onChange={(e) => setConfigKey(e.target.value)}
                  placeholder="Insira o token seguro..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedInt(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm"
              >
                Salvar & Conectar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

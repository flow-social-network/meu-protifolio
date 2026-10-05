import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2 } from 'lucide-react';
import { SiteSettingsDTO } from '../../../../contracts';
import { api } from '../../../services/api';
import { useToast } from '../../../context/ToastContext';
import { useSite } from '../../../context/SiteContext';

export const AdminSettings: React.FC = () => {
  const toast = useToast();
  const { refreshSettings } = useSite();
  const [settings, setSettings] = useState<SiteSettingsDTO>({
    siteName: 'DEEVO Soluções Financeiras & NoteAgents',
    tagline: 'Transformando ideias em soluções digitais reais.',
    siteUrl: 'https://deevo.com.br',
    contactEmail: 'vini@deevo.com.br',
    contactPhone: '+55 (11) 99999-9999',
    address: 'Brasil',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo (GMT-3)',
    githubUrl: 'https://github.com/deevo-solucoes',
    linkedinUrl: 'https://linkedin.com/in/viniamaral',
    whatsappNumber: '5511999999999'
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    api.settings.get().then(setSettings).catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.settings.update(settings);
      await refreshSettings();
      toast.success('Configurações salvas com sucesso!');
    } catch {
      toast.error('Erro ao salvar configurações.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Configurações Gerais</h1>
          <p className="text-xs text-slate-500 mt-0.5">Gerencie os dados institucionais, contatos e URLs do site.</p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Identidade do Site</h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Site *</label>
            <input
              type="text"
              required
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Slogan / Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">URL Pública Oficial</label>
            <input
              type="url"
              value={settings.siteUrl}
              onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Idioma Padrão</label>
              <input
                type="text"
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Fuso Horário</label>
              <input
                type="text"
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Informações de Contato & Redes Sociais</h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">E-mail de Atendimento</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Telefone / WhatsApp</label>
            <input
              type="text"
              value={settings.contactPhone}
              onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Perfil do LinkedIn</label>
            <input
              type="url"
              value={settings.linkedinUrl}
              onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Organização no GitHub</label>
            <input
              type="url"
              value={settings.githubUrl}
              onChange={(e) => setSettings({ ...settings, githubUrl: e.target.value })}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none font-mono"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

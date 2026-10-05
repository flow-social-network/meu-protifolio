import React, { useState, useEffect } from 'react';
import { Search, Save, CheckCircle2, Globe, Tag, X } from 'lucide-react';
import { SeoSettingsDTO } from '../../../../contracts';
import { api } from '../../../services/api';
import { useToast } from '../../../context/ToastContext';

export const AdminSEO: React.FC = () => {
  const toast = useToast();
  const [seo, setSeo] = useState<SeoSettingsDTO>({
    siteTitle: 'NoteAgents — Engenharia de Software Assistida por IA',
    siteDescription:
      'Plataforma open source de engenharia de software assistida por IA. Coordena projetos, agentes, código, testes, observabilidade e deployment.',
    keywords: ['NoteAgents', 'IA', 'Engenharia de Software', 'DEEVO', 'Open Source'],
    canonicalBaseUrl: 'https://deevo.com.br',
    ogTitle: 'NoteAgents — Engenharia de Software Assistida por IA',
    ogDescription: 'Plataforma open source de engenharia de software assistida por IA.',
    ogImage: '/icon.svg',
    indexingEnabled: true,
    autoSitemap: true
  });
  const [newKeyword, setNewKeyword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const loadSeo = async () => {
    try {
      const data = await api.seo.get();
      setSeo(data);
    } catch {
      toast.error('Erro ao carregar configurações de SEO.');
    }
  };

  useEffect(() => {
    loadSeo();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.seo.update(seo);
      toast.success('Configurações de SEO salvas com sucesso!');
    } catch (err: any) {
      toast.error(err.message || 'Falha ao salvar SEO.');
    } finally {
      setIsSaving(false);
    }
  };

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    if (seo.keywords.includes(newKeyword.trim())) return;
    setSeo({ ...seo, keywords: [...seo.keywords, newKeyword.trim()] });
    setNewKeyword('');
  };

  const removeKeyword = (kw: string) => {
    setSeo({ ...seo, keywords: seo.keywords.filter((k) => k !== kw) });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">SEO e Metadados</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Otimize seu site para buscadores (Google, Bing) e prévias de compartilhamento social.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Salvando...' : 'Salvar Configurações'}
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main SEO column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900">Configurações Gerais de Busca</h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Título Padrão do Site (Title Tag) *</label>
              <input
                type="text"
                required
                value={seo.siteTitle}
                onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Tamanho recomendado: 50 a 60 caracteres. Atual: {seo.siteTitle.length}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Meta Descrição Geral *</label>
              <textarea
                rows={3}
                required
                value={seo.siteDescription}
                onChange={(e) => setSeo({ ...seo, siteDescription: e.target.value })}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Tamanho recomendado: 120 a 160 caracteres. Atual: {seo.siteDescription.length}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Palavras-chave (Keywords)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addKeyword();
                    }
                  }}
                  placeholder="Adicionar palavra-chave e teclar Enter..."
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addKeyword}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                >
                  Adicionar
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {seo.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {kw}
                    <button
                      type="button"
                      onClick={() => removeKeyword(kw)}
                      className="p-0.5 hover:bg-blue-100 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900">Open Graph & Redes Sociais</h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">OG Title (Título no WhatsApp/LinkedIn)</label>
              <input
                type="text"
                value={seo.ogTitle}
                onChange={(e) => setSeo({ ...seo, ogTitle: e.target.value })}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">OG Description (Descrição social)</label>
              <textarea
                rows={2}
                value={seo.ogDescription}
                onChange={(e) => setSeo({ ...seo, ogDescription: e.target.value })}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Side control column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Indexação e Robôs</h2>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Indexação nos buscadores</span>
                <span className="text-[11px] text-slate-400">Permitir Google indexar páginas públicas</span>
              </div>
              <input
                type="checkbox"
                checked={seo.indexingEnabled}
                onChange={(e) => setSeo({ ...seo, indexingEnabled: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Gerar sitemap automaticamente</span>
                <span className="text-[11px] text-slate-400">Atualizar /sitemap.xml a cada alteração</span>
              </div>
              <input
                type="checkbox"
                checked={seo.autoSitemap}
                onChange={(e) => setSeo({ ...seo, autoSitemap: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Canonical Base URL</label>
              <input
                type="url"
                value={seo.canonicalBaseUrl}
                onChange={(e) => setSeo({ ...seo, canonicalBaseUrl: e.target.value })}
                placeholder="https://deevo.com.br"
                className="w-full p-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

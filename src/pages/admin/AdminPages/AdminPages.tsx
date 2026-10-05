import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Globe, Eye, FileText, Check, X, ArrowLeft } from 'lucide-react';
import { PageDTO, PageStatus } from '../../../../contracts';
import { api } from '../../../services/api';
import { Badge } from '../../../components/shared/Badge/Badge';
import { EmptyState } from '../../../components/shared/EmptyState/EmptyState';
import { VisualEditor } from '../../../components/editor/VisualEditor/VisualEditor';
import { useToast } from '../../../context/ToastContext';

export const AdminPages: React.FC = () => {
  const toast = useToast();
  const [pages, setPages] = useState<PageDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');
  const [editingPage, setEditingPage] = useState<Partial<PageDTO> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadPages = async () => {
    try {
      const data = await api.pages.list();
      setPages(data);
    } catch (err: any) {
      toast.error('Erro ao carregar páginas.');
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage?.title || !editingPage?.slug) {
      toast.error('Título e slug são obrigatórios.');
      return;
    }

    setIsLoading(true);
    try {
      if (editingPage.id) {
        await api.pages.update(editingPage.id, editingPage);
        toast.success('Página atualizada com sucesso!');
      } else {
        await api.pages.create(editingPage);
        toast.success('Página criada com sucesso!');
      }
      setEditingPage(null);
      loadPages();
    } catch (err: any) {
      toast.error(err.message || 'Erro ao salvar página.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    try {
      await api.pages.delete(id);
      toast.success(`Página "${title}" excluída.`);
      loadPages();
    } catch (err: any) {
      toast.error('Erro ao excluir página.');
    }
  };

  const filtered = pages.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' ? true : statusFilter === 'PUBLISHED' ? p.status === 'PUBLISHED' : p.status === 'DRAFT';
    return matchesSearch && matchesStatus;
  });

  // Editor Screen
  if (editingPage) {
    return (
      <div className="space-y-6 animate-in fade-in">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditingPage(null)}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {editingPage.id ? `Editar Página: ${editingPage.title}` : 'Nova Página'}
              </h1>
              <p className="text-xs text-slate-500">
                Edite o conteúdo visualmente com a barra de ferramentas abaixo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setEditingPage(null)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isLoading}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition disabled:opacity-50"
            >
              {isLoading ? 'Salvando...' : 'Salvar Página'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Título da Página *</label>
              <input
                type="text"
                required
                value={editingPage.title || ''}
                onChange={(e) =>
                  setEditingPage({
                    ...editingPage,
                    title: e.target.value,
                    slug: editingPage.id
                      ? editingPage.slug
                      : e.target.value.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-')
                  })
                }
                placeholder="Ex: Sobre a Empresa"
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Slug da URL *</label>
              <div className="flex items-center">
                <span className="bg-slate-100 border border-r-0 border-slate-300 px-3 py-2 text-xs text-slate-500 rounded-l-xl">
                  deevo.com.br/
                </span>
                <input
                  type="text"
                  required
                  value={editingPage.slug || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                  placeholder="sobre-a-empresa"
                  className="w-full p-2.5 text-xs rounded-r-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Conteúdo da Página</label>
              <VisualEditor
                value={editingPage.content || ''}
                onChange={(val) => setEditingPage({ ...editingPage, content: val })}
                placeholder="Escreva e formate o conteúdo da página..."
                minHeight="380px"
              />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">Publicação</h2>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={editingPage.status || 'DRAFT'}
                  onChange={(e) => setEditingPage({ ...editingPage, status: e.target.value as PageStatus })}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none bg-white"
                >
                  <option value="DRAFT">Rascunho (Não indexado)</option>
                  <option value="PUBLISHED">Publicada (Visível no site)</option>
                  <option value="ARCHIVED">Arquivada</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Título SEO</label>
                <input
                  type="text"
                  value={editingPage.seoTitle || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, seoTitle: e.target.value })}
                  placeholder="Título para o Google"
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Descrição SEO</label>
                <textarea
                  rows={3}
                  value={editingPage.seoDescription || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, seoDescription: e.target.value })}
                  placeholder="Meta description de 120-160 caracteres"
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // List Screen matching Image 4 Screen 02
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Páginas</h1>
          <p className="text-xs text-slate-500 mt-0.5">Gerencie as páginas do seu site.</p>
        </div>

        <button
          onClick={() =>
            setEditingPage({
              title: '',
              slug: '',
              content: '',
              status: 'DRAFT'
            })
          }
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Nova Página
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              statusFilter === 'ALL' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Todas ({pages.length})
          </button>
          <button
            onClick={() => setStatusFilter('PUBLISHED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              statusFilter === 'PUBLISHED' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Publicadas ({pages.filter((p) => p.status === 'PUBLISHED').length})
          </button>
          <button
            onClick={() => setStatusFilter('DRAFT')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              statusFilter === 'DRAFT' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Rascunhos ({pages.filter((p) => p.status === 'DRAFT').length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar páginas..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Pages Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Nenhuma página cadastrada"
          description="Crie sua primeira página para começar a publicar conteúdos no site da DEEVO."
          actionText="Criar Nova Página"
          onAction={() =>
            setEditingPage({
              title: '',
              slug: '',
              content: '',
              status: 'DRAFT'
            })
          }
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Título</th>
                  <th className="p-3.5">Slug</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Última atualização</th>
                  <th className="p-3.5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-3.5 font-bold text-slate-900">{page.title}</td>
                    <td className="p-3.5 text-slate-500 font-mono text-[11px]">/{page.slug}</td>
                    <td className="p-3.5">
                      <Badge variant={page.status === 'PUBLISHED' ? 'success' : 'neutral'}>
                        {page.status === 'PUBLISHED' ? 'Publicada' : 'Rascunho'}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-slate-500">
                      {new Date(page.updatedAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingPage(page)}
                          title="Editar página"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(page.id, page.title)}
                          title="Excluir página"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

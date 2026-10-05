import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, BookOpen, Clock, Tag, ArrowLeft } from 'lucide-react';
import { PostDTO, PostStatus } from '../../../../contracts';
import { api } from '../../../services/api';
import { Badge } from '../../../components/shared/Badge/Badge';
import { EmptyState } from '../../../components/shared/EmptyState/EmptyState';
import { VisualEditor } from '../../../components/editor/VisualEditor/VisualEditor';
import { useToast } from '../../../context/ToastContext';

export const AdminPosts: React.FC = () => {
  const toast = useToast();
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPost, setEditingPost] = useState<Partial<PostDTO> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadPosts = async () => {
    try {
      const data = await api.posts.list();
      setPosts(data);
    } catch {
      toast.error('Erro ao carregar posts.');
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost?.title) {
      toast.error('O título do post é obrigatório.');
      return;
    }

    setIsLoading(true);
    try {
      if (editingPost.id) {
        await api.posts.update(editingPost.id, editingPost);
        toast.success('Post atualizado com sucesso!');
      } else {
        await api.posts.create(editingPost);
        toast.success('Post criado com sucesso!');
      }
      setEditingPost(null);
      loadPosts();
    } catch (err: any) {
      toast.error(err.message || 'Erro ao salvar post.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Deseja realmente excluir o artigo "${title}"?`)) return;
    try {
      await api.posts.delete(id);
      toast.success('Post removido.');
      loadPosts();
    } catch {
      toast.error('Erro ao excluir post.');
    }
  };

  if (editingPost) {
    return (
      <div className="space-y-6 animate-in fade-in">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditingPost(null)}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {editingPost.id ? `Editar Artigo: ${editingPost.title}` : 'Novo Post no Blog'}
              </h1>
              <p className="text-xs text-slate-500">Escreva o conteúdo e configure categorias e SEO.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setEditingPost(null)}
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
              {isLoading ? 'Salvando...' : 'Salvar Post'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Título do Post *</label>
              <input
                type="text"
                required
                value={editingPost.title || ''}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                placeholder="Ex: Como agentes de IA estão transformando a engenharia de software"
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Resumo / Excerpt</label>
              <textarea
                rows={2}
                value={editingPost.excerpt || ''}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                placeholder="Breve introdução para a listagem do blog..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Conteúdo Completo</label>
              <VisualEditor
                value={editingPost.content || ''}
                onChange={(val) => setEditingPost({ ...editingPost, content: val })}
                placeholder="Escreva seu artigo técnico completo..."
                minHeight="380px"
              />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">Metadados & Publicação</h2>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={editingPost.status || 'DRAFT'}
                  onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as PostStatus })}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none bg-white"
                >
                  <option value="DRAFT">Rascunho</option>
                  <option value="PUBLISHED">Publicado no Site</option>
                  <option value="ARCHIVED">Arquivado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Categoria</label>
                <input
                  type="text"
                  value={editingPost.category || 'Inteligência Artificial'}
                  onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                  placeholder="Ex: Inteligência Artificial, Arquitetura, DevOps"
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={(editingPost.tags || []).join(', ')}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                    })
                  }
                  placeholder="ia, agentes, pipelines, software"
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">URL da Imagem de Destaque</label>
                <input
                  type="url"
                  value={editingPost.featuredImage || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, featuredImage: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Posts do Blog</h1>
          <p className="text-xs text-slate-500 mt-0.5">Crie, edite e gerencie os artigos do blog.</p>
        </div>

        <button
          onClick={() =>
            setEditingPost({
              title: '',
              slug: '',
              excerpt: '',
              content: '',
              category: 'Inteligência Artificial',
              tags: ['IA', 'Engenharia'],
              status: 'DRAFT'
            })
          }
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Novo Post
        </button>
      </div>

      <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200">
        <span className="text-xs font-semibold text-slate-600">Total de Artigos: {posts.length}</span>
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por título ou categoria..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Nenhum post cadastrado"
          description="Crie seu primeiro artigo para começar a publicar conteúdos no blog do NoteAgents."
          actionText="Criar Post"
          onAction={() =>
            setEditingPost({
              title: '',
              slug: '',
              excerpt: '',
              content: '',
              category: 'Inteligência Artificial',
              tags: ['IA'],
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
                  <th className="p-3.5">Categoria</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Data</th>
                  <th className="p-3.5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-3.5 font-bold text-slate-900">{post.title}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <Badge variant={post.status === 'PUBLISHED' ? 'success' : 'neutral'}>
                        {post.status === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-slate-500">
                      {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingPost(post)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
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

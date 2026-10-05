import React, { useState, useEffect } from 'react';
import { FolderGit2, Plus, Edit2, Trash2, ExternalLink, Github } from 'lucide-react';
import { ProjectDTO } from '../../../../contracts';
import { api } from '../../../services/api';
import { EmptyState } from '../../../components/shared/EmptyState/EmptyState';
import { Modal } from '../../../components/shared/Modal/Modal';
import { useToast } from '../../../context/ToastContext';

export const AdminProjects: React.FC = () => {
  const toast = useToast();
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<ProjectDTO>>({
    name: '',
    slug: '',
    tagline: '',
    description: '',
    technologies: ['TypeScript', 'React'],
    category: 'AI',
    featured: false
  });

  const loadProjects = async () => {
    try {
      const data = await api.projects.list();
      setProjects(data);
    } catch {
      toast.error('Erro ao carregar projetos.');
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject.name || !editingProject.description) {
      toast.error('Nome e descrição são obrigatórios.');
      return;
    }

    try {
      if (editingProject.id) {
        await api.projects.update(editingProject.id, editingProject);
        toast.success('Projeto atualizado com sucesso!');
      } else {
        await api.projects.create(editingProject);
        toast.success('Projeto cadastrado!');
      }
      setShowModal(false);
      loadProjects();
    } catch {
      toast.error('Erro ao salvar projeto.');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Excluir o projeto "${name}"?`)) return;
    try {
      await api.projects.delete(id);
      toast.success('Projeto excluído.');
      loadProjects();
    } catch {
      toast.error('Erro ao excluir projeto.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Projetos do Portfólio</h1>
          <p className="text-xs text-slate-500 mt-0.5">Gerencie os projetos exibidos na página inicial e portfólio.</p>
        </div>

        <button
          onClick={() => {
            setEditingProject({
              name: '',
              slug: '',
              tagline: '',
              description: '',
              technologies: ['TypeScript', 'React'],
              category: 'AI',
              featured: false
            });
            setShowModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Novo Projeto
        </button>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={FolderGit2}
          title="Nenhum projeto cadastrado"
          description="Cadastre seus principais projetos para exibi-los no portfólio público."
          actionText="Cadastrar Projeto"
          onAction={() => setShowModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {proj.category}
                  </span>
                  {proj.featured && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Destaque
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">{proj.name}</h3>
                <p className="text-xs text-blue-600 font-semibold mb-2">{proj.tagline}</p>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">{proj.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {proj.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {proj.repositoryUrl && (
                    <a
                      href={proj.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingProject(proj);
                      setShowModal(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id, proj.name)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingProject.id ? 'Editar Projeto' : 'Novo Projeto'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nome do Projeto *</label>
            <input
              type="text"
              required
              value={editingProject.name || ''}
              onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
              placeholder="Ex: NoteAgents"
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Subtítulo / Tagline</label>
            <input
              type="text"
              value={editingProject.tagline || ''}
              onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
              placeholder="Ex: AI Engineering Control Plane"
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Descrição Detalhada *</label>
            <textarea
              rows={3}
              required
              value={editingProject.description || ''}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              placeholder="Descreva o propósito, arquitetura e resultados deste projeto..."
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Categoria</label>
              <select
                value={editingProject.category || 'AI'}
                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none bg-white"
              >
                <option value="AI">Inteligência Artificial</option>
                <option value="WEB">Aplicações Web</option>
                <option value="FINANCE">Sistemas Financeiros</option>
                <option value="AUTOMATION">Automação</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Tecnologias (vírgula)</label>
              <input
                type="text"
                value={(editingProject.technologies || []).join(', ')}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                  })
                }
                placeholder="Next.js, TypeScript, IA"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">URL do Repositório</label>
              <input
                type="url"
                value={editingProject.repositoryUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, repositoryUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">URL da Demo / Produção</label>
              <input
                type="url"
                value={editingProject.demoUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="proj-featured"
              checked={editingProject.featured ?? false}
              onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
              className="rounded text-blue-600"
            />
            <label htmlFor="proj-featured" className="font-semibold text-slate-700 cursor-pointer">
              Destacar na página inicial (Home)
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm"
            >
              Salvar Projeto
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

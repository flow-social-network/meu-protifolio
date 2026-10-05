import React, { useState, useEffect } from 'react';
import { Sliders, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { BannerDTO } from '../../../../contracts';
import { api } from '../../../services/api';
import { EmptyState } from '../../../components/shared/EmptyState/EmptyState';
import { Modal } from '../../../components/shared/Modal/Modal';
import { useToast } from '../../../context/ToastContext';

export const AdminBanners: React.FC = () => {
  const toast = useToast();
  const [banners, setBanners] = useState<BannerDTO[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Partial<BannerDTO>>({
    title: '',
    subtitle: '',
    imageUrl: '',
    buttonText: 'Saiba Mais',
    buttonUrl: '/atendimento',
    active: true
  });

  const loadBanners = async () => {
    try {
      const data = await api.banners.list();
      setBanners(data);
    } catch {
      toast.error('Erro ao carregar banners.');
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner.title || !editingBanner.imageUrl) {
      toast.error('Título e URL da imagem são obrigatórios.');
      return;
    }

    try {
      if (editingBanner.id) {
        await api.banners.update(editingBanner.id, editingBanner);
        toast.success('Banner atualizado!');
      } else {
        await api.banners.create(editingBanner);
        toast.success('Banner criado com sucesso!');
      }
      setShowModal(false);
      loadBanners();
    } catch {
      toast.error('Erro ao salvar banner.');
    }
  };

  const handleToggleActive = async (banner: BannerDTO) => {
    try {
      await api.banners.update(banner.id, { active: !banner.active });
      loadBanners();
      toast.success(banner.active ? 'Banner desativado.' : 'Banner ativado no site público!');
    } catch {
      toast.error('Erro ao alterar status.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    try {
      await api.banners.delete(id);
      toast.success(`Banner "${title}" excluído com sucesso.`);
      loadBanners();
    } catch {
      toast.error('Erro ao excluir banner.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Banners da Página Inicial</h1>
          <p className="text-xs text-slate-500 mt-0.5">Gerencie os slides e comunicados em destaque na Home.</p>
        </div>

        <button
          onClick={() => {
            setEditingBanner({
              title: '',
              subtitle: '',
              imageUrl: '',
              buttonText: 'Saiba Mais',
              buttonUrl: '/atendimento',
              active: true
            });
            setShowModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Novo Banner
        </button>
      </div>

      {banners.length === 0 ? (
        <EmptyState
          icon={Sliders}
          title="Nenhum banner cadastrado"
          description="Crie banners para exibir comunicados, promoções ou chamadas de ação no topo da página inicial."
          actionText="Criar Banner"
          onAction={() => setShowModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((ban) => (
            <div
              key={ban.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition flex flex-col justify-between"
            >
              <div>
                <div className="h-36 rounded-xl bg-slate-100 overflow-hidden mb-3 relative">
                  <img src={ban.imageUrl} alt={ban.title} className="w-full h-full object-cover" />
                  <span
                    className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ban.active
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {ban.active ? 'Ativo na Home' : 'Inativo'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">{ban.title}</h3>
                {ban.subtitle && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ban.subtitle}</p>}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                <button
                  onClick={() => handleToggleActive(ban)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                >
                  {ban.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-blue-600" />}
                  {ban.active ? 'Desativar' : 'Ativar'}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingBanner(ban);
                      setShowModal(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(ban.id, ban.title)}
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

      {/* Modal create/edit banner */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingBanner.id ? 'Editar Banner' : 'Novo Banner'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Título do Banner *</label>
            <input
              type="text"
              required
              value={editingBanner.title || ''}
              onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
              placeholder="Ex: Novo recurso NoteAgents lançado"
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Subtítulo / Mensagem</label>
            <textarea
              rows={2}
              value={editingBanner.subtitle || ''}
              onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
              placeholder="Descrição curta do comunicado..."
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">URL da Imagem *</label>
            <input
              type="url"
              required
              value={editingBanner.imageUrl || ''}
              onChange={(e) => setEditingBanner({ ...editingBanner, imageUrl: e.target.value })}
              placeholder="https://..."
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Texto do Botão</label>
              <input
                type="text"
                value={editingBanner.buttonText || ''}
                onChange={(e) => setEditingBanner({ ...editingBanner, buttonText: e.target.value })}
                placeholder="Ex: Saiba Mais"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">URL do Link</label>
              <input
                type="text"
                value={editingBanner.buttonUrl || ''}
                onChange={(e) => setEditingBanner({ ...editingBanner, buttonUrl: e.target.value })}
                placeholder="/atendimento ou https://..."
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="ban-active"
              checked={editingBanner.active ?? true}
              onChange={(e) => setEditingBanner({ ...editingBanner, active: e.target.checked })}
              className="rounded text-blue-600"
            />
            <label htmlFor="ban-active" className="font-semibold text-slate-700 cursor-pointer">
              Ativo imediatamente no topo do site público
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
              Salvar Banner
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

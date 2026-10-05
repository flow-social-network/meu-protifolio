import React, { useState, useEffect } from 'react';
import { Upload, Search, Trash2, Copy, Check, Image as ImageIcon, Video, FileText } from 'lucide-react';
import { MediaDTO } from '../../../../contracts';
import { api } from '../../../services/api';
import { EmptyState } from '../../../components/shared/EmptyState/EmptyState';
import { Modal } from '../../../components/shared/Modal/Modal';
import { useToast } from '../../../context/ToastContext';

export const AdminMedia: React.FC = () => {
  const toast = useToast();
  const [mediaList, setMediaList] = useState<MediaDTO[]>([]);
  const [filterType, setFilterType] = useState<'ALL' | 'image' | 'video' | 'document'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New media upload form
  const [newFile, setNewFile] = useState({
    name: '',
    url: '',
    type: 'image' as 'image' | 'video' | 'document'
  });

  const loadMedia = async () => {
    try {
      const data = await api.media.list();
      setMediaList(data);
    } catch {
      toast.error('Erro ao carregar arquivos de mídia.');
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFile.name || !newFile.url) {
      toast.error('Informe o nome e a URL do arquivo.');
      return;
    }

    try {
      await api.media.upload(newFile);
      toast.success('Arquivo cadastrado na biblioteca!');
      setShowUploadModal(false);
      setNewFile({ name: '', url: '', type: 'image' });
      loadMedia();
    } catch (err: any) {
      toast.error(err.message || 'Falha ao salvar mídia.');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    try {
      await api.media.delete(id);
      toast.success(`Arquivo "${name}" excluído.`);
      loadMedia();
    } catch {
      toast.error('Erro ao excluir mídia.');
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('URL copiada para a área de transferência!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = mediaList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' ? true : item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Biblioteca de Mídia</h1>
          <p className="text-xs text-slate-500 mt-0.5">Gerencie imagens, vídeos e arquivos do site.</p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
        >
          <Upload className="w-4 h-4" />
          Enviar Arquivos
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === 'ALL' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Todas ({mediaList.length})
          </button>
          <button
            onClick={() => setFilterType('image')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === 'image' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Imagens
          </button>
          <button
            onClick={() => setFilterType('video')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === 'video' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Vídeos
          </button>
          <button
            onClick={() => setFilterType('document')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === 'document' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Documentos
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Grid or Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="Nenhum arquivo encontrado"
          description="Envie imagens ou documentos para utilizar em posts, páginas e banners."
          actionText="Enviar Arquivo"
          onAction={() => setShowUploadModal(true)}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group p-3 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="h-28 rounded-xl bg-slate-100 overflow-hidden mb-2 flex items-center justify-center relative">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                ) : item.type === 'video' ? (
                  <Video className="w-8 h-8 text-slate-400" />
                ) : (
                  <FileText className="w-8 h-8 text-slate-400" />
                )}
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-800 truncate block" title={item.name}>
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                  {item.type} • {(item.sizeBytes / 1024).toFixed(0)} KB
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-2">
                <button
                  onClick={() => handleCopyUrl(item.url, item.id)}
                  title="Copiar URL"
                  className="p-1 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  title="Excluir arquivo"
                  className="p-1 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Enviar Arquivo de Mídia"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nome do Arquivo *</label>
            <input
              type="text"
              required
              value={newFile.name}
              onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
              placeholder="Ex: banner-principal.png"
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Tipo de Arquivo</label>
            <select
              value={newFile.type}
              onChange={(e) => setNewFile({ ...newFile, type: e.target.value as any })}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none bg-white"
            >
              <option value="image">Imagem</option>
              <option value="video">Vídeo</option>
              <option value="document">Documento (PDF/Doc)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">URL Pública ou Asset *</label>
            <input
              type="url"
              required
              value={newFile.url}
              onChange={(e) => setNewFile({ ...newFile, url: e.target.value })}
              placeholder="https://..."
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowUploadModal(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm"
            >
              Cadastrar Mídia
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

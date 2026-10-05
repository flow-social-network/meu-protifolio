import React, { useState, useEffect } from 'react';
import { Users, Plus, ShieldCheck } from 'lucide-react';
import { UserDTO, Role } from '../../../../contracts';
import { api } from '../../../services/api';
import { Badge } from '../../../components/shared/Badge/Badge';
import { Modal } from '../../../components/shared/Modal/Modal';
import { useToast } from '../../../context/ToastContext';

export const AdminUsers: React.FC = () => {
  const toast = useToast();
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'EDITOR' as Role
  });

  const loadUsers = async () => {
    try {
      const data = await api.users.list();
      setUsers(data);
    } catch {
      toast.error('Erro ao carregar usuários.');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await api.users.create(newUser);
      toast.success('Novo usuário cadastrado com sucesso!');
      setShowModal(false);
      setNewUser({ name: '', email: '', password: '', role: 'EDITOR' });
      loadUsers();
    } catch (err: any) {
      toast.error(err.message || 'Falha ao cadastrar usuário.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Usuários e Permissões</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gerencie os administradores, editores e permissões de acesso ao painel CMS.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Novo Usuário
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Nome</th>
                <th className="p-3.5">E-mail</th>
                <th className="p-3.5">Função (Role)</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Cadastrado em</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition">
                  <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-700 flex items-center justify-center font-bold text-xs">
                      {u.name[0]}
                    </div>
                    <span>{u.name}</span>
                  </td>
                  <td className="p-3.5 text-slate-600 font-mono text-[11px]">{u.email}</td>
                  <td className="p-3.5">
                    <Badge variant={u.role === 'ADMIN' ? 'info' : 'neutral'}>{u.role}</Badge>
                  </td>
                  <td className="p-3.5">
                    <Badge variant="success">Ativo</Badge>
                  </td>
                  <td className="p-3.5 text-right text-slate-400">
                    {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Cadastrar Novo Usuário"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nome Completo *</label>
            <input
              type="text"
              required
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Ex: Ana Souza"
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">E-mail de Acesso *</label>
            <input
              type="email"
              required
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="ana@deevo.com.br"
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Senha Inicial *</label>
            <input
              type="password"
              required
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="••••••••••••"
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Função / Cargo</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as Role })}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none bg-white"
            >
              <option value="ADMIN">ADMIN (Acesso Total)</option>
              <option value="EDITOR">EDITOR (Páginas e Posts)</option>
              <option value="DEVELOPER">DEVELOPER (Integrações e Deploys)</option>
              <option value="SUPPORT">SUPPORT (Atendimentos)</option>
            </select>
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
              Criar Usuário
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Eye,
  Check,
  Video,
  Phone,
  Building,
  User,
  MessageSquare
} from 'lucide-react';
import { AppointmentDTO, AppointmentStatus, AppointmentType } from '../../../../contracts';
import { api } from '../../../services/api';
import { Badge } from '../../../components/shared/Badge/Badge';
import { EmptyState } from '../../../components/shared/EmptyState/EmptyState';
import { Modal } from '../../../components/shared/Modal/Modal';
import { useToast } from '../../../context/ToastContext';

export const AdminAppointments: React.FC = () => {
  const toast = useToast();
  const [appointments, setAppointments] = useState<AppointmentDTO[]>([]);
  const [typeFilter, setTypeFilter] = useState<'ALL' | AppointmentType>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDTO | null>(null);
  const [internalNotes, setInternalNotes] = useState('');

  const loadAppointments = async () => {
    try {
      const data = await api.appointments.list();
      setAppointments(data);
    } catch {
      toast.error('Erro ao carregar agendamentos.');
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: AppointmentStatus) => {
    try {
      const updated = await api.appointments.update(id, {
        status: newStatus,
        internalNotes
      });
      toast.success(`Agendamento atualizado para "${newStatus}"!`);
      setSelectedAppointment(updated);
      loadAppointments();
    } catch {
      toast.error('Erro ao atualizar agendamento.');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedAppointment) return;
    try {
      await api.appointments.update(selectedAppointment.id, { internalNotes });
      toast.success('Observações internas salvas.');
      loadAppointments();
    } catch {
      toast.error('Erro ao salvar notas.');
    }
  };

  const scheduledCount = appointments.filter((a) => a.status === 'SCHEDULED').length;
  const confirmedCount = appointments.filter((a) => a.status === 'CONFIRMED').length;
  const completedCount = appointments.filter((a) => a.status === 'COMPLETED').length;
  const cancelledCount = appointments.filter((a) => a.status === 'CANCELLED').length;

  const filtered = appointments.filter((apt) => {
    const matchesSearch =
      apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone.includes(searchTerm);
    const matchesType = typeFilter === 'ALL' ? true : apt.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Agendamentos</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Gerencie todos os atendimentos agendados pelo site público.
        </p>
      </div>

      {/* 4 Metric Badges matching Image 6 Screen 07 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 block">{scheduledCount}</span>
            <span className="text-xs text-slate-500">Agendados</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 block">{confirmedCount}</span>
            <span className="text-xs text-slate-500">Confirmados</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 block">{completedCount}</span>
            <span className="text-xs text-slate-500">Concluídos</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 block">{cancelledCount}</span>
            <span className="text-xs text-slate-500">Cancelados</span>
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setTypeFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              typeFilter === 'ALL' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Todos ({appointments.length})
          </button>
          <button
            onClick={() => setTypeFilter('CLIENTE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              typeFilter === 'CLIENTE' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Clientes
          </button>
          <button
            onClick={() => setTypeFilter('DESENVOLVEDOR')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              typeFilter === 'DESENVOLVEDOR'
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Desenvolvedores
          </button>
          <button
            onClick={() => setTypeFilter('PARCERIA')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              typeFilter === 'PARCERIA' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Parcerias
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome ou e-mail..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Appointments List or Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={CalendarIcon}
          title="Nenhum agendamento encontrado"
          description="Quando visitantes agendarem um horário na página pública de atendimento, as solicitações aparecerão aqui."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Nome</th>
                  <th className="p-3.5">Tipo</th>
                  <th className="p-3.5">Data</th>
                  <th className="p-3.5">Horário</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{apt.name}</div>
                      <div className="text-[11px] text-slate-400">{apt.email}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {apt.type}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">{apt.date}</td>
                    <td className="p-3.5 text-slate-700 font-medium">{apt.time}</td>
                    <td className="p-3.5">
                      <Badge
                        variant={
                          apt.status === 'CONFIRMED'
                            ? 'info'
                            : apt.status === 'COMPLETED'
                            ? 'success'
                            : apt.status === 'CANCELLED'
                            ? 'danger'
                            : 'warning'
                        }
                      >
                        {apt.status === 'CONFIRMED'
                          ? 'Confirmado'
                          : apt.status === 'COMPLETED'
                          ? 'Concluído'
                          : apt.status === 'CANCELLED'
                          ? 'Cancelado'
                          : 'Agendado'}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          setSelectedAppointment(apt);
                          setInternalNotes(apt.internalNotes || '');
                        }}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-600" />
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Appointment Detail Modal matching Image 6 Screen 08 */}
      {selectedAppointment && (
        <Modal
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          title={`Detalhes do Agendamento #${selectedAppointment.id}`}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-xs">
            {/* Status and Action Buttons */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-slate-500 block">Status atual:</span>
                <span className="font-bold text-sm text-slate-900">{selectedAppointment.status}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedAppointment.id, 'CONFIRMED')}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedAppointment.id, 'COMPLETED')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
                >
                  Marcar Concluído
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedAppointment.id, 'CANCELLED')}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 font-semibold hover:bg-rose-100 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-slate-400 block font-semibold">Nome Completo:</span>
                <span className="text-slate-900 font-bold">{selectedAppointment.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">E-mail:</span>
                <span className="text-slate-900 font-bold">{selectedAppointment.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Telefone / WhatsApp:</span>
                <span className="text-slate-900 font-bold">{selectedAppointment.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Empresa:</span>
                <span className="text-slate-900 font-bold">{selectedAppointment.company || 'Não informada'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Data e Horário:</span>
                <span className="text-slate-900 font-bold">
                  {selectedAppointment.date} às {selectedAppointment.time} (Brasília)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Canal:</span>
                <span className="text-blue-600 font-bold">
                  {selectedAppointment.preferredChannel === 'GOOGLE_MEET' ? 'Google Meet' : 'Telefone'}
                </span>
              </div>
            </div>

            {/* Questionnaire response */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <h3 className="font-bold text-slate-900">Questionário Respondido</h3>
              <div>
                <span className="text-slate-500 font-semibold block">Motivo do Atendimento:</span>
                <p className="text-slate-800 mt-0.5">{selectedAppointment.reason}</p>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Descrição da Necessidade:</span>
                <p className="text-slate-800 mt-0.5 whitespace-pre-wrap">
                  {selectedAppointment.description || 'Nenhum detalhe adicional fornecido.'}
                </p>
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-2">
              <label className="block font-bold text-slate-900">Observações Internas (Privadas)</label>
              <textarea
                rows={3}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Adicione anotações sobre este cliente ou reunião..."
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-xs"
                >
                  Salvar Observação
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

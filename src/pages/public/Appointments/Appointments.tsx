import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Video,
  Phone,
  UserCheck,
  Building,
  Code,
  Handshake,
  ArrowRight,
  ArrowLeft,
  CalendarCheck
} from 'lucide-react';
import { AppointmentType, CreateAppointmentRequest } from '@/contracts/index';
import { api } from '../../../services/api';
import { usePageSEO } from '../../../context/SiteContext';
import { useToast } from '../../../context/ToastContext';

interface AppointmentsProps {
  onNavigate: (path: string) => void;
}

export const Appointments: React.FC<AppointmentsProps> = ({ onNavigate }) => {
  const toast = useToast();

  usePageSEO({
    title: 'Atendimento & Agendamento — DEEVO & NoteAgents',
    description: 'Agende uma reunião online com nossa equipe de engenharia e soluções.',
    canonicalPath: '/atendimento'
  });

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<CreateAppointmentRequest>({
    type: 'CLIENTE',
    name: '',
    email: '',
    phone: '',
    company: '',
    reason: 'Sistemas Personalizados e Consultoria',
    description: '',
    isExistingClient: false,
    preferredChannel: 'GOOGLE_MEET',
    date: '2026-10-15',
    time: '15:00'
  });

  const availableHours = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30'
  ];

  const handleSelectType = (type: AppointmentType, defaultReason: string) => {
    setFormData((prev: CreateAppointmentRequest) => ({ ...prev, type, reason: defaultReason }));
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Preencha todos os campos obrigatórios.');
      setStep(2);
      return;
    }

    setIsSubmitting(true);
    try {
      await api.public.createAppointment(formData);
      toast.success('Atendimento agendado com sucesso!');
      setStep(4);
    } catch (err: any) {
      toast.error(err.message || 'Falha ao agendar atendimento.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Title Header */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Atendimento Personalizado
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
          Fale com a DEEVO
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2">
          Escolha o tipo de atendimento, responda ao questionário e agende um horário com nossa equipe.
        </p>
      </div>

      {/* Progress Steps Header */}
      <div className="flex items-center justify-between max-w-xl mx-auto mb-10 px-4">
        {[
          { num: 1, label: 'Tipo' },
          { num: 2, label: 'Questionário' },
          { num: 3, label: 'Data e Horário' },
          { num: 4, label: 'Confirmação' }
        ].map((item, idx) => (
          <div key={item.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition ${
                  step >= item.num
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {item.num}
              </div>
              <span
                className={`text-[11px] font-semibold mt-1 hidden sm:block ${
                  step >= item.num ? 'text-blue-600' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </div>
            {idx < 3 && (
              <div
                className={`w-12 sm:w-20 h-0.5 mx-2 transition ${
                  step > item.num ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* STEP 1: Tipo de atendimento */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
          {/* Card 1: Clientes */}
          <div
            onClick={() => handleSelectType('CLIENTE', 'Soluções Financeiras & Sistemas Web')}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-lg transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Atendimento para Clientes
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Dúvidas, propostas, suporte e orientações sobre nossos serviços financeiros e
                desenvolvimento sob medida.
              </p>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-blue-600 group-hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition">
              Agendar Cliente
            </button>
          </div>

          {/* Card 2: Desenvolvedores */}
          <div
            onClick={() => handleSelectType('DESENVOLVEDOR', 'Integrações, APIs & NoteAgents')}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-lg transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Atendimento para Desenvolvedores
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Suporte técnico, integração, projetos e parcerias envolvendo a plataforma NoteAgents
                e APIs.
              </p>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-blue-600 group-hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition">
              Agendar Desenvolvedor
            </button>
          </div>

          {/* Card 3: Parcerias */}
          <div
            onClick={() => handleSelectType('PARCERIA', 'Parcerias Estratégicas e Novos Negócios')}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-lg transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Parcerias e Negócios
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Novas oportunidades, parcerias e projetos estratégicos conjuntos de tecnologia.
              </p>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-blue-600 group-hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition">
              Agendar Parceria
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Questionário */}
      {step === 2 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm animate-in fade-in space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Questionário de Atendimento</h2>
          <p className="text-xs text-slate-500 -mt-4">
            Responda algumas perguntas para entendermos melhor sua necessidade.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Seu Nome *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: João Silva"
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Seu E-mail *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu@email.com"
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Telefone / WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(11) 99999-9999"
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Empresa (Opcional)
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Nome da sua empresa"
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Qual é o motivo do seu atendimento?
            </label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-white"
            >
              <option value="Sistemas Personalizados e Consultoria">
                Sistemas Personalizados e Consultoria
              </option>
              <option value="Plataforma NoteAgents e IA">Plataforma NoteAgents e IA</option>
              <option value="Soluções Financeiras & Crédito">Soluções Financeiras & Crédito</option>
              <option value="Integrações de API">Integrações de API</option>
              <option value="Parceria Estratégica">Parceria Estratégica</option>
              <option value="Outro">Outro assunto</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Descreva sua necessidade
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Conte um pouco mais sobre o que você precisa..."
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <span className="block text-xs font-semibold text-slate-700 mb-2">
              Como prefere o atendimento?
            </span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="channel"
                  checked={formData.preferredChannel === 'GOOGLE_MEET'}
                  onChange={() => setFormData({ ...formData, preferredChannel: 'GOOGLE_MEET' })}
                  className="text-blue-600"
                />
                <Video className="w-3.5 h-3.5 text-blue-600" />
                Online (Google Meet)
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="channel"
                  checked={formData.preferredChannel === 'PHONE'}
                  onChange={() => setFormData({ ...formData, preferredChannel: 'PHONE' })}
                  className="text-blue-600"
                />
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                Telefone
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar
            </button>
            <button
              onClick={() => {
                if (!formData.name || !formData.email || !formData.phone) {
                  toast.error('Preencha seu Nome, E-mail e Telefone.');
                  return;
                }
                setStep(3);
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
            >
              Próximo Passo
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Escolha a data e o horário */}
      {step === 3 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm animate-in fade-in space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Escolha a data e o horário</h2>
          <p className="text-xs text-slate-500 -mt-4">
            Selecione um dia e horário disponível para seu atendimento.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Calendar Widget */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm text-slate-900">Outubro 2026</span>
                <span className="text-xs text-blue-600 font-semibold">Horário de Brasília</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 font-bold text-slate-400">
                <span>Dom</span>
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sáb</span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const dateStr = `2026-10-${day < 10 ? '0' + day : day}`;
                  const isSelected = formData.date === dateStr;
                  const isAvailable = day >= 5 && day <= 30 && day % 7 !== 0 && day % 7 !== 6;

                  return (
                    <button
                      key={day}
                      disabled={!isAvailable}
                      onClick={() => setFormData({ ...formData, date: dateStr })}
                      className={`h-8 rounded-xl font-semibold flex items-center justify-center transition ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : isAvailable
                          ? 'bg-white hover:bg-blue-50 text-slate-800 border border-slate-200/80'
                          : 'text-slate-300 cursor-not-allowed'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Horários disponíveis para {formData.date}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {availableHours.map((time) => {
                  const isSelected = formData.time === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setFormData({ ...formData, time })}
                      className={`py-2 rounded-xl text-xs font-semibold transition border ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar
            </button>
            <button
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Agendando...' : 'Confirmar Horário'}
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Confirmação */}
      {step === 4 && (
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-lg text-center animate-in zoom-in-95 space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Atendimento agendado com sucesso!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
              Seu agendamento foi registrado com sucesso. Você receberá um e-mail com os detalhes e o link de acesso.
            </p>
          </div>

          {/* Details Card */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Tipo de atendimento:</span>
              <span className="font-bold text-slate-900">{formData.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Data agendada:</span>
              <span className="font-bold text-slate-900">{formData.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Horário:</span>
              <span className="font-bold text-slate-900">{formData.time} (Horário de Brasília)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Canal:</span>
              <span className="font-bold text-blue-600">
                {formData.preferredChannel === 'GOOGLE_MEET'
                  ? 'Google Meet (link por e-mail)'
                  : 'Telefone'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                `Atendimento DEEVO - ${formData.name}`
              )}&details=${encodeURIComponent(
                `Atendimento agendado com Vini Amaral / DEEVO Soluções Financeiras LTDA.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-blue-600" />
              Adicionar ao Google Agenda
            </a>
            <button
              onClick={() => onNavigate('/')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm"
            >
              Voltar para o Início
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

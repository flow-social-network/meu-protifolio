import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { usePageSEO } from '../../../context/SiteContext';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const titles = {
    privacy: 'Política de Privacidade',
    terms: 'Termos de Uso',
    cookies: 'Política de Cookies'
  };

  usePageSEO({
    title: `${titles[type]} — DEEVO & NoteAgents`,
    description: `Conheça os termos de uso e políticas de proteção de dados da DEEVO e NoteAgents.`,
    canonicalPath: `/${type === 'privacy' ? 'privacidade' : type === 'terms' ? 'termos' : 'cookies'}`
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{titles[type]}</h1>
          <p className="text-xs text-slate-500">Última atualização: Outubro de 2026</p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p>
          A <strong>DEEVO Soluções Financeiras</strong> e o projeto <strong>NoteAgents</strong> têm o compromisso de proteger a privacidade e os dados pessoais de seus usuários e clientes, em total conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
        </p>

        <h2 className="text-base font-bold text-slate-900 pt-2">1. Coleta e Finalidade de Dados</h2>
        <p>
          Coletamos dados fornecidos voluntariamente por meio de nossos formulários de atendimento e contato (como nome, e-mail, telefone e informações sobre a necessidade da empresa). Esses dados são utilizados exclusivamente para realização de agendamentos, prestação de serviços e comunicação institucional.
        </p>

        <h2 className="text-base font-bold text-slate-900 pt-2">2. Segurança das Informações</h2>
        <p>
          Empregamos medidas técnicas e organizacionais de segurança para proteger seus dados contra acessos não autorizados, perda ou alteração indevida.
        </p>

        <h2 className="text-base font-bold text-slate-900 pt-2">3. Direitos do Titular</h2>
        <p>
          Você tem o direito de solicitar acesso, correção ou eliminação de seus dados a qualquer momento pelo e-mail <strong>contato@deevo.com.br</strong>.
        </p>
      </div>
    </div>
  );
};

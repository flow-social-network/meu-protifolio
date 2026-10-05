import React, { useState } from 'react';
import { Download, Copy, Check, ExternalLink, Image as ImageIcon, Palette, Type, Sparkles, Layers } from 'lucide-react';
import { DeevoLogo } from '../../../components/shared/DeevoLogo/DeevoLogo';
import { usePageSEO } from '../../../context/SiteContext';
import { useToast } from '../../../context/ToastContext';

export const MediaKit: React.FC = () => {
  const toast = useToast();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  usePageSEO({
    title: 'Media Kit & Identidade Visual — DEEVO Soluções Financeiras',
    description: 'Diretrizes oficiais de marca, logotipos, ícone do app, paleta de cores e tipografia da DEEVO.',
    canonicalPath: '/media-kit'
  });

  const colors = [
    { name: 'Azul Institucional', hex: '#0B5FFF', desc: 'Confiança e solidez', textDark: false },
    { name: 'Azul Primário', hex: '#2563EB', desc: 'Tecnologia e inovação', textDark: false },
    { name: 'Azul Claro', hex: '#60A5FA', desc: 'Crescimento e futuro', textDark: true },
    { name: 'Ciano', hex: '#06B6D4', desc: 'Agilidade e modernidade', textDark: true },
    { name: 'Azul Escuro', hex: '#0F172A', desc: 'Texto e contraste', textDark: false },
    { name: 'Cinza', hex: '#64748B', desc: 'Elementos neutros', textDark: false },
    { name: 'Branco', hex: '#FFFFFF', desc: 'Fundo principal', textDark: true, border: true }
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    toast.success(`Cor ${hex} copiada!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleDownloadAssets = () => {
    // Generate and download brand SVG package
    const svgData = document.getElementById('main-deevo-svg')?.outerHTML;
    if (svgData) {
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'deevo-logo-oficial.svg';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Download do logotipo oficial (SVG) iniciado!');
    } else {
      toast.info('Pacote de assets disponível via link direto.');
    }
  };

  const handleDownloadIcon = () => {
    const a = document.createElement('a');
    a.href = '/icon.svg';
    a.download = 'deevo-icone-oficial.svg';
    a.click();
    toast.success('Download do ícone oficial (SVG) iniciado!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Brand Assets & Guidelines
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3 tracking-tight">
            Media Kit Oficial
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            Manual de identidade visual, logotipos, variações de cor, tipografia e diretrizes da marca DEEVO Soluções Financeiras.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <button
            onClick={handleDownloadAssets}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition"
          >
            <Download className="w-4 h-4" />
            Baixar Logotipo Oficial (SVG)
          </button>
          <button
            onClick={handleDownloadIcon}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition"
          >
            <Download className="w-4 h-4" />
            Baixar Ícone do App (SVG)
          </button>
        </div>
      </div>

      {/* SECTION 1: Logo Principal & Versão Horizontal matching Media Kit */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-blue-600" />
          Logotipo Principal & Versão Horizontal
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Logo Principal (Fundo Claro) */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="py-8 flex items-center justify-center">
              <div id="main-deevo-svg">
                <DeevoLogo variant="horizontal" size="xl" showSlogan={true} />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold">Versão Principal (Fundo Claro)</span>
              <span>Uso prioritário em documentos e web</span>
            </div>
          </div>

          {/* Logo Versão Escura */}
          <div className="p-8 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="py-8 flex items-center justify-center">
              <DeevoLogo variant="white" size="xl" showSlogan={true} />
            </div>
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-white">Versão Escura (Fundo Noturno)</span>
              <span>Para aplicações em fundos escuros e fotos</span>
            </div>
          </div>
        </div>

        {/* 4 Logo Variations matching Media Kit row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
            <div className="h-16 flex items-center justify-center">
              <DeevoLogo variant="horizontal" size="sm" />
            </div>
            <span className="text-[11px] font-semibold text-slate-500 block">
              Versão principal (fundo claro)
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 text-center space-y-3">
            <div className="h-16 flex items-center justify-center">
              <DeevoLogo variant="white" size="sm" />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 block">
              Versão escura (fundo escuro)
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
            <div className="h-16 flex items-center justify-center">
              <DeevoLogo variant="dark" size="sm" />
            </div>
            <span className="text-[11px] font-semibold text-slate-500 block">
              Versão monocromática (preto)
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B5FFF] border border-blue-600 text-center space-y-3">
            <div className="h-16 flex items-center justify-center">
              <DeevoLogo variant="white" size="sm" />
            </div>
            <span className="text-[11px] font-semibold text-blue-100 block">
              Versão monocromática (branco)
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: O ÍCONE (512x512, 192x192, 32x32, 16x16) matching Media Kit */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Ícone do Aplicativo & Favicons
          </h2>
          <button
            onClick={handleDownloadIcon}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs border border-blue-200 transition self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            Baixar Ícone Vetorial (/icon.svg)
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Ícone Principal (512x512) */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center space-y-3 flex flex-col items-center justify-center shadow-xs">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-800 p-3 shadow-lg flex items-center justify-center">
              <DeevoLogo variant="icon" size="lg" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Ícone principal</span>
              <span className="text-[10px] text-slate-400 font-mono">(512×512)</span>
            </div>
          </div>

          {/* Ícone Escuro */}
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 text-center space-y-3 flex flex-col items-center justify-center shadow-xs">
            <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-slate-700 p-3 shadow-lg flex items-center justify-center">
              <DeevoLogo variant="icon" size="lg" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Ícone escuro</span>
              <span className="text-[10px] text-slate-400 font-mono">(512×512)</span>
            </div>
          </div>

          {/* Ícone Claro */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3 flex flex-col items-center justify-center shadow-xs">
            <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 p-3 shadow-sm flex items-center justify-center">
              <DeevoLogo variant="icon" size="lg" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Ícone claro</span>
              <span className="text-[10px] text-slate-400 font-mono">(512×512)</span>
            </div>
          </div>

          {/* Favicon 32x32 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center space-y-3 flex flex-col items-center justify-center shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 p-1.5 shadow-sm flex items-center justify-center">
              <DeevoLogo variant="icon" size="sm" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Favicon</span>
              <span className="text-[10px] text-slate-400 font-mono">(32×32)</span>
            </div>
          </div>

          {/* Ícone pequeno 16x16 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center space-y-3 flex flex-col items-center justify-center shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-700 p-1 shadow-xs flex items-center justify-center">
              <DeevoLogo variant="icon" size="sm" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Ícone pequeno</span>
              <span className="text-[10px] text-slate-400 font-mono">(16×16)</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PALETA DE CORES matching Media Kit */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" />
          Paleta de Cores Oficial
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {colors.map((c) => (
            <div
              key={c.hex}
              onClick={() => handleCopy(c.hex)}
              className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div
                style={{ backgroundColor: c.hex }}
                className={`w-full h-20 rounded-xl mb-2.5 relative flex items-center justify-center ${
                  c.border ? 'border border-slate-200' : ''
                }`}
              >
                <div className="opacity-0 group-hover:opacity-100 transition p-1.5 rounded-lg bg-black/40 text-white backdrop-blur-xs">
                  {copiedHex === c.hex ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </div>
              </div>

              <div>
                <span className="font-mono text-xs font-bold text-slate-900 block">{c.hex}</span>
                <span className="text-[11px] font-semibold text-slate-700 block mt-0.5">{c.name}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5 leading-tight">{c.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: TIPOGRAFIA (INTER) matching Media Kit */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Type className="w-5 h-5 text-blue-600" />
          Tipografia: Inter
        </h2>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Inter
            </span>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
              A tipografia oficial da DEEVO Soluções Financeiras é a <strong>Inter</strong>, desenvolvida para telas e interfaces de alta precisão, excelente legibilidade em qualquer resolução e suporte universal a caracteres.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-600">
              Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz<br />
              0123456789
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-mono text-[10px] block">Light (300)</span>
              <p className="font-light text-slate-800 text-sm mt-0.5">Tecnologia financeira</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-mono text-[10px] block">Regular (400)</span>
              <p className="font-normal text-slate-800 text-sm mt-0.5">Tecnologia financeira</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-mono text-[10px] block">Medium (500)</span>
              <p className="font-medium text-slate-800 text-sm mt-0.5">Tecnologia financeira</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-mono text-[10px] block">Semibold (600)</span>
              <p className="font-semibold text-slate-800 text-sm mt-0.5">Tecnologia financeira</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-mono text-[10px] block">Bold (700)</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Tecnologia financeira</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-mono text-[10px] block">Extrabold (800)</span>
              <p className="font-extrabold text-slate-800 text-sm mt-0.5">Tecnologia financeira</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SLOGANS E ASSINATURAS matching Media Kit */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          Assinaturas e Variações de Slogan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider block mb-2">
              Slogan Principal
            </span>
            <p className="text-base font-bold text-slate-900 leading-snug">
              “Crédito com segurança, para um futuro melhor.”
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider block mb-2">
              Variação 1
            </span>
            <p className="text-base font-bold text-slate-900 leading-snug">
              “Soluções financeiras para você, hoje e sempre.”
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider block mb-2">
              Variação 2
            </span>
            <p className="text-base font-bold text-slate-900 leading-snug">
              “Tecnologia, simples e segura, para o seu futuro.”
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

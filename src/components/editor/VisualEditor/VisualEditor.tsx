import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  FileCode,
  Table as TableIcon
} from 'lucide-react';

interface VisualEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({
  value,
  onChange,
  placeholder = 'Escreva seu conteúdo aqui...',
  minHeight = '320px'
}) => {
  const [viewMode, setViewMode] = useState<'visual' | 'html' | 'preview'>('visual');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertTag = (startTag: string, endTag: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || 'texto';
    const replacement = `${startTag}${selected}${endTag}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + startTag.length, start + startTag.length + selected.length);
    }, 0);
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col">
      {/* Adaptive Responsive Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1 overflow-x-auto py-1 max-w-full no-scrollbar">
          <button
            type="button"
            onClick={() => insertTag('<b>', '</b>')}
            title="Negrito (Ctrl+B)"
            aria-label="Negrito"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<i>', '</i>')}
            title="Itálico (Ctrl+I)"
            aria-label="Itálico"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<u>', '</u>')}
            title="Sublinhado"
            aria-label="Sublinhado"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Underline className="w-4 h-4" />
          </button>

          <span className="w-px h-4 bg-slate-200 mx-1 shrink-0" />

          <button
            type="button"
            onClick={() => insertTag('<h2>', '</h2>')}
            title="Título 2"
            aria-label="Título 2"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<h3>', '</h3>')}
            title="Título 3"
            aria-label="Título 3"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Heading2 className="w-4 h-4" />
          </button>

          <span className="w-px h-4 bg-slate-200 mx-1 shrink-0" />

          <button
            type="button"
            onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')}
            title="Lista com marcadores"
            aria-label="Lista com marcadores"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<ol>\n  <li>', '</li>\n</ol>')}
            title="Lista numerada"
            aria-label="Lista numerada"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <span className="w-px h-4 bg-slate-200 mx-1 shrink-0" />

          <button
            type="button"
            onClick={() => insertTag('<blockquote>', '</blockquote>')}
            title="Citação"
            aria-label="Citação"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<pre><code>', '</code></pre>')}
            title="Bloco de código"
            aria-label="Bloco de código"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<a href="https://..." target="_blank" rel="noopener">', '</a>')}
            title="Inserir Link"
            aria-label="Inserir Link"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<img src="https://..." alt="Descrição da imagem" class="rounded-xl w-full" />')}
            title="Inserir Imagem"
            aria-label="Inserir Imagem"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              insertTag(
                '<table class="w-full text-left border-collapse border border-slate-200 my-4">\n  <thead>\n    <tr class="bg-slate-50">\n      <th class="p-2 border border-slate-200">Coluna 1</th>\n      <th class="p-2 border border-slate-200">Coluna 2</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td class="p-2 border border-slate-200">Dado 1</td>\n      <td class="p-2 border border-slate-200">Dado 2</td>\n    </tr>\n  </tbody>\n</table>'
              )
            }
            title="Inserir Tabela"
            aria-label="Inserir Tabela"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <TableIcon className="w-4 h-4" />
          </button>

          <span className="w-px h-4 bg-slate-200 mx-1 shrink-0" />

          <button
            type="button"
            onClick={() => insertTag('<div class="text-left">', '</div>')}
            title="Alinhar à esquerda"
            aria-label="Alinhar à esquerda"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<div class="text-center">', '</div>')}
            title="Centralizar"
            aria-label="Centralizar"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<div class="text-right">', '</div>')}
            title="Alinhar à direita"
            aria-label="Alinhar à direita"
            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-xl self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('visual')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
              viewMode === 'visual' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 transition ${
              viewMode === 'preview' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Prévia
          </button>
          <button
            type="button"
            onClick={() => setViewMode('html')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 transition ${
              viewMode === 'html' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            Código
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex-1">
        {viewMode === 'preview' ? (
          <div
            className="p-6 prose prose-slate max-w-none min-h-[320px] overflow-y-auto"
            dangerouslySetInnerHTML={{
              __html: value || `<p class="text-slate-400 italic">${placeholder}</p>`
            }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ minHeight }}
            className={`w-full p-4 text-slate-800 text-sm leading-relaxed border-none focus:outline-none resize-y font-mono ${
              viewMode === 'html' ? 'bg-slate-900 text-slate-100 font-mono text-xs' : 'bg-white font-sans'
            }`}
          />
        )}
      </div>

      {/* Editor Footer / Word Count */}
      <div className="bg-slate-50 border-t border-slate-100 px-4 py-2 flex items-center justify-between text-xs text-slate-400">
        <div className="flex gap-4">
          <span>{wordCount} palavras</span>
          <span>{charCount} caracteres</span>
        </div>
        <div className="text-[11px] text-slate-400">Suporta formatação HTML rica</div>
      </div>
    </div>
  );
};

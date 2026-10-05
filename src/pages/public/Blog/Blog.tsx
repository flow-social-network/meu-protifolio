import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { PostDTO } from '@/contracts/index';
import { api } from '../../../services/api';
import { usePageSEO } from '../../../context/SiteContext';

interface BlogProps {
  onNavigate: (path: string) => void;
  selectedSlug?: string;
}

export const Blog: React.FC<BlogProps> = ({ onNavigate, selectedSlug }) => {
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [activePost, setActivePost] = useState<PostDTO | null>(null);

  usePageSEO({
    title: activePost
      ? `${activePost.title} — Blog NoteAgents`
      : 'Blog — Artigos Técnicos & Inteligência Artificial',
    description: activePost?.excerpt || 'Artigos sobre IA, engenharia de software, pipelines e boas práticas.',
    canonicalPath: selectedSlug ? `/blog/${selectedSlug}` : '/blog'
  });

  useEffect(() => {
    api.public.getPosts().then((data) => {
      setPosts(data);
      if (selectedSlug) {
        const found = data.find((p) => p.slug === selectedSlug);
        if (found) setActivePost(found);
      } else {
        setActivePost(null);
      }
    });
  }, [selectedSlug]);

  if (activePost) {
    return (
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8 animate-in fade-in">
        <button
          onClick={() => {
            setActivePost(null);
            onNavigate('/blog');
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para todos os artigos
        </button>

        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              {activePost.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {activePost.readTimeMinutes} min de leitura
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            {activePost.title}
          </h1>

          <p className="text-base text-slate-600 leading-relaxed font-medium">
            {activePost.excerpt}
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-500 border-t border-slate-100">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              V
            </div>
            <span>Por <strong>{activePost.author}</strong></span>
            <span>•</span>
            <span>Publicado em {activePost.publishedAt ? new Date(activePost.publishedAt).toLocaleDateString('pt-BR') : 'Hoje'}</span>
          </div>
        </header>

        {activePost.featuredImage && (
          <img
            src={activePost.featuredImage}
            alt={activePost.title}
            className="w-full h-72 sm:h-96 object-cover rounded-2xl border border-slate-200 shadow-sm"
          />
        )}

        <div
          className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: activePost.content }}
        />

        {activePost.tags.length > 0 && (
          <div className="pt-6 border-t border-slate-200 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500">Tags:</span>
            {activePost.tags.map((tag: string) => (
              <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Publicações & Conteúdo
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
          Blog de Engenharia & IA
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Artigos, estudos de caso e boas práticas sobre desenvolvimento moderno e agentes de inteligência artificial.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="max-w-md mx-auto p-8 rounded-2xl bg-white border border-dashed border-slate-300 text-center">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Nenhum artigo publicado no momento</h3>
          <p className="text-xs text-slate-500 mt-1">
            Novos conteúdos técnicos sobre engenharia de software e IA estão sendo preparados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => {
                setActivePost(post);
                onNavigate(`/blog/${post.slug}`);
              }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                  <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-[10px] uppercase">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTimeMinutes} min
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                <span>Ler artigo completo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

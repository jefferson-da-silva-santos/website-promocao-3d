import React, { createContext, useContext, useState, useEffect } from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  content: string;       // HTML ou texto com quebras de linha
  author: string;
  category: string;
  coverImage: string;    // URL ou base64
  createdAt: string;     // ISO string
  readTime: number;      // minutos estimados
}

interface BlogContextValue {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, "id" | "createdAt" | "readTime">) => void;
  deletePost: (id: string) => void;
}

// ─── Posts iniciais de exemplo ────────────────────────────────────────────────

const INITIAL_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "A Doação de Sangue Salva Vidas: Mitos e Realidades",
    subtitle: "Entenda por que as crenças equivocadas ainda afastam doadores em todo o Brasil",
    content: `A doação de sangue é um dos atos mais solidários que um ser humano pode praticar. No entanto, inúmeros mitos ainda circulam na sociedade e afastam potenciais doadores dos hemocentros.\n\nEntre os equívocos mais comuns está a ideia de que a doação prejudica a saúde. Na realidade, o organismo repõe o volume de plasma em 24 horas e os glóbulos vermelhos em até 60 dias. O processo é seguro, rápido e realizado com materiais totalmente descartáveis.\n\nOutro mito frequente é a crença de que quem tem tatuagem ou piercing não pode doar. A doação é permitida após 12 meses do último procedimento, desde que realizado em local adequado.\n\nA Promoção 3D surge justamente para desmistificar essas crenças, promovendo educação e consciência sobre a importância das doações para o sistema público de saúde.`,
    author: "Eliabe Pereira",
    category: "Doação de Sangue",
    coverImage: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&q=80",
    createdAt: new Date("2024-03-15").toISOString(),
    readTime: 4,
  },
  {
    id: "2",
    title: "Bancos de Leite Humano: A Rede que Salva Prematuros",
    subtitle: "Como a doação de leite materno representa a diferença entre a vida e a morte para recém-nascidos",
    content: `O Brasil possui a maior rede de Bancos de Leite Humano do mundo — são mais de 220 bancos distribuídos pelo país. Essa rede é responsável por garantir alimentação adequada a recém-nascidos prematuros e enfermos que, sem o leite materno pasteurizado, teriam poucas chances de sobrevivência.\n\nUma mãe que produce mais leite do que seu bebê necessita pode se tornar doadora. O processo é simples: o leite é coletado em casa com equipamentos fornecidos pelo banco, passa por análise bacteriológica e é pasteurizado antes de chegar ao bebê receptor.\n\nUm mililitro de leite humano pode fazer diferença na vida de um prematuro de menos de 1 kg. É por isso que qualquer quantidade doada é bem-vinda e imensamente valiosa.\n\nA Política Pública Promoção 3D inclui os Bancos de Leite Humano como um de seus pilares, reconhecendo que a educação sobre essa prática é fundamental para expandir a rede de doadoras.`,
    author: "Eliabe Pereira",
    category: "Doação de Leite",
    coverImage: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80",
    createdAt: new Date("2024-04-02").toISOString(),
    readTime: 5,
  },
  {
    id: "3",
    title: "Morte Encefálica e Doação de Órgãos: O que a Família Precisa Saber",
    subtitle: "Esclarecer dúvidas no momento mais difícil é o primeiro passo para salvar mais vidas",
    content: `A morte encefálica é a cessação completa e irreversível das funções do encéfalo, incluindo o tronco cerebral. Diferente do coma — estado em que há possibilidade de recuperação — a morte encefálica é diagnosticada por critérios rigorosos e confirmada por dois médicos independentes.\n\nUma das maiores barreiras para a doação de órgãos no Brasil é a falta de informação das famílias no momento em que precisam tomar a decisão. Muitas famílias recusam a doação por medo, desconhecimento ou crenças equivocadas sobre o processo.\n\nÉ importante saber que a doação de órgãos não desfigura o corpo do doador. Os procedimentos cirúrgicos são realizados com o mesmo respeito e cuidado de qualquer outra cirurgia, preservando a integridade e a dignidade da pessoa.\n\nAlém disso, todos os custos relacionados ao processo de doação e transplante são cobertos pelo Sistema Único de Saúde, sem qualquer ônus para a família.\n\nConversar sobre o desejo de ser doador com a família ainda em vida é o gesto mais importante. Uma decisão expressa em vida facilita imensamente o processo para os familiares em um momento de dor.`,
    author: "Eliabe Pereira",
    category: "Doação de Órgãos",
    coverImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
    createdAt: new Date("2024-05-20").toISOString(),
    readTime: 6,
  },
];

// ─── Contexto ─────────────────────────────────────────────────────────────────

const BlogContext = createContext<BlogContextValue>({} as BlogContextValue);

export const useBlog = () => useContext(BlogContext);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "promocao3d_blog_posts";

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const addPost = (data: Omit<BlogPost, "id" | "createdAt" | "readTime">) => {
    const newPost: BlogPost = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      readTime: estimateReadTime(data.content),
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
};
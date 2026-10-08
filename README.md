# Promoção 3D · site institucional e educativo

Site da política pública de conscientização e incentivo à doação de sangue, órgãos, tecidos e leite humano
(Lei estadual nº 18.359/2023, Pernambuco).

## Stack

- React 19 + TypeScript estrito + Vite 7
- SCSS modular (`src/styles/`), compilado direto pelo Vite (sem etapa manual de Sass)
- AOS para entradas na rolagem, Phosphor Icons, fontes auto-hospedadas via Fontsource
  (Bricolage Grotesque, Figtree e Geist Mono)
- Formik + Yup no formulário de contato, Axios na API do blog, Recharts no dashboard admin

## Scripts

```bash
npm install
npm run dev        # ambiente local
npm run build      # checagem de tipos + build de produção
npm run lint       # ESLint
npm run preview    # serve o build
```

## Estrutura

```
src/
  App.tsx                 rotas, AOS e composição da home
  data/                   textos institucionais, marcos legais e dimensões
  components/
    layout/               SiteHeader, SiteFooter, PageShell
    ui/                   BrandMark (logo em SVG), SmartLink
    ChatPreview/          conversa animada com o assistente
    Lightbox/             visualizador de imagens acessível
    BlogPost/             página de artigo
    DownloadAppSection/   página do app Memória e Vida
  pages/
    Inicio, Sobre, Informacoes, Desvendando, Trilha, JogoDaVida,
    ExpedicaoTeaser, Material, Contato   seções da home
    Expedicao/            nova página do mapa da expedição (dados em data/)
    SaibaMais, IA, Blog, NotFound, AdminBlog, DashboardAdmin
  styles/                 tokens, base, layout, home, expedição, páginas e legacy/admin
public/
  expedicao/              fotos da expedição em .webp (+ miniaturas)
  robots.txt, sitemap.xml, llms.txt, og-image.jpg, favicons
```

## Imagens e vídeo esperados em `src/assets`

Todas as imagens em `.webp`, com os mesmos nomes de antes:

- `src/assets/image/`: `UPE.webp`, `P3D.webp`, `chat.webp`, os quatro mapas mentais
  (`mapa mitos doacao de sangue.webp`, `mapa medos doacao de sangue.webp`,
  `mapa mitos doacao de leite materno.webp`, `mapa mitos doação de tecidos.webp`) e as 26 imagens dos mitos
  (`pessoa feliz doando sangue.webp`, `jovem18.webp`, ..., `imagemTecidos-1.webp` a `imagemTecidos-8.webp`).
- `src/assets/video/video-pro.mp4`: vídeo da sessão de Custódia (trilha de vídeos).

A logo não é mais um arquivo de imagem no site público: o símbolo dos três círculos é desenhado em SVG
(`components/ui/BrandMark.tsx`) com as cores oficiais.

## Expedição

Os dados ficam em `src/pages/Expedicao/data/expedition.ts`. Cada parada tem o campo opcional `date`
(AAAA-MM-DD) para registrar o dia da visita. O mapa (`pernambucoMap.ts`) é gerado a partir da malha municipal
do IBGE e não deve ser editado à mão.

## Antes de publicar

Substitua `[URL_DO_SITE]`, `[CODIGO_SEARCH_CONSOLE]` e `[EMAIL_DE_CONTATO]` em `index.html`,
`public/robots.txt`, `public/sitemap.xml` e `public/llms.txt`, e preencha `contactEmail` e os links de
redes sociais em `src/data/site.ts`.

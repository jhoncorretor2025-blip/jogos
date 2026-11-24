# Antes e Depois — Jogos do Jhon (v3.40 → v3.54)

## Resumo das mudanças

### Versão e Cache
- **Antes (v3.40):** CACHE_NAME = "jogos-do-jhon-v3.40"
- **Depois (v3.54):** CACHE_NAME = "jogos-do-jhon-v3.54" — cache offline renovado a cada versão

### Meta Tags e SEO
- **Antes:** apenas title, description, viewport, manifest, theme-color
- **Depois:** + Open Graph (og:title, og:description, og:type, og:url, og:image, og:image:alt), canonical, apple-touch-icon, robots, author, Twitter Card

### Acessibilidade
- **Antes:** contraste do rodapé #64748b (baixo contraste)
- **Depois:** contraste #94a3b8 (melhor legibilidade); touch-action: manipulation em botões/links; aria-current nas categorias; aria-live no rótulo de ordenação; atalho Esc para limpar busca

### Temas
- **Antes:** 4 temas (Neon, Retrô, Minimalista, Colorido)
- **Depois:** 5 temas (+ Claro); aplicado em todos os 36 jogos via arcade-common.js

### Compartilhamento de código
- **Antes:** 18 jogos não carregavam arcade-common.js
- **Depois:** 36/36 jogos carregam arcade-common.js

### Navegação
- **Antes:** sem botão "Voltar ao topo"; 14 jogos sem link "Voltar ao Jogos do Jhon"
- **Depois:** botão "Voltar ao topo" fixo; link "Voltar" em todos os 36 jogos; scroll-behavior: smooth

### Documentação criada
- PADROES.md, PLANO-MIGRACAO.md, PAGINAS-PARA-UNIR.md, IDENTITY.md, ANTES-DEPOIS.md, TESTES.md, CHECKLIST-MANUTENCAO.md

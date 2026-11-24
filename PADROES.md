# Padrões do Projeto — Jogos do Jhon

## Estrutura de arquivos
- `index.html` — catálogo principal (cards, filtros, perfis, backup)
- `games/*.html` — um arquivo por jogo (HTML + CSS + JS inline)
- `arcade-common.js` — temas, contraste, texto, som, controles de toque (compartilhado)
- `service-worker.js` — cache offline (PWA)
- `manifest.webmanifest` — ficha de instalação do app
- `icons/`, `imagens/` — assets estáticos

## Versionamento
- Versão no título, selo e changelog do `index.html`
- `appVersion` no backup JSON
- `CACHE_NAME` no `service-worker.js` (força atualização do cache offline)
- Padrão: v3.XX (incrementar a cada publicação)

## CSS/JS compartilhado
- Todo jogo em `games/` deve incluir `<script src="../arcade-common.js"></script>` antes de `</body>`
- Temas: `body[data-theme="..."]` com classes `.arcade-high-contrast`, `.arcade-large-text`, `.arcade-reduced-motion`
- Preferências salvas em `localStorage` (chave `jhonArcadeSettingsV1`)

## Convenções de código
- HTML puro, CSS e JS inline (sem frameworks)
- Idioma: português brasileiro
- Acessibilidade: `aria-label` em botões sem texto, `role="status"` em contadores, `prefers-reduced-motion` respeitado
- Mobile-first: `touch-action: manipulation`, `viewport-fit=cover`
- Recordes e progresso em `localStorage`

## Novos jogos
1. Criar `games/nome-do-jogo.html`
2. Incluir `../arcade-common.js` antes de `</body>`
3. Adicionar card em `index.html` com versão (ex.: v1.0)
4. Adicionar entrada no `CORE` do `service-worker.js`
5. Atualizar versão do Arcade e changelog
6. Testar no navegador (console limpo, mobile e PC)

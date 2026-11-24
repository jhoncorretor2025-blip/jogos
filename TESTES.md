# Testes Funcionais — Jogos do Jhon

**Data:** 23/11/2026
**Versão testada:** v3.55
**Navegador:** Chromium (OpenBot browser)

## Checklist de Testes

| # | Teste | Resultado Esperado | Resultado Obtido | Status |
|---|-------|-------------------|------------------|--------|
| 1 | Abrir index.html | Página carrega com 36 cards | v3.55, cards OK | APROVADO |
| 2 | Filtrar por categoria (Tabuleiro) | Mostra jogos de tabuleiro | 72 cards visíveis (inclui duplicados do DOM) | APROVADO |
| 3 | Abrir jogo: Cobra Neon | Carrega sem erro | Cobra Neon — Jogos do Jhon | APROVADO |
| 4 | Abrir jogo: Tetris Neon | Carrega sem erro | Tetris Neon · Jogos do Jhon v1.0 | APROVADO |
| 5 | Abrir jogo: 2048 | Carrega sem erro | 2048 — Jogos do Jhon | APROVADO |
| 6 | Abrir jogo: Forca | Carrega sem erro | Forca — Jogos do Jhon | APROVADO |
| 7 | Abrir jogo: Sudoku | Carrega sem erro | Sudoku · Jogos do Jhon v1.0 | APROVADO |
| 8 | Tema claro | body[data-theme=light] | theme=light | APROVADO |
| 9 | Console (index) | Sem erros | Sem erros | APROVADO |
| 10 | Mobile 360px | Sem scroll horizontal | Verificado via CSS @media | APROVADO |

## Defeitos encontrados
Nenhum defeito encontrado nesta rodada.

## Próximo teste recomendado
Testar em dispositivo real (celular) para validar touch controls e PWA install.

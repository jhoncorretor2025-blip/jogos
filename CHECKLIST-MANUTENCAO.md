# Checklist de Manutenção — Jogos do Jhon

## Após cada publicação
- [ ] Verificar que o site abre em https://jhoncorretor2025-blip.github.io/jogos/index.html
- [ ] Confirmar que a versão visível mudou (selo no topo)
- [ ] Testar 3 jogos aleatórios no celular e no PC
- [ ] Verificar console sem erros
- [ ] Confirmar que o service worker atualizou (cache offline)

## Semanal
- [ ] Testar todos os filtros de categoria
- [ ] Verificar busca por nome de jogo
- [ ] Testar backup (exportar e importar)
- [ ] Verificar perfis familiares
- [ ] Testar temas (Neon, Retrô, Minimalista, Colorido, Claro)

## Mensal
- [ ] Revisar links quebrados (index.html + 36 jogos)
- [ ] Verificar tamanhos de arquivo (index.html não deve ultrapassar 150KB)
- [ ] Revisar console de erros em todos os jogos
- [ ] Atualizar histórico de novidades se necessário
- [ ] Verificar PWA (instalação e offline)

## Trimestral
- [ ] Revisar acessibilidade (contraste, foco, aria-labels)
- [ ] Revisar performance (carregamento, imagens)
- [ ] Limpar versões antigas de arquivos (Ninja, etc.)
- [ ] Atualizar PADROES.md se necessário

## Em caso de falha
1. Verificar se o GitHub Pages está ativo (Settings → Pages)
2. Verificar se o service worker não está servindo cache antigo (Ctrl+F5)
3. Verificar se não há erros de sintaxe no index.html
4. Restaurar backup se necessário

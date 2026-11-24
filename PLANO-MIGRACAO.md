# Plano de Migração de Arquivos — Jogos do Jhon

## Estrutura atual (resumo)
- Raiz: index.html, service-worker.js, manifest.webmanifest, arcade-common.js, musica.js, inimigos.js
- Raiz: 20 versões antigas de ninja_forest_run*.html
- games/: 36 jogos HTML
- icons/, imagens/

## Migrações recomendadas (baixo risco)

### 1. Arquivar versões antigas do Ninja
```
mkdir -p arquivo/ninja-forest
git mv ninja_forest_run.html arquivo/ninja-forest/
git mv ninja_forest_run_v1_1.html arquivo/ninja-forest/
# ... (repetir para v2, v2_1, v3, v3_1, v3_2, v4...v4_9, v5)
```
**Links que quebram:** nenhum (esses arquivos não são referenciados no catálogo; apenas v4_10 é usado).
**Teste:** confirmar que ninja_forest_run_v4_10.html ainda abre.

### 2. Organizar assets
```
# icons/ e imagens/ já estão organizados — manter
```

### 3. NÃO migrar (alto risco, evitar)
- Mover jogos de games/ para subpastas: quebraria todos os links `../arcade-common.js` e `../index.html`
- Renomear arquivos de jogos: quebraria links no index.html

## Ordem recomendada
1. Arquivar versões antigas do Ninja (sem risco de quebra)
2. Testar todos os 36 jogos
3. Verificar service-worker.js (remover entradas de arquivos arquivados)

## Como testar após migração
- Abrir index.html e verificar 36 cards
- Abrir 5 jogos aleatórios
- Verificar console sem erros
- Verificar PWA offline (service worker)

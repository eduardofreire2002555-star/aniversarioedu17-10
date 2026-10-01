JAPPA — VERSÃO CORRIGIDA PARA GITHUB + VERCEL

IMPORTANTE:
1. O index.html precisa ficar na RAIZ do repositório.
2. Na mesma raiz, mantenha: index.html, style.css, script.js, vercel.json e a pasta assets.
3. Não envie apenas os arquivos HTML/CSS/JS: a pasta assets também precisa ir para o GitHub.
4. Na Vercel, deixe o Root Directory na raiz do repositório (onde está o index.html).
5. Framework Preset: Other / sem framework. Não é necessário Build Command.

O que foi corrigido:
- Caminhos de imagens compatíveis com GitHub/Vercel/Linux.
- Arquivos de galeria reunidos em uma única pasta assets, sem recompressão.
- Modal passou a usar imagens locais, sem depender de hotlinks externos.
- Imagens externas de fundo mantêm fallback local quando o servidor externo falhar.
- Imagem externa do ambiente possui fallback local.
- Layout reforçado para iPhone/Android, telas de 320 px em diante, modo paisagem e safe areas.
- Nenhuma imagem original foi redimensionada ou recomprimida.

# Correção das dependências do site

Astro foi atualizado de 5.18.2 (resolução anterior de ^5.14.0) para 7.4.5, eliminando os alertas encontrados em Astro, sharp, Zod, zod-to-ts e esbuild na consulta npm desta revisão. A nova árvore não precisa de overrides para mascarar avisos.

As dependências diretas e o lockfile estão fixados. O cliente Supabase foi fixado em 2.119.0, versão já resolvida no build de referência da auditoria, sem mudar URLs, chaves públicas ou regras de autenticação. O site continua estático em Cloudflare Pages.

Astro 7 muda o tratamento padrão de espaços. `compressHTML: true` preserva o comportamento anterior. Node 24.21.0 está indicado em `.nvmrc` para desenvolvimento, CI e Cloudflare Pages.

## Verificação

- `npm ci`, `npm audit`, `npm run build` e `npm run verify:build`.
- Saída: 24 rotas do site, 137 referências a recursos locais e carimbo WebP verificados.
- Comparação com a saída anterior: textos, imagens, links e atributos dos campos/botões permaneceram iguais nas 25 páginas HTML comparadas (24 rotas e página de erro).
- Nenhum arquivo editorial, capa, página ou regra de compra/leitura foi alterado.
- CI passa a verificar instalação pelo lockfile, auditoria completa, build e recursos de saída em cada PR e push em main.

Zero avisos npm significa zero vulnerabilidades conhecidas informadas pelo registro naquela consulta; não é garantia geral de ausência de falhas.

## Publicação e retorno

Cloudflare Pages publica main após a integração. Conferir o SHA do deployment e páginas/recursos no domínio oficial. Se houver regressão, usar rollback do deployment anterior no Pages e reverter o commit pelo GitHub. Não restaurar dependências vulneráveis como solução definitiva; diagnosticar e preparar nova correção.

## Referências

- https://docs.astro.build/en/guides/upgrade-to/v6/
- https://docs.astro.build/en/guides/upgrade-to/v7/
- https://developers.cloudflare.com/pages/configuration/build-image/

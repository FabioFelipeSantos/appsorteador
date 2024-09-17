# Publicando na Vercel

1. Cria o repositório no GitHub;
2. Inicializa o projeto na pasta: `git init`;
3. Adicione ao `.gitignore` os arquivos `dev`, `dist` e `node_modules`;
4. Faça o commit;
5. Vá para a branch `main`, `git branch -M main`;
6. Associe o repositório: `git remote add origin <URL DO REPO>`;
7. Faça o push: `git push -u origin main`;
8. Na Vercel seleciona o repo que está o projeto;
9. Nas configurações do projeto, em `Build and Output Settings`, no campo `BUILD COMMAND` rodar o comando do `package.json` de build, ou seja, adicionamos `npm run build`;
10. Ainda nas configurações, no campo `OUTPUT DIRECTORY` colocamos o caminho de onde deverão estar os arquivos que serão públicos. Logo, colocamos `dist`;
11. Faça o deploy.

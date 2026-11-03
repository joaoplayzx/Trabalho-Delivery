# Saborê — Painel do restaurante

Aplicação front-end de delivery feita com React, TypeScript e Vite para administrar o cardápio de um restaurante.

## Integrantes
- Nome completo 1: PREENCHER
- Nome completo 2: PREENCHER

## GitHub
Link do repositório: COLOCAR_AQUI_O_LINK_DO_GITHUB

## Tecnologias
- React + TypeScript + Vite
- React Router para navegação e rota protegida
- Context API para sessão e token
- Fetch API para comunicação com o DummyJSON
- CSS responsivo

## Como executar
1. Instale o Node.js (versão LTS).
2. Extraia o ZIP e abra a pasta `painel-delivery` no VS Code.
3. Abra o terminal nessa pasta e execute:

```bash
npm install
npm run dev
```

4. Abra o endereço exibido no terminal (normalmente `http://localhost:5173`).

O arquivo `.env` já contém `VITE_API_URL=https://dummyjson.com`. Se alterar esse arquivo, pare e inicie novamente o servidor com `npm run dev`.

## Conta de teste
- Usuário: `emilys`
- Senha: `emilyspass`

## Build de produção
```bash
npm run build
```

## Organização
- `src/components/`: componentes reutilizáveis da interface.
- `src/context/`: contexto de autenticação.
- `src/pages/`: telas de login e cardápio.
- `src/services/`: chamadas HTTP para a API.
- `src/types/`: tipos TypeScript.

## Observação sobre a API
O DummyJSON simula criação, edição e exclusão. Por isso, depois de cada operação a interface atualiza a lista localmente. Ao recarregar a página, os dados retornam ao conteúdo real da API. Os pratos criados recebem ID 51; a API pode responder 404 ao tentar editar/excluir esse ID. O sistema apresenta uma mensagem clara nesses casos.

## Antes de entregar
- Preencha os nomes dos dois integrantes e o link do GitHub neste README.
- Crie o repositório e façam commits dos dois integrantes.
- Teste `npm run build`.
- Envie ao AVA um ZIP sem `node_modules`, com o nome exigido pela professora: `nome1-nome2.zip`.

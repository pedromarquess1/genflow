# Genflow — orientações para agentes

## Sobre o projeto

Genflow é uma plataforma de gerenciamento de rotina e financeiro. O repositório reúne:

- `api/`: backend Django, organizado em apps (`core`, `kanban` e `finance`), com endpoints REST.
- `web/`: frontend React com TypeScript, Vite e Tailwind CSS.

As interfaces e os rótulos voltados às pessoas usuárias são em português. Ao alterar funcionalidades, mantenha frontend e API coerentes.

## Padrões de código observados

Estas convenções descrevem o código existente; nem todas são impostas por ferramentas de formatação.

### Backend (`api/`)

- Separe funcionalidades por app Django. No Kanban e no financeiro, a organização segue o padrão `models.py`, `serializers.py`, `views.py` e `urls.py`.
- Use Django REST Framework: `ModelSerializer` para serialização e `ModelViewSet` com `DefaultRouter` para operações de recursos.
- Mantenha identificadores Python em `snake_case` e classes em `PascalCase`. Os modelos usam `TextChoices` para valores enumerados e `Meta` para opções do modelo.
- Os endpoints de dados exigem autenticação e limitam consultas ao usuário autenticado. Preserve esse isolamento em listagens, leituras, alterações e exclusões; associe o proprietário no servidor ao criar registros, sem confiar em um proprietário enviado pelo cliente.
- As rotas da aplicação são incluídas sob `/api/` em `config/urls.py`. Ao integrar endpoints no frontend, confirme o caminho completo e a barra final conforme a rota declarada.
- O Kanban usa `owner` para relacionar tarefas ao usuário; o financeiro usa `user`. Respeite os nomes definidos em cada modelo.

### Frontend (`web/`)

- Escreva componentes React em arquivos `.tsx`, como funções com `export default`; use hooks do React para estado e efeitos.
- Use TypeScript para estados e outros valores com tipos relevantes. Evite enfraquecer a tipagem com `any`.
- O código existente usa imports com aspas simples e ponto e vírgula. Siga o estilo do arquivo que estiver alterando.
- Tailwind CSS é usado nas classes de interface; mantenha consistência visual e responsividade com os componentes existentes.
- Axios é a dependência já disponível para chamadas HTTP. Trate falhas de rede/API explicitamente e mantenha as URLs alinhadas às rotas do backend.

## Testes e validação

- Backend: execute `python manage.py test` a partir de `api/`. Os arquivos `tests.py` atuais são apenas esqueletos; acrescente testes relevantes ao implementar ou corrigir comportamento.
- Frontend: execute `npm run lint` e `npm run build` a partir de `web/`.
- Não há script de testes automatizados do frontend configurado em `web/package.json`.

## Ao fazer alterações

- Prefira mudanças pequenas e consistentes com a organização existente; não introduza camadas, dependências ou convenções novas sem necessidade.
- Considere os dois lados de cada integração: formato dos dados, autenticação, escopo por usuário e caminho da rota.
- Não inclua segredos, credenciais ou configurações locais no código. Use os arquivos de ambiente locais previstos no `.gitignore`.

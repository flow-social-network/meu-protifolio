<div align="center">

# ◈ NoteAgents

### AI Engineering Control Plane

**Build faster. Understand everything. Fix intelligently. Verify continuously.**

[![Status](https://img.shields.io/badge/status-active%20development-2563EB?style=for-the-badge)](#status-do-projeto)
[![Open Source](https://img.shields.io/badge/open%20source-community-06B6D4?style=for-the-badge)](#open-source)
[![AI Engineering](https://img.shields.io/badge/AI-Engineering-0B5FFF?style=for-the-badge)](#visão-geral)
[![Architecture](https://img.shields.io/badge/architecture-modular-2563EB?style=for-the-badge)](#arquitetura)

</div>

---

## Sobre

O **NoteAgents** é uma plataforma de **AI Engineering** projetada para funcionar como um **control plane de engenharia de software assistida por Inteligência Artificial**.

O objetivo não é simplesmente criar código.

O NoteAgents coordena:

```text
Developer
    │
    ▼
Computer
    │
    ▼
Workspace
    │
    ▼
Project
    │
    ├── Code
    ├── Git
    ├── GitHub
    ├── Database
    ├── Infrastructure
    ├── AI Models
    ├── Agents
    ├── MCP
    ├── LSP
    ├── OpenCode
    ├── Testing
    ├── Observability
    ├── Audit
    ├── Evidence
    └── Deployment
```

A proposta é transformar ferramentas, agentes e processos de engenharia em uma experiência única, observável e verificável.

---

# A ideia

A Inteligência Artificial tornou a geração de software muito mais rápida.

Mas existe um problema:

> Quanto mais rápido conseguimos gerar software, mais importante se torna validar se esse software realmente está correto.

Um projeto pode parecer pronto e ainda possuir:

- dependências quebradas;
- imports incorretos;
- arquitetura inadequada;
- componentes duplicados;
- código excessivamente acoplado;
- ausência de testes;
- migrations incorretas;
- schemas inconsistentes;
- problemas de banco;
- vulnerabilidades;
- problemas de autenticação;
- problemas de autorização;
- problemas de performance;
- problemas de acessibilidade;
- erros de frontend;
- erros de backend;
- erros de API;
- problemas de infraestrutura;
- falhas de deploy;
- dívida técnica;
- documentação incompleta.

O NoteAgents foi concebido para transformar essa situação em um processo verificável.

---

# A tese do produto

O NoteAgents não é simplesmente:

> Uma IA que programa.

A proposta é:

> **Um sistema operacional de engenharia para projetos desenvolvidos com IA.**

O fluxo completo planejado é:

```text
IDEA
  │
  ▼
PROJECT
  │
  ▼
ENVIRONMENT
  │
  ▼
ARCHITECTURE
  │
  ▼
DATABASE
  │
  ▼
IMPLEMENTATION
  │
  ▼
TESTING
  │
  ▼
AUDIT
  │
  ▼
ERROR DETECTION
  │
  ▼
AUTO FIX
  │
  ▼
VERIFICATION
  │
  ▼
DEPLOYMENT
  │
  ▼
PRODUCTION
  │
  ▼
MARKET READINESS
  │
  ▼
CONTINUOUS EVOLUTION
```

---

# O que o NoteAgents faz?

O NoteAgents funciona como uma camada entre o desenvolvedor e o ecossistema de engenharia.

```text
GitHub
Vercel
OpenCode
MCP
LSP
Docker
Databases
AI Models
Testing
Observability
Cloud
      │
      ▼
 ┌───────────────┐
 │   NoteAgents  │
 └───────────────┘
      │
      ▼
Developer Intelligence
```

O objetivo é evitar que o desenvolvedor precise alternar constantemente entre diversas ferramentas para entender o estado de um projeto.

---

# Princípio fundamental

Uma funcionalidade não é considerada concluída apenas porque existe uma tela.

Cada funcionalidade deve possuir:

```text
UI
 ↓
State
 ↓
Action
 ↓
Backend Contract
 ↓
Validation
 ↓
Error Handling
 ↓
Evidence
 ↓
Tests
```

Portanto:

```text
Frontend
    ↓
API Client
    ↓
OpenAPI / Contracts
    ↓
Application
    ↓
Domain
    ↓
Infrastructure
    ↓
External Services
    ↓
Database
```

E não:

```text
Frontend
    ↓
mockData.ts
    ↓
"parece funcionar"
```

---

# Arquitetura

A arquitetura foi projetada para privilegiar:

- modularidade;
- baixo acoplamento;
- interfaces explícitas;
- agentes desacoplados;
- providers intercambiáveis;
- ferramentas registráveis;
- segurança por padrão;
- permissões explícitas;
- execução verificável;
- evidências persistentes;
- observabilidade;
- extensibilidade;
- testes automatizados;
- compatibilidade com diferentes stacks.

---

# Arquitetura de alto nível

```text
                         ┌─────────────────────┐
                         │      Developer      │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   NoteAgents Web    │
                         │      Console        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      API Layer      │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       Application Layer       Agent Runtime        Knowledge
              │                     │                     │
              └─────────────────────┼─────────────────────┘
                                    │
                                    ▼
                           ┌─────────────────┐
                           │  Domain Layer   │
                           └────────┬────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Infrastructure      │
                         └─────────┬───────────┘
                                   │
       ┌────────────┬──────────────┼──────────────┬─────────────┐
       ▼            ▼              ▼              ▼             ▼
    Database      GitHub         Vercel         AI/MCP        Runtime
```

---

# Camadas

## Presentation

Responsável pela interface.

Inclui:

- Web Console;
- Chat;
- Dashboard;
- páginas de projeto;
- visualização de agentes;
- pipelines;
- observabilidade;
- auditorias;
- configurações.

---

## API

Responsável pela exposição dos contratos HTTP.

Cada endpoint deve possuir:

```text
Request DTO
Response DTO
Validation Schema
Error Contract
Permission Requirement
Evidence Requirement
OpenAPI Definition
Automated Test
```

---

## Application

Coordena os casos de uso.

Exemplos:

```text
CreateProject
RunAgent
RunAudit
ExecutePipeline
ScanEnvironment
AnalyzeRepository
GenerateEvidence
RunVerification
DeployProject
```

---

## Domain

Contém regras de negócio e entidades independentes de infraestrutura.

O domínio não deve conhecer:

- HTTP;
- React;
- Express;
- banco específico;
- provedor específico de IA;
- GitHub;
- Vercel.

---

## Infrastructure

Implementa integrações concretas.

Exemplos:

```text
PostgreSQL
GitHub
Vercel
Firebase
Cloudflare
Slack
AI Providers
MCP
LSP
OpenCode
Storage
Queues
Observability
```

---

# Web Console

O Web Console é a interface central da plataforma.

A arquitetura prevê as seguintes áreas:

```text
Dashboard
Projects
Environment
Workspace
Agents
Pipelines
Runs
Audits
Issues
Insights
Evidence
Database
Migrations
MCP
LSP
OpenCode
Integrations
Knowledge Studio
Sources
Engineering Chat
Reports
Mind Maps
Audio
Video
Technical Debt
Market Readiness
Project Health
Settings
```

---

# Dashboard

O Dashboard fornece uma visão geral do estado do projeto.

Pode apresentar:

```text
Project Health
Environment Health
Agents
Pipelines
Runs
Open Issues
Audits
Evidence
Deployments
Observability
Readiness
```

O objetivo não é apenas mostrar métricas.

O Dashboard deve responder:

> O que está acontecendo com meu projeto?

---

# Projects

Gerenciamento dos projetos acompanhados pelo NoteAgents.

```text
GET    /projects
POST   /projects
GET    /projects/:projectId
PATCH  /projects/:projectId
DELETE /projects/:projectId

GET    /projects/:projectId/status
GET    /projects/:projectId/health
GET    /projects/:projectId/readiness
GET    /projects/:projectId/activity
GET    /projects/:projectId/metrics
```

---

# Workspace

O Workspace representa o ambiente real onde o projeto está localizado.

```text
Workspace
 ├── Files
 ├── Git
 ├── Runtime
 ├── Dependencies
 ├── Tools
 ├── Database
 ├── Services
 └── Configuration
```

Contratos previstos:

```text
GET    /projects/:projectId/workspaces
POST   /projects/:projectId/workspaces

GET    /workspaces/:workspaceId
PATCH  /workspaces/:workspaceId
DELETE /workspaces/:workspaceId

GET    /workspaces/:workspaceId/files
GET    /workspaces/:workspaceId/tree
GET    /workspaces/:workspaceId/status

POST   /workspaces/:workspaceId/scan
```

---

# Environment

O Environment Doctor identifica o ambiente de desenvolvimento.

O sistema deve detectar:

- sistema operacional;
- arquitetura;
- CPU;
- memória;
- armazenamento;
- permissões;
- shell;
- terminal;
- Node.js;
- npm;
- pnpm;
- yarn;
- bun;
- Python;
- PHP;
- Java;
- Docker;
- Git;
- GitHub CLI;
- bancos;
- Redis;
- RabbitMQ;
- Flyway;
- IDEs;
- OpenCode;
- MCP;
- LSP;
- ferramentas de observabilidade.

Nenhuma instalação ou modificação ocorre automaticamente sem respeitar a política de aprovação do usuário.

---

# Environment Doctor API

```text
GET  /environment

POST /environment/scan
POST /environment/doctor

GET /environment/system
GET /environment/storage
GET /environment/runtime
GET /environment/languages
GET /environment/package-managers
GET /environment/databases
GET /environment/infrastructure
GET /environment/ai-tools
GET /environment/mcp
GET /environment/lsp
GET /environment/security
```

---

# Agents

Os agentes são unidades especializadas de trabalho.

A arquitetura prevê agentes para:

```text
Frontend
Backend
Database
Security
Testing
Reviewer
Error Fixer
Vision
Documentation
Deployment
Observer
Evolution
```

API conceitual:

```text
GET    /agents
POST   /agents
GET    /agents/:agentId
PATCH  /agents/:agentId
DELETE /agents/:agentId

POST   /agents/:agentId/run
POST   /agents/:agentId/stop
POST   /agents/:agentId/pause
POST   /agents/:agentId/resume

GET    /agents/:agentId/runs
GET    /agents/:agentId/tasks
GET    /agents/:agentId/logs
GET    /agents/:agentId/status

GET    /agents/registry
GET    /agents/capabilities
GET    /agents/types
```

---

# Tasks

As tarefas representam unidades de trabalho executáveis.

```text
GET    /tasks
POST   /tasks
GET    /tasks/:taskId
PATCH  /tasks/:taskId
DELETE /tasks/:taskId

POST   /tasks/:taskId/run
POST   /tasks/:taskId/cancel
POST   /tasks/:taskId/retry

GET    /tasks/:taskId/status
GET    /tasks/:taskId/logs
GET    /tasks/:taskId/evidence
```

---

# Pipelines

Pipelines coordenam etapas de engenharia.

```text
GET    /pipelines
POST   /pipelines
GET    /pipelines/:pipelineId
PATCH  /pipelines/:pipelineId
DELETE /pipelines/:pipelineId

POST   /pipelines/:pipelineId/run
POST   /pipelines/:pipelineId/cancel
POST   /pipelines/:pipelineId/retry

GET    /pipelines/:pipelineId/runs
GET    /pipeline-runs/:runId
GET    /pipeline-runs/:runId/stages
GET    /pipeline-runs/:runId/logs
GET    /pipeline-runs/:runId/evidence
```

---

# Runs

O Runtime permite acompanhar execuções.

```text
GET  /runs
GET  /runs/:runId

POST /runs/:runId/cancel
POST /runs/:runId/retry

GET /runs/:runId/status
GET /runs/:runId/events
GET /runs/:runId/logs
GET /runs/:runId/output
GET /runs/:runId/errors
```

---

# Audit Engine

O Auditor verifica diferentes dimensões do sistema.

```text
Security
Architecture
Frontend
Backend
Database
Performance
Accessibility
```

API:

```text
GET  /audits
POST /audits

GET  /audits/:auditId

POST /audits/:auditId/run
POST /audits/:auditId/cancel

GET  /audits/:auditId/findings
GET  /audits/:auditId/evidence
GET  /audits/:auditId/summary

POST /audits/security
POST /audits/architecture
POST /audits/frontend
POST /audits/backend
POST /audits/database
POST /audits/performance
POST /audits/accessibility
```

---

# Findings

Findings representam problemas encontrados durante análises.

Categorias:

```text
Bug
Security
Performance
Architecture
Technical Debt
Frontend
Backend
Database
Accessibility
```

Severidades:

```text
Critical
High
Medium
Low
```

Operações:

```text
GET    /findings
GET    /findings/:findingId
PATCH  /findings/:findingId
DELETE /findings/:findingId

POST   /findings/:findingId/resolve
POST   /findings/:findingId/ignore
POST   /findings/:findingId/fix
POST   /findings/:findingId/retry
```

---

# Evidence Engine

O NoteAgents possui uma preocupação explícita com evidências.

Uma execução não deve apenas dizer:

```text
"Funcionou."
```

Ela deve produzir evidências capazes de sustentar o resultado.

Exemplos:

```text
Build Output
Test Results
Audit Findings
Logs
Screenshots
Metrics
Git Diff
Deployment Result
Verification Result
```

---

# Developer Control Center

O usuário deve sempre saber o que está acontecendo.

O sistema deve apresentar:

```text
What NoteAgents is doing
Why it is doing it
What it changed
What it wants to change
What evidence exists
What remains
```

A plataforma não deve se transformar em uma caixa-preta.

---

# Regra de segurança operacional

O NoteAgents nunca deve:

- apagar arquivos silenciosamente;
- apagar banco automaticamente;
- alterar o sistema sem autorização;
- expor secrets;
- enviar arquivos privados sem consentimento;
- executar comandos privilegiados sem política;
- modificar fora do workspace autorizado.

O fluxo esperado é:

```text
DISCOVER
   ↓
EXPLAIN
   ↓
ASK
   ↓
APPROVE
   ↓
EXECUTE
   ↓
VERIFY
```

---

# CLI

A CLI planejada fornece operações de engenharia.

Exemplos:

```bash
note doctor
note audit
note environment
note install
note database
note migrate
note flyway
note mcp
note lsp
note opencode
note observe
note errors
note test
note verify
note readiness
note insights
note knowledge
note research
note health
note fix
```

A CLI é uma camada operacional do ecossistema e não substitui o Web Console.

---

# Knowledge Studio

O Knowledge Studio transforma informações do projeto em conhecimento estruturado.

Estrutura:

```text
Sources
   │
   ├── Chat
   │
   └── Studio
```

O Studio pode trabalhar com:

```text
Summary
Report
Mind Map
Architecture
Roadmap
Checklist
Quiz
Flashcards
Audio Overview
Video Overview
Documents
Presentation
Spreadsheet
```

---

# Observer

O Observer acompanha o estado operacional do sistema.

Áreas:

```text
Application Status
Processes
Logs
Errors
Console
Network
Browser
API
Database
Performance
```

Rota:

```text
/observer
```

---

# Database

A área de banco de dados permite visualizar:

```text
Database Status
Connection
Schema
Tables
Indexes
Migrations
Migration History
Data Quality
Queries
Performance
Recommendations
```

---

# MCP

O MCP funciona como uma camada de ferramentas para os agentes.

A arquitetura permite trabalhar com diferentes servidores e ferramentas MCP sem tornar o NoteAgents dependente de uma implementação específica.

---

# LSP

O LSP fornece contexto semântico relacionado às linguagens.

Pode ser utilizado para:

- símbolos;
- tipos;
- referências;
- diagnóstico;
- navegação;
- contexto de código.

---

# OpenCode

O OpenCode é tratado como uma ferramenta integrada ao ecossistema, e não como substituto do NoteAgents.

O NoteAgents não pretende substituir OpenCode, GitHub, MCP ou LSP.

---

# GitHub

A integração com GitHub permite centralizar:

```text
Issues
Discussions
Projects
Pull Requests
Commits
Actions
Releases
Security
Code Owners
Teams
Milestones
Roadmaps
```

---

# Vercel

A integração com Vercel permite trabalhar com:

```text
Projects
Deployments
Builds
Preview
Production
Logs
Deployment Status
```

---

# Integrações

O sistema foi concebido para utilizar providers intercambiáveis.

Integrações previstas incluem:

```text
GitHub
Vercel
Cloudflare
Firebase
Slack
AI Providers
Databases
Cloud
Observability
```

O princípio é:

> O NoteAgents deve ser uma camada de integração, não um ecossistema fechado.

---

# Compatibilidade

O NoteAgents é agnóstico.

O usuário não é obrigado a utilizar:

- OpenCode;
- PostgreSQL;
- Vercel;
- GitHub;
- um modelo específico;
- um MCP específico;
- um LSP específico.

A plataforma detecta o ambiente e trabalha com o que já existe.

---

# Interface pública

O projeto possui uma camada pública destinada a:

- apresentar o produto;
- explicar a proposta;
- documentar recursos;
- apresentar a comunidade;
- divulgar o projeto open source;
- apresentar documentação;
- apresentar integrações;
- apresentar a visão de engenharia.

A interface pública funciona também como **Demo / Technical Showcase**.

---

# Painel privado

O painel autenticado é separado do site público.

```text
PUBLIC
/
├── about
├── features
├── community
├── open-source
├── documentation
└── contact

AUTH
/auth/login
/auth/reset-password

APPLICATION
/app
├── dashboard
├── projects
├── environment
├── workspace
├── agents
├── pipelines
├── runs
├── audits
├── issues
├── evidence
├── database
├── integrations
├── observability
├── knowledge
├── chat
└── settings
```

O painel não reutiliza o layout público.

---

# Frontend

O frontend é construído com componentes independentes.

Princípio:

```text
Page
 │
 ├── Component
 │    ├── Component
 │    └── Component
 │
 └── Component
```

Cada componente possui:

```text
Responsabilidade
Estilo
Estado
Props
Eventos
Testes
```

---

# Organização do frontend

Estrutura conceitual:

```text
frontend/
├── app/
│   ├── auth/
│   ├── dashboard/
│   ├── projects/
│   ├── environment/
│   ├── workspace/
│   ├── agents/
│   ├── pipelines/
│   ├── runs/
│   ├── audits/
│   ├── issues/
│   ├── evidence/
│   ├── database/
│   ├── integrations/
│   ├── observer/
│   ├── knowledge/
│   ├── chat/
│   └── settings/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── dashboard/
│   ├── agents/
│   ├── projects/
│   ├── pipelines/
│   ├── chat/
│   ├── observer/
│   └── shared/
│
├── hooks/
├── services/
├── lib/
├── types/
├── contracts/
├── styles/
└── tests/
```

---

# Backend

O backend é organizado por domínio.

```text
backend/
├── src/
│   ├── auth/
│   ├── users/
│   ├── projects/
│   ├── workspaces/
│   ├── agents/
│   ├── tasks/
│   ├── pipelines/
│   ├── runs/
│   ├── audits/
│   ├── findings/
│   ├── evidence/
│   ├── readiness/
│   ├── environment/
│   ├── database/
│   ├── migrations/
│   ├── observer/
│   ├── mcp/
│   ├── lsp/
│   ├── opencode/
│   ├── knowledge/
│   ├── sources/
│   ├── chat/
│   ├── vision/
│   ├── reports/
│   ├── security/
│   ├── testing/
│   ├── builds/
│   ├── deployments/
│   ├── evolution/
│   └── integrations/
│
├── application/
├── domain/
├── infrastructure/
├── shared/
│
├── openapi.yaml
└── tests/
```

---

# Contratos de API

Os contratos são parte central da arquitetura.

Exemplo:

```text
Frontend
    ↓
API Client
    ↓
OpenAPI
    ↓
Request DTO
    ↓
Validation
    ↓
Application
    ↓
Domain
    ↓
Infrastructure
```

Sem dependência de mock data para simulação de regras reais.

---

# Autenticação

A API prevê:

```text
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh

GET    /auth/me
PATCH  /auth/me

POST   /auth/forgot-password
POST   /auth/reset-password

GET    /auth/sessions
DELETE /auth/sessions/:id
```

Usuário:

```text
GET    /users/me
PATCH  /users/me

GET    /users/me/preferences
PATCH  /users/me/preferences
```

---

# Banco de dados

O banco representa o domínio da plataforma:

```text
User
Project
Workspace
Repository
Agent
AgentRun
Task
Pipeline
PipelineRun
Audit
Finding
Evidence
Integration
Conversation
Message
Knowledge Source
Deployment
Build
Log
Notification
Settings
```

---

# Observabilidade

Observabilidade é parte da arquitetura fundamental:

```text
What happened?
When?
Where?
Why?
Who?
Which service?
Which agent?
Which operation?
Which result?
Which evidence?
```

---

# Auditoria

Rastreabilidade completa:

```text
WHO
WHAT
WHEN
WHERE
WHY
RESULT
```

---

# Segurança

Princípios:

```text
Least Privilege
Explicit Permissions
Secret Protection
Auditability
Input Validation
Authentication
Authorization
Isolation
Secure Defaults
```

Nenhum secret é armazenado no repositório.

---

# Variáveis de ambiente

Exemplo:

```env
NODE_ENV=development

DATABASE_URL=

GITHUB_APP_ID=
GITHUB_PRIVATE_KEY=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

VERCEL_TOKEN=

NVIDIA_API_KEY=

AI_PROVIDER=
AI_MODEL=

REDIS_URL=

RABBITMQ_URL=

STORAGE_URL=
```

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/<organization>/noteagents.git
cd noteagents
```

Instale as dependências:

```bash
npm install
```

ou com pnpm:

```bash
pnpm install
```

Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

---

# Desenvolvimento

Verificação de tipos:

```bash
npm run lint
```

Build:

```bash
npm run build
```

---

# Pipeline de qualidade

Toda alteração relevante segue o fluxo:

```text
Code
 ↓
Lint
 ↓
Typecheck
 ↓
Unit Tests
 ↓
Integration Tests
 ↓
E2E
 ↓
Build
 ↓
Validation
 ↓
Deployment
```

---

# Deploy

Fluxo recomendado:

```text
GitHub
   ↓
CI
   ↓
Build
   ↓
Tests
   ↓
Validation
   ↓
Vercel / Cloud
   ↓
Preview
   ↓
Production
```

---

# Demo pública × Produção

## Demo
- Apresentação e navegação
- Demonstração da experiência de interface
- Portfólio técnico e showcase
- Comunidade e documentação aberta

## Produção
- Operação em escala real
- Persistência e isolamento multi-tenant
- Integrações ativas (GitHub, Vercel, MCP, LSP)
- Execução de pipelines e auditorias profundas
- Registro de evidências imutáveis

---

# Open Source

O NoteAgents é construído para evoluir com a comunidade técnica de AI Engineering.

Formas de contribuição:

```text
Fork
Clone
Issue
Discussion
Pull Request
Documentation
Agent
Plugin
MCP Integration
Bug Fix
Testing
Research
Architecture
```

---

# Modelo de contribuição

```text
USER
  ↓
CONTRIBUTOR
  ↓
ACTIVE CONTRIBUTOR
  ↓
SPECIALIST
  ↓
MAINTAINER
  ↓
CORE MAINTAINER
  ↓
OWNER
```

---

# Ecossistema

```text
NoteAgents
 │
 ├── Agent Registry
 ├── Plugin Registry
 ├── MCP Registry
 ├── Provider Ecosystem
 ├── Community Contributions
 └── Enterprise Capabilities
```

---

# Governança

```text
OPEN SOURCE COMMUNITY
          │
          ▼
NOTEAGENTS ORGANIZATION
          │
    ┌─────┼──────┐
    │     │      │
    ▼     ▼      ▼
 Maintainers Teams Community
          │
          ▼
       Partners
```

---

# Roadmap

## Phase 1 — Foundation
- [x] Product architecture
- [x] Design system
- [x] Web Console concept
- [x] Core domains
- [x] API contract model
- [x] Responsive layout & SEO layer
- [x] Presentation showcase & Media Kit

## Phase 2 — Core Engineering
- [ ] Projects
- [ ] Workspace
- [ ] Environment Doctor
- [ ] Agents
- [ ] Tasks
- [ ] Pipelines
- [ ] Runs
- [ ] Evidence
- [ ] Audits

## Phase 3 — Intelligence
- [ ] Engineering Chat
- [ ] Agent Runtime
- [ ] Model Gateway
- [ ] Memory
- [ ] Knowledge Studio
- [ ] Vision
- [ ] Research

## Phase 4 — Developer Infrastructure
- [ ] GitHub
- [ ] Vercel
- [ ] OpenCode
- [ ] MCP
- [ ] LSP
- [ ] Docker
- [ ] Database tooling
- [ ] CI/CD

## Phase 5 — Autonomous Engineering
- [ ] Auto-fix
- [ ] Retries
- [ ] Agent orchestration
- [ ] Continuous Observer
- [ ] Autonomous pipelines
- [ ] Technical Debt
- [ ] Insights
- [ ] Readiness

## Phase 6 — Integrations
- [ ] GitHub
- [ ] Vercel
- [ ] Docker
- [ ] Cloud
- [ ] CI/CD
- [ ] Observability
- [ ] Additional AI providers

## Phase 7 — Ecosystem
- [ ] Agent Registry
- [ ] Plugin Registry
- [ ] MCP Registry
- [ ] Provider ecosystem
- [ ] Community contributions
- [ ] Enterprise capabilities

---

# O que o NoteAgents não é

O NoteAgents não é:
- Substituto do desenvolvedor;
- Uma IA que promete criar qualquer software sem supervisão;
- Uma IDE obrigatória;
- Substituto do GitHub;
- Substituto do OpenCode;
- Substituto do MCP ou LSP;
- Uma caixa-preta que executa comandos descontrolados no computador.

Ele é:
> **Uma camada de coordenação, inteligência, automação e verificação.**

---

# A arquitetura em uma frase

> **NoteAgents não substitui o desenvolvedor. NoteAgents aumenta a capacidade do desenvolvedor.**

```text
OpenCode
    → escreve e executa

AI Agents
    → raciocinam e trabalham

MCP
    → fornece ferramentas

LSP
    → fornece contexto de linguagem

Observer
    → acompanha o sistema

Auditor
    → encontra problemas

Evidence Engine
    → prova resultados

Knowledge Studio
    → transforma informação em conhecimento

Evolution Engine
    → transforma problemas em evolução

NoteAgents
    → coordena tudo
```

---

# Status do projeto

> 🚧 **Active Development**

O projeto está em evolução contínua. As capacidades arquiteturais representam o roadmap de entrega, com separação explícita entre a camada de showcase/demo e os módulos de runtime de produção.

---

# Organização

**DEEVO Soluções Financeiras LTDA**  
CNPJ: **63.187.175/0001-70**  
Telefone: **(51) 3786-6302**  
E-mail: **contato@deevofinanceiras.com.br**

---

# Direitos autorais

© 2026 DEEVO Soluções Financeiras LTDA.  
Todos os direitos reservados.

---

<div align="center">

### NoteAgents

**Your AI Engineering Control Plane.**

Build faster.  
Understand everything.  
Fix intelligently.  
Verify continuously.

<br>

**Open Source • AI Engineering • Developer Intelligence**

</div>

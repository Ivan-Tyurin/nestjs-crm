## Предупреждение

**Этот проект находится на начальной стадии разработки и может содержать ошибки.**

Данный пет-проект создан как демонстрация моих навыков и знаний для потенциальных работодателей. Большая часть моих проектов находится в приватных репозиториях, поскольку они разрабатывались для коммерческих компаний. Поэтому я решил создать этот публичный проект, чтобы продемонстрировать свои умения. И, конечно, потому что мне это просто нравится :)

## Описание

Проект представляет собой обычную CRM систему для автоматизации продаж и взаимодействия с клиентами.

**В проекте используются следующие технологии:**

- Typescript, NodeJS, NestJS
- База данных: PostgreSQL (TypeORM)
- Брокер сообщений: RabbitMQ
- Тестирование: Jest
- Кеширование: Redis
- Логировани и мониторинг: Prometheus, Grafana
- Микросервисная архитектура (Gateway, Saga, CQRS)

**В рамках проекта были выделены следующие микросервисы:**

1. Accounts - сервис для аккаунтов, а также для создания пользователей и их аутентификации.
2. CRM - сервис для бизнес логики CRM системы
3. Files - сервис для обработки файлов и формирования отчетов
4. EmailService - сервис для работы с электронной почтой
5. UisService - сервис для интеграции с IP-телефонией

**Сущности**

- Сервис Accounts
  - Account - аккаунт
  - User - пользователь
- Сервис CRM
  - Pipeline - воронка
  - Source - источник
  - Status - статус
  - Lead - сделка (заявка)
  - Fields - поля сделок
  - Fields_Values - значение полей сделок
  - Clients - клиент
  - Contacts - контакт клиента

## Архитектура проекта

Containers model<br>
![Схема контейнеров приложения](https://i.ibb.co/Y3KGSZj/nestjs-crm-CRM-Backend.jpg)

Accounts database<br>
![Схема базы данных для сервиса Accounts](https://i.ibb.co/fM1hK0F/nestjs-crm-Accounts-db.jpg)

CRM database<br>
![Схема базы данных для сервиса CRM](https://i.ibb.co/RyJG2CT/nestjs-crm-CRM-db.jpg)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start <microservice>

# watch mode
$ npm run start:dev <microservice>

# production mode
$ npm run start:prod <microservice>
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

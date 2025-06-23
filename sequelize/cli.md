# Sequelize CLI — Deep Notes

## 🛠️ What is Sequelize CLI?

The **Sequelize CLI** is a command-line tool for managing Sequelize projects. It simplifies the creation and handling of:

* Models
* Migrations
* Seeders
* Environment-specific configurations

---

## 📦 Installation

Install it locally (recommended):

```bash
npm install --save-dev sequelize-cli
```

Or globally:

```bash
npm install -g sequelize-cli
```

---

## 📁 CLI-Generated Project Structure

```
├── config/
│   └── config.json or config.js
├── models/
├── migrations/
├── seeders/
└── .sequelizerc (optional)
```

---

## ⚙️ CLI Commands Overview

### Project Initialization

```bash
npx sequelize-cli init                   # Initialize entire project structure
npx sequelize-cli init:models            # Only create models folder
npx sequelize-cli init:migrations        # Only create migrations folder
```

### Models

```bash
npx sequelize-cli model:generate \
  --name User \
  --attributes name:string,email:string
```

> Creates a model file and corresponding migration

### Migrations

```bash
npx sequelize-cli migration:generate --name create-users
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all
```

### Seeders

```bash
npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo
npx sequelize-cli db:seed:undo:all
```

### Database Tasks

```bash
npx sequelize-cli db:create
npx sequelize-cli db:drop
```

---

## 🔧 .sequelizerc (Optional)

Customize CLI behavior and paths:

```js
const path = require('path');

module.exports = {
  config: path.resolve('src/db/config.js'),
  'models-path': path.resolve('src/db/models'),
  'seeders-path': path.resolve('src/db/seeders'),
  'migrations-path': path.resolve('src/db/migrations')
};
```

---

## ⚙️ config/config.js (or .json)

Manages environment-based settings:

```js
module.exports = {
  development: {
    username: 'root',
    password: 'password',
    database: 'dev_db',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {...},
  production: {...}
};
```

---

## ✅ Best Practices

| Practice                             | Reason                                 |
| ------------------------------------ | -------------------------------------- |
| Use local CLI (`--save-dev`)         | Avoid global pollution                 |
| Use `.sequelizerc`                   | Cleaner and customizable project paths |
| Split configs by environment         | Safety and flexibility                 |
| Version control migration/seed files | Track schema/data evolution            |
| Avoid running `sync()` in production | Use migrations instead                 |

---

## 🧠 Summary

| Feature             | Sequelize CLI                     |
| ------------------- | --------------------------------- |
| Project scaffolding | ✅ `init`, `model:generate`, etc.  |
| Schema management   | ✅ via `migration:*` commands      |
| Data seeding        | ✅ via `seed:*` commands           |
| DB operations       | ✅ create/drop via `db:*` commands |
| Environment support | ✅ via `config.js/.json`           |
| Custom paths        | ✅ via `.sequelizerc`              |
| Ideal for           | Dev, Test, Prod — CI/CD pipelines |

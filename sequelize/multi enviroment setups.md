# Sequelize Multi-Environment Basics

## 🌱 The Simple Truth

Multi-environment setup in Sequelize is simply this:

> A single JSON (or JS) config file with multiple named objects — like `development`, `test`, and `production` — each containing the database connection details for that environment.

---

## 📁 Default File

Sequelize CLI expects this file by default:

```bash
/config/config.json
```

### Example `config/config.json`

```json
{
  "development": {
    "username": "dev_user",
    "password": "dev_pass",
    "database": "myapp_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "test_user",
    "password": "test_pass",
    "database": "myapp_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "prod_user",
    "password": "prod_pass",
    "database": "myapp_prod",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

---

## 🧠 How It Works

Sequelize CLI uses the selected environment to pick the correct configuration block.

### Choose environment by:

* Setting `NODE_ENV` environment variable
* Or passing `--env <env>` flag in commands

### Examples

```bash
npx sequelize-cli db:create --env test
npx sequelize-cli db:migrate --env production
```

If no environment is given, Sequelize defaults to `development`.

---

## ✅ Why Use It?

| Problem Without Multi-Env     | Benefit With Multi-Env             |
| ----------------------------- | ---------------------------------- |
| All environments share one DB | Safe separation of dev, test, prod |
| Accidental prod data loss     | No risk of crossing environments   |
| Testing pollutes dev data     | Clean, disposable test DB          |
| Hard to automate deploys      | CI/CD targets correct DB           |

---

## 🔄 Typical Workflow

1. Define all environments in `config/config.json`
2. Create separate databases for each:

```bash
npx sequelize-cli db:create --env development
npx sequelize-cli db:create --env test
npx sequelize-cli db:create --env production
```

3. Use `--env` to run migrations/seeders into the right DB

---

## 💡 Final Words

Yes — it really is **just a config file** with a few sections.

But this small design allows Sequelize to:

* Scale across dev/test/prod
* Enable safe deployments
* Isolate testing
* Run robust CI/CD pipelines

> A small setup with a **big impact**. That’s why it gets the “big talk.” 😉

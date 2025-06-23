# Sequelize Migrations — Deep Notes

## 🌟NOTE 
Migrations are nothing but bunch of time stamped files with up and down methods , where up is for applying the changes and down is for rolling them back. 
this files are stored inside the migrations folder and the reference or say the track of applied migrations is kept inside the table => sequelizeMeta

## 🧱 What Are Migrations?

Migrations are version-controlled scripts that describe how your database schema changes over time. They are used to:

* Create, alter, or drop tables/columns/indexes
* Define and enforce schema evolution
* Revert changes safely

Each migration file includes two methods:

```js
module.exports = {
  up: async (queryInterface, Sequelize) => { ... },  // Apply changes
  down: async (queryInterface, Sequelize) => { ... } // Rollback changes
};
```

---

## ⚙️ How Migrations Work Internally

1. You generate a migration file using Sequelize CLI
2. Write schema changes using `queryInterface`
3. Sequelize stores applied migrations in the `SequelizeMeta` table
4. CLI commands like `db:migrate`, `db:migrate:undo` run or revert them

---

## ✅ Why Use Migrations Instead of `sync()` or `alter`

| Method                  | Use Case        | Risk        | Notes                                 |
| ----------------------- | --------------- | ----------- | ------------------------------------- |
| `sync()`                | Dev-only        | ⚠️ High     | Drops/creates tables unpredictably    |
| `sync({ alter: true })` | Prototyping     | ⚠️ Moderate | Adjusts schema, but not safe for prod |
| ✅ Migrations            | Production-safe | ✅ Safe      | Explicit, versioned, controlled       |

---

## 📁 File Structure

Each migration file is timestamped for order:

```
20240623110101-create-users.js
20240623110210-add-email-to-users.js
```

You should:

* ✅ Create a **separate migration file per logical change**
* ❌ Avoid combining unrelated table changes in one file

---

## 📌 Common Migration Use Cases

* Creating new tables
* Adding/removing/modifying columns
* Adding constraints or indexes
* Renaming columns or tables

Example:

```js
await queryInterface.addColumn('Users', 'email', {
  type: Sequelize.STRING,
  allowNull: false,
  unique: true
});
```

---

## ❗ Do Migrations Affect Data?

Migrations change structure, but can indirectly affect data.

| Change Type         | Affects Data?       | Safe?                          |
| ------------------- | ------------------- | ------------------------------ |
| Create table        | No                  | ✅ Yes                          |
| Add nullable column | No                  | ✅ Yes                          |
| Add NOT NULL column | ❗ Yes               | ⚠️ Must provide default values |
| Remove column/table | ✅ Yes — destructive | ❌ No                           |
| Change type         | ✅ Yes               | ⚠️ May truncate data           |

---

## 🧠 Example: Safe NOT NULL Column

```js
await queryInterface.addColumn('Users', 'status', { allowNull: true });
await queryInterface.sequelize.query(`UPDATE "Users" SET "status" = 'active'`);
await queryInterface.changeColumn('Users', 'status', { allowNull: false });
```

---

## ✅ Best Practices

* ✅ Always define both `up()` and `down()`
* ✅ Use one file per logical change
* ✅ Use `queryInterface` methods only
* ✅ Never use `sync()` in production
* ✅ Review `SequelizeMeta` for migration tracking
* ✅ Use safe multi-step changes for production tables

---

## 🛠 Sequelize CLI Commands

```bash
npx sequelize-cli db:migrate            # Apply all pending migrations
npx sequelize-cli db:migrate:undo       # Undo last migration
npx sequelize-cli db:migrate:undo:all   # Undo all migrations
npx sequelize-cli db:migrate:status     # Show applied/pending migrations
```

---

## 🧪 Migration vs Seeder

| Feature               | Migration         | Seeder                   |
| --------------------- | ----------------- | ------------------------ |
| Purpose               | Schema changes    | Insert default/test data |
| Uses `queryInterface` | ✅ Yes             | ✅ Yes                    |
| Versioned             | ✅ `SequelizeMeta` | ✅ `SequelizeData`        |
| Rollback              | ✅ `down()`        | ✅ `seed:undo`            |

---

## 🔒 Why Migrations Are Considered Safe

* They are **versioned** and traceable
* They are **reversible** (`down()`)
* They are **explicit** — nothing happens magically
* You can **inject safety steps** like filling in default values before adding NOT NULL

---

## 🧠 Summary

| Concept              | Insight                                                   |
| -------------------- | --------------------------------------------------------- |
| Migrations = up/down | ✅ Files with schema changes and rollback logic            |
| Per-entity files     | ✅ Prefer logical separation                               |
| Safe?                | ⚠️ Safe for structure, but may affect data if not careful |
| Ideal for prod       | ✅ Yes — unlike `sync()` or `alter`                        |
| Work via             | ✅ `queryInterface` internally                             |
| Version tracking     | ✅ `SequelizeMeta` table                                   |

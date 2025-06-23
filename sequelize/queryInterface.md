# Sequelize QueryInterface — Deep Notes

## 🌟 NOTES
It does not deal with models but below them , it bypasses them.

## 🧰 What is `queryInterface`?

`queryInterface` is a low-level abstraction layer provided by Sequelize to perform **direct schema operations** on the database. It allows you to interact with tables, columns, constraints, and indexes without relying on models.

It is used extensively in **migrations** and **seeders**, and can execute raw SQL queries when needed.

---

## ✅ Key Features

* Provided by Sequelize (not the database)
* Abstracts away dialect differences (Postgres, MySQL, SQLite)
* Used in migrations and seeders
* Directly manipulates the database schema

---

## ⚙️ How Does It Work Internally?

1. You call a method like `createTable()` or `addColumn()` on `queryInterface`.
2. Sequelize delegates to an internal **`QueryGenerator`** based on the SQL dialect (e.g., Postgres, MySQL).
3. The SQL is compiled and passed to `sequelize.query()` to be executed.

### Flow Diagram:

```
Your Code ──► queryInterface.createTable()
                     │
                     ▼
        queryGenerator (dialect-specific SQL)
                     │
                     ▼
       sequelize.query(generated SQL)
                     │
                     ▼
              Actual Database
```

---

## 🔧 Commonly Used Methods

### Schema Management:

* `createTable(name, columns, options)`
* `dropTable(name)`
* `addColumn(table, column, definition)`
* `removeColumn(table, column)`
* `changeColumn(table, column, newDefinition)`
* `renameColumn(table, oldName, newName)`

### Constraints & Indexes:

* `addConstraint(table, options)`
* `removeConstraint(table, constraintName)`
* `addIndex(table, fields, options)`
* `removeIndex(table, indexName)`

### Seed Data:

* `bulkInsert(table, recordsArray, options)`
* `bulkDelete(table, where, options)`

### Raw SQL:

* `sequelize.query(sqlQuery, options)`

---

## 🔐 Example: Table with Foreign Key

```js
await queryInterface.createTable('Posts', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: Sequelize.STRING,
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',  // Table name
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});
```

---

## 🛡️ Best Practices

### ✅ Use Only in Migrations or Seeders

Avoid using `queryInterface` in runtime code.

### ✅ Stay Dialect-Agnostic

Use it for schema changes because it works consistently across databases.

### ✅ Avoid Mixing with Model Logic

Don't use `Model.createTable()` or direct SQL — keep migrations model-free.

### ✅ Write Reversible Migrations

Always define a matching `down()` for every `up()` change.

### ✅ Use `bulkInsert()` in Seeders

Seeders rely on `queryInterface.bulkInsert` rather than model-based inserts.

### ✅ Be Careful with `removeColumn()`

Removing columns is destructive — make sure to re-add it in `down()`.

---

## 🔎 queryInterface vs Models

| Aspect                 | queryInterface       | Sequelize Model       |
| ---------------------- | -------------------- | --------------------- |
| Level                  | Schema-level         | Data-level            |
| Used in                | Migrations, Seeders  | Runtime Code, Queries |
| Relies on              | Table & column names | Model definitions     |
| Aware of associations? | ❌ No                 | ✅ Yes                 |
| Dialect-aware?         | ✅ Yes                | ✅ Yes                 |

---

## 🧠 Summary

| Topic                | Answer                                                               |
| -------------------- | -------------------------------------------------------------------- |
| Provided by          | Sequelize core (not the DB)                                          |
| Purpose              | Schema changes, seed data, raw SQL                                   |
| Underlying mechanism | Uses dialect-specific QueryGenerator + sequelize.query()             |
| Safe for production? | ✅ Yes, when used via migrations                                      |
| Typical use case     | Creating/modifying tables, inserting seed data, managing constraints |

---

`queryInterface` gives you the full power of SQL without sacrificing Sequelize's cross-database portability. It’s the **foundation of reliable schema migrations** in Sequelize-based projects.

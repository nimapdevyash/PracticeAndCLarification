# Sequelize Seeders 

## 🌱 What Are Seeders?

Seeders in Sequelize are scripts that populate your database with **initial, default, or dummy data**. They are useful in development, testing, and even in production for setting up required base data.

Seeders are to **data** what **migrations** are to **schema**.

---

## 🧠 Why Use Seeders?

* ✅ Populate development environments
* ✅ Preload essential production data (roles, configs)
* ✅ Set up test databases quickly
* ✅ Keep inserts tracked and versioned
* ✅ Integrate with CI/CD pipelines

---

## ⚙️ How Do Seeders Work?

1. Generate a seeder:

   ```bash
   npx sequelize-cli seed:generate --name demo-user
   ```

2. Implement `up()` and `down()`:

   ```js
   module.exports = {
     up: async (queryInterface, Sequelize) => {
       await queryInterface.bulkInsert('Users', [
         {
           name: 'Alice',
           email: 'alice@example.com',
           createdAt: new Date(),
           updatedAt: new Date()
         }
       ]);
     },

     down: async (queryInterface, Sequelize) => {
       await queryInterface.bulkDelete('Users', { email: 'alice@example.com' });
     }
   };
   ```

3. Run seeders:

   ```bash
   npx sequelize-cli db:seed:all
   ```

---

## 🔧 Seeder Methods

| Method                       | Purpose                        |
| ---------------------------- | ------------------------------ |
| `bulkInsert(table, records)` | Insert multiple rows           |
| `bulkDelete(table, where)`   | Delete records matching filter |
| `sequelize.query(sql)`       | Execute raw SQL                |

---

## ⚠️ Considerations

* Seeders are **not tracked** by default — avoid duplicates manually
* Use `bulkDelete()` in `down()` for cleanup
* Use `new Date()` for `createdAt` and `updatedAt`
* For idempotency, use `truncate` or checks before insert

---

## ✨ Seeder vs Raw SQL Scripts

| Feature                  | Sequelize Seeders  | Raw SQL                   |
| ------------------------ | -------------------|---------------------------|
| ORM-aware                | ✅ Yes             | ❌ No                    |
| Cross-dialect            | ✅ Yes             | ❌ SQL-specific          |
| Trackable                | ✅ In Git          | ⚠️ Not always            |
| CI/CD friendly           | ✅ Yes             | ⚠️ Requires extra setup  |
| Requires DB shell access | ❌ No              | ✅ Yes                   |
| Undo support             | ✅ Yes (`down()`)  | ❌ Manual                |

---

## 📌 Use Cases

* Preloading roles and permissions
* Inserting product categories
* Creating dummy users or test data
* Populating static config tables

---

## 🔁 Seeder CLI Commands

```bash
npx sequelize-cli seed:generate --name seed-roles
npx sequelize-cli db:seed:all               # Run all seeders
npx sequelize-cli db:seed:undo              # Undo last
npx sequelize-cli db:seed:undo:all          # Undo all
```

---

## ✅ Best Practices

* Split seeders by context (roles, users, etc.)
* Write clean `down()` for rollbacks
* Use idempotent patterns if needed
* Avoid hardcoded IDs or timestamps
* Use bulkInsert with arrays and timestamps

---

## 🧠 Summary

| Concept                     | Value                                            |
| --------------------------- | ------------------------------------------------ |
| What                        | Data insertion scripts                           |
| Purpose                     | Populate dev/test/prod tables                    |
| Safe to run multiple times? | ❌ Not by default — be cautious                   |
| Reversible?                 | ✅ If you define `down()` properly                |
| Portable?                   | ✅ Uses app’s Sequelize config                    |
| Better than raw SQL?        | ✅ In many cases, yes (more portable and tracked) |

Seeders are buttered insert scripts — but written with intent, structure, and power. 🍞🧈

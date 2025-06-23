# Sequelize Scopes — Master Notes

## 🔍 What Are Scopes?

Scopes in Sequelize are predefined query fragments that can be reused across multiple queries. They help keep code clean, reduce duplication, and enforce data access rules.

---

## ✅ Types of Scopes

### 1. **Static Scope**

* Defined as an object
* Referred by name using `.scope('name')`

```js
User.addScope('isActive', {
  where: { isActive: true }
});

User.scope('isActive').findAll();
```

### 2. **Dynamic Scope (Method Scope)**

* Accepts parameters
* Returns a query fragment object

```js
User.addScope('byStatus', (status) => ({
  where: { status }
}));

User.scope({ method: ['byStatus', 'active'] }).findAll();
```

✅ You can pass **multiple parameters**:

```js
User.addScope('filterBy', (status, role, tenantId) => ({
  where: { status, role, tenantId }
}));

User.scope({ method: ['filterBy', 'active', 'admin', 12] }).findAll();
```

---

## 🧠 Internals & Behavior

### How Scopes Work

* When you call `.scope(...)`, Sequelize merges the scope's query fragment into the main query.
* If multiple `where` clauses exist (e.g., from the scope + your query), they are combined using **AND** logic.

```js
User.scope('isActive').findAll({
  where: { role: 'admin' }
});
```

Turns into:

```sql
WHERE isActive = true AND role = 'admin'
```

### Chaining Scopes

Scopes can be **stacked/chained**:

```js
User.scope('isActive', { method: ['byStatus', 'pending'] }).findAll();
```

---

## 📦 Scope Can Include:

Everything that you can put in a Sequelize query:

* `where`
* `order`
* `limit`, `offset`
* `include`
* `group`
* `having`
* `attributes`

```js
User.addScope('recentAdmins', {
  where: { role: 'admin' },
  order: [['createdAt', 'DESC']],
  limit: 5
});
```

---

## 🧩 Scoped Includes (Nested Models)

You can apply scopes on `include` models:

```js
User.findAll({
  include: [{
    model: Post.scope('published')
  }]
});
```

✅ Also works for nested includes.

---

## 🌐 Multi-Tenancy Example

```js
User.addScope('byTenant', (tenantId) => ({
  where: { tenantId }
}));
```

Multi-tenant apps use scopes to isolate data per organization.

---

## 🧱 Default Scope

Applies automatically unless overridden:

```js
sequelize.define('User', { ... }, {
  defaultScope: {
    where: { isDeleted: false }
  }
});

User.scope(null).findAll(); // disables default scope
```

---

## 📝 Best Practices

* Use **static scopes** for common filters
* Use **dynamic scopes** for contextual filters
* Use **defaultScope** for global constraints (like soft deletes)
* Combine with **multi-tenancy** for data isolation
* Use **scopes in includes** to filter associated models

---

## ✅ TL;DR

| Feature                      | Supported      |
| ---------------------------- | -------------- |
| Static scope                 | ✅              |
| Dynamic scope                | ✅              |
| Multiple parameters          | ✅              |
| Stacking scopes              | ✅              |
| WHERE clause                 | ✅              |
| ORDER, LIMIT, GROUP, INCLUDE | ✅              |
| Nested includes with scope   | ✅              |
| Default scope                | ✅              |
| Turn off default scope       | `.scope(null)` |

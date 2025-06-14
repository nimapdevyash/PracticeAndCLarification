
# Topics to cover today
- Sequelize 
    - query keywords regarding assosiations and include
        - distinct  => merges the childs based on the parent.id , thus giving the whole data but in a better structure. { NOTE: always use with include }
        - raw       => returns the json object only no metadata
        - nest      => used along with raw : true as it helps maintain the structure of the response
        - seperate  => "one query to fetch all the parents then n queries to fetch the children of each parent"
        - subquery  => "Don’t use a JOIN to fetch associated models. Do a separate query instead"
    - sequelize function and thier use cases
    - references , in schema defination for models
    - many to many relationship aliases ( as: "" )
    - when and when not use raw: true
        - implecations of it in nested includes
    - is it necessary to sync the db and some best practices
    - the flow of connecting the db and syncing and etc
    - how to pass data in response when you use raw: false, and we also don't want to pass the meta data in response
    - whats the best way to filter the parents based on the children

- git
    - stash
    - rebase
    - cherry pick
    - config
    - conflicts


- linux
    - filesystem
        - linode
        - file permissions and meta data
        - mounting
    - systemd and systemctl
    - ssh
    - curl


-------------------------------------------------------- Notes ------------------------------------------------------

## distinct vs seperate

- If you ever write limit or order in an include, you almost always need separate: true.

|-----------------------------------------------------------------------------------------------------------------------------------|
| Keyword             |    	    Scope           |                               Purpose                                             |
|-----------------------------------------------------------------------------------------------------------------------------------|
| distinct: true	  |  Parent-level query	    |   Ensures parent rows are not duplicated due to joins                             |
| separate: true	  |  Child-level include	|   Pulls children with separate subqueries, one per parent                         |
|-----------------------------------------------------------------------------------------------------------------------------------|

### caviates : 

|--------------------------------------------------------------------------------------------------------------------------------------|
| Situation                                     | Behavior                                                                             |
|--------------------------------------------------------------------------------------------------------------------------------------|
| You're using `separate`                       | Those child rows are **not included in the `COUNT`**                                 |
| You're filtering parent based on children     | Sequelize still **uses a JOIN internally** for the `WHERE`, even if `separate: true` |
| You're using nested includes (child of child) | `separate` works only one level deep — for more, you need manual recursion           |
|--------------------------------------------------------------------------------------------------------------------------------------|

### should we combine them : 

|-------------------------------------------------------------------------------------------------------------------------|
| Use Case                                                        | Recommendation                                        |
|-------------------------------------------------------------------------------------------------------------------------|
| You want accurate pagination of parents + well-limited children | ✅ Yes, combine them                                  |
| You don’t care about pagination                                 | ❌ Just use `separate: true`                          |
| You only want to dedupe parents from join chaos                 | ✅ Use only `distinct: true`                          |
| Your child tables are massive                                   | ❌ Avoid `separate` unless you batch queries properly |
|-------------------------------------------------------------------------------------------------------------------------|

### summary : 

|------------------|----------------------------------|---------------------------------|----------------|
| Keyword          | Controls...                      | Works With...                   | Use Together?  |
|------------------|----------------------------------|---------------------------------|----------------|
| `distinct: true` | Parent rows in `findAndCountAll` | Any include                     | ✅ Yes         |
| `separate: true` | Child rows per parent            | `hasMany`, `belongsToMany` only | ✅ Yes         |
|------------------|----------------------------------|---------------------------------|----------------|


### what problem each keyword solves

|---------------------------------------------------------|------------------------|
| Question                                                | You Answer With        |
|---------------------------------------------------------|------------------------|
| “Why are parent rows duplicating?”                      | `distinct: true`       |
| “Why isn’t my pagination working properly?”             | `subQuery: true/false` |
| “Why aren’t my children limited or ordered per parent?” | `separate: true`       |
|---------------------------------------------------------|------------------------|


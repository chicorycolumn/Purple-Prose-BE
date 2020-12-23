exports.up = function(knex) {
  return knex.schema.createTable("users", userTable => {
    userTable.string("username").primary();
    // userTable.string("avatar_url");
    // userTable.string("name").notNullable();
    userTable.string("password").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};

exports.up = function(knex) {
  return knex.schema.createTable(
    "users_comments_table",
    users_comments_table => {
      users_comments_table
        .string("voting_user")
        .notNullable()
        .references("users.username")
        .onDelete("CASCADE");
      users_comments_table
        .integer("comment_id")
        .notNullable()
        .references("comments.comment_id")
        .onDelete("CASCADE");
      users_comments_table.integer("inc_votes").defaultTo(0);
    }
  );
};

exports.down = function(knex) {
  return knex.schema.dropTable("users_comments_table");
};

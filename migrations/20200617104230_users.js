exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").unique();
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
  });

  await knex.schema.createTable("students", (table) => {
    table.increments("id").unique();
    table
      .integer("professor_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("image_url");
  });

  await knex.schema.createTable("projects", (table) => {
    table.increments("id").unique();
    table
      .integer("student_id")
      .notNullable()
      .references("id")
      .inTable("students")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.date("due_date");
    table.time("reminder_time");
    table.string("notes");
  });
  await knex.schema.createTable("reminders", (tbl) => {
    tbl.increments();
    tbl.string("message", 1024).notNullable();
    tbl.string("time_stamp", 128).defaultTo(knex.fn.now());
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("reminders");
  await knex.schema.dropTableIfExists("projects");
  await knex.schema.dropTableIfExists("students");
  await knex.schema.dropTableIfExists("users");
};


exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', users => {
        users.increments('userId');
        users.string('username', 128)
            .notNullable()
            .unique();
        users.string('password', 128).notNullable();
        users.string('firstName', 128).notNullable();
        users.string('lastName', 128).notNullable();
        users.string('email', 128).notNullable();
        users.string('phoneNumber', 12).notNullable();
    })
    .createTable('tables', table => {
        table.increments('tableId');
        table.string('restaurant', 128).notNullable();
        table.decimal('amountDue').notNullable();
        table.integer('peopleCount', 5).notNullable();
    })
    .createTable('tableUsernamePaid', table => {
        table.integer('tableId')
            .unsigned()
            .notNullable()
            .references('tableId')
            .inTable('tables')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('username')
            .unsigned()
            .notNullable()
            .references('username')
            .inTable('auth')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.boolean('paid').notNullable().defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('tableUsernamePaid')
    .dropTableIfExists('tables')
    .dropTableIfExists('users')
};


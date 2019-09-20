
exports.up = function(knex, Promise) {
    return knex.schema.createTable('auth', users => {
        users.increments('userId');
        users.string('username', 128)
            .notNullable()
            .unique();
        users.string('password', 128).notNullable();
    })
    .createTable('users', users => {
        users.increments('infoKey');
        users.integer('userId')
            .unsigned()
            .notNullable()
            .references('userId')
            .inTable('auth')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        users.string('firstName', 128).notNullable();
        users.string('lastName', 128).notNullable();
        users.string('email', 128).notNullable();
        users.string('phoneNumber', 12).notNullable();
    })
    .createTable('tables', table => {
        table.increments('tableId');
        table.string('restaurant', 128).notNullable();
        table.decimal('amountDue').notNullable();
    })
    .createTable('tableUsersPaid', table => {
        table.integer('tableId')
            .unsigned()
            .notNullable()
            .references('tableId')
            .inTable('tables')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('userId')
            .unsigned()
            .notNullable()
            .references('userId')
            .inTable('auth')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.boolean('paid').notNullable().defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('tableUsersPaid')
    .dropTableIfExists('tables')
    .dropTableIfExists('users')
    .dropTableIfExists('auth');
};


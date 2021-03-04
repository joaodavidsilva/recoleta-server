import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email', 100).notNullable();
        table.string('whatsapp', 20).notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('street').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('points');
}
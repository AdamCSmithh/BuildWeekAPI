exports.up = async function(knex) {
    await knex.schema
      .createTable('users', (users)=>{
          users.increments('user_id')
          users.string('username', 200).notNullable().unique()
          users.string('password', 200).notNullable()
          users.string('phone_number', 10).notNullable().unique()
          users.timestamps(false, true)
  
      })
      .createTable('products', (products)=>{
          products.increments('product_id')
          products.string('productname', 200).notNullable()
          products.string('department', 200).notNullable()
          products.decimal('price', 255).notNullable()
          products.string('image')
          products
              .integer('user_id')
              .unsigned()
              .notNullable()
              .references('user_id')
              .inTable('users')
              .onDelete('RESTRICT')
              .onUpdate('RESTRICT')
      })
  }
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('products')
    await knex.schema.dropTableIfExists('users')
  }
const db = require('../data/db-config')

function get() {
  return db('products')
}

function getBy(filter) {
  return db('products').where(filter).orderBy("product_id")
}

function getById(product_id) {
  return db('products').where('product_id', product_id).first()
}

function update(product_id, changes) {
  return db('products').where('product_id', product_id).first().update(changes)
}

function remove(product_id) {
  return db('products').where('product_id', product_id).first().del()
}

async function add(newproduct) {
  const [product] = await db('products').insert(newproduct, ['product_id', 'nickname', 'species', 'h2oFrequency', 'image', 'user_id'])
  return product;
}

module.exports = {
  get,
  getBy,
  getById,
  add,
  update,
  remove,
}
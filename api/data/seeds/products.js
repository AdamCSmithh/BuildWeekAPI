exports.seed = async function (knex) {
    await knex("products").insert([
      {
        productname: "Cast Iron Pot",
        department: "kitchen",
        price: 15,
        user_id: 1,
        image: ''
      },
      {
        productname: "Samsung Television",
        department: "electronics",
        price: 699,
        user_id: 2,
        image: ''
      },
    ])
  }
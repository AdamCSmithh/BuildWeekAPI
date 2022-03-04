const db = require('../data/db-config.js')
//pay attention to database
const findBy = (filter) => {
    return db('users').where(filter);
}

const findById = (id) => {
    return db('users').where('user_id', id).first();
}

async function add(newUser) {
    await db('users').insert(newUser);
    const userArray = await findBy({username: newUser.username});
    return userArray[0];
}

module.exports = {
    findBy,
    findById,
    add
}
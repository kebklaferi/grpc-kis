const config = {
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'kisdb',
        port: '3306',
    }
};

const knex = require('knex')(config);
module.exports = knex;
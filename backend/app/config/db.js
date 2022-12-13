const { Sequelize } = require('sequelize');

// db_name, user, password
const sequelize = new Sequelize('Supermarket', 'root', 'root', {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 8889
});

try {
    sequelize.authenticate().then(msg => console.log('Connection has been established successfully  || ', msg))
} catch(err) {
    console.log('Unable to connect to the database: ', err)
}
 
module.exports = sequelize
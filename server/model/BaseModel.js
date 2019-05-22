const mysql = require('mysql2')
const config = require('../config/defaultConfig')

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    charset: 'utf8'
})

let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection( (err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    })
}

module.exports = query;
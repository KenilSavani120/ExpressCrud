import mysql from 'mysql2/promise'

export const mySqlPool = mysql.createPool({
    host : "localhost",
    user : "root",
    password:"root",
    database:"user_db"
})
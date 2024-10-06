import mysql from 'mysql2/promise'

export const conexion = await mysql.createConnection({
    host: 'localhost',
    user: 'artemio',
    password: 'admin',
    database: "reclamos"
})

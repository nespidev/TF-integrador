import mysql from 'mysql2/promise'
/*
export const conexion = await mysql.createConnection({
    host: 'localhost',
    user: 'mariaReclamos',
    database:'reclamos',
    password:'maria1234',
})

*/
// export const conexion = await mysql.createConnection({
//     host: 'localhost',
//     user: 'artemio',
//     database: 'reclamos',
//     password: 'admin',
// })


export const conexion = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database:'reclamos',
    password:'Root123.',
})

// export const conexion = await mysql.createConnection({
//     host: 'localhost',
//     user: 'nicolas',
//     database:'reclamos',
//     password:'admin',
// })



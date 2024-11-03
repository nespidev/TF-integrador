import { conexion } from "./conexion.js";

export default class Usuario {

        buscarPorId = async (id) => {
            const sql =  `SELECT usuarios.nombre,usuarios.apellido,usuarios.correoElectronico,usuarios.idUsuarioTipo,
             usuarios_tipo.descripcion AS usuarioTipoDescripcion, usuarios_tipo.activo AS tipoActivo,
             usuarios.imagen, usuarios.activo AS usuarioActivo
             FROM usuarios 
             INNER JOIN usuarios_tipo ON usuarios_tipo.idUsuarioTipo = usuarios.idUsuarioTipo
            WHERE usuarios.activo = 1 AND usuarios.idUsuario = ?`;
            const [result] = await conexion.query(sql, [id]);
            return (result.length > 0) ? result[0] : null;
        }

        buscarTodos= async()=>{
            const sql = `SELECT usuarios.nombre,usuarios.apellido,usuarios.correoElectronico,usuarios.idUsuarioTipo,
             usuarios_tipo.descripcion AS usuarioTipoDescripcion, usuarios_tipo.activo AS tipoActivo,
             usuarios.imagen, usuarios.activo AS usuarioActivo
             FROM usuarios 
             INNER JOIN usuarios_tipo ON usuarios_tipo.idUsuarioTipo = usuarios.idUsuarioTipo
            WHERE usuarios.activo = 1`
            const [result] = await conexion.query(sql);
            return result;
            
        } 

        buscar = async (correoElectronico, contrasenia) => {
            const sql = `SELECT u.idUsuario, CONCAT(u.nombre, ' ', u.apellido) as usuario, u.idUsuarioTipo
                         FROM usuarios AS u
                         WHERE u.correoElectronico = ? 
                           AND u.contrasenia = SHA2(?, 256) 
                           AND u.activo = 1;`;
            const [result] = await conexion.query(sql, [correoElectronico, contrasenia]);
            console.log("Resultado de la consulta SQL:", result);
            return result[0] || null; // Devuelve el primer usuario encontrado o null si no hay resultados
        }

        crear = async({nombre,apellido,correoElectronico,contrasenia,idUsuarioTipo,imagen})=>{     
            const sql = `INSERT INTO usuarios(nombre, apellido, correoElectronico, contrasenia,
             idUsuarioTipo, imagen, activo) VALUES (?, ?, ?, SHA2(?, 256), ?, ?, 1)`;

            const [result] = await conexion.query(sql, [nombre, apellido, correoElectronico, contrasenia,idUsuarioTipo,imagen]);
            return  result   
        }

        actualizar = async (id, datos) => {
            const sql = 'UPDATE usuarios SET ? WHERE idUsuario = ?';
            const [result] = await conexion.query(sql, [datos,id]);
            return result
        }
}



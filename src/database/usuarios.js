import { conexion } from "./conexion.js";

export default class Usuario {

        buscarPorId = async (id) => {
            const sql =  `SELECT usuarios.nombre,usuarios.apellido,usuarios.correoElectronico,usuarios.idTipoUsuario,
             usuarios_tipo.descripcion AS usuarioTipoDescripcion, usuarios_tipo.activo AS tipoActivo,
             usuarios.imagen, usuarios.activo AS usuarioActivo
             FROM usuarios 
             INNER JOIN usuarios_tipo ON usuarios_tipo.idUsuarioTipo = usuarios.idTipoUsuario
            WHERE usuarios.activo = 1 AND usuarios.idUsuario = ?`;
            const [result] = await conexion.query(sql, [id]);
            return (result.length > 0) ? result[0] : null;
        }

        buscarTodos= async()=>{
            const sql = `SELECT usuarios.nombre,usuarios.apellido,usuarios.correoElectronico,usuarios.idTipoUsuario,
             usuarios_tipo.descripcion AS usuarioTipoDescripcion, usuarios_tipo.activo AS tipoActivo,
             usuarios.imagen, usuarios.activo AS usuarioActivo
             FROM usuarios 
             INNER JOIN usuarios_tipo ON usuarios_tipo.idUsuarioTipo = usuarios.idTipoUsuario
            WHERE usuarios.activo = 1`
            const [result] = await conexion.query(sql);
            return result;
            
        } 

        crear = async({nombre,apellido,correoElectronico,contrasenia,idTipoUsuario,imagen})=>{     
            const sql = `INSERT INTO usuarios(nombre, apellido, correoElectronico, contrasenia,
             idTipoUsuario, imagen, activo) VALUES (?, ?, ?, SHA2(?, 256), ?, ?, 1)`;

            const [result] = await conexion.query(sql, [nombre, apellido, correoElectronico, contrasenia,idTipoUsuario,imagen]);
            return  result   
        }

        actualizar = async (id, datos) => {
            const sql = 'UPDATE usuarios SET ? WHERE idUsuario = ?';
            const [result] = await conexion.query(sql, [datos,id]);
            return result
        }
}



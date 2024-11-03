import { conexion } from "./conexion.js";


export default class UsuariosOficinas {
    buscarTodos= async () =>  {
        const sql = 'SELECT * FROM usuarios_oficinas WHERE activo = 1;'
        const [result] = await conexion.query(sql)
        return result
    }

    buscarPorId = async (id) => {
        const sql = 'SELECT * FROM usuarios_oficinas WHERE activo = 1 AND idUsuarioOficina = ?';
        const [result] = await conexion.query(sql, [id]);
        return (result.length > 0) ? result[0] : null;
    }

    crear = async ({idUsuario, idOficina, activo}) => {        
        const sql = 'INSERT INTO usuarios_oficinas (idUsuario, idOficina, activo) VALUES (?,?,?)';
        const [result] = await conexion.query(sql, [idUsuario, idOficina, activo]);
        return  result   
    }

    actualizar = async (id, datos) => {
        const sql = 'UPDATE usuarios_oficinas SET ? WHERE idUsuarioOficina = ?';
        const [result] = await conexion.query(sql, [datos,id]);
        return result
    }

    eliminar = async (id) => {
        const sql = 'DELETE FROM usuarios_oficinas WHERE activo = 1 AND idUsuarioOficina = ?';
        const [result] = await conexion.query(sql, [id]);
        return (result.length > 0) ? result[0] : null;
    }
}
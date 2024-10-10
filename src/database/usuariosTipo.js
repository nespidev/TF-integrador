import { conexion } from "./conexion.js";

export default class UsuariosTipo {

    buscarTodos = async () => {
        const sql = 'SELECT * FROM usuarios_tipo WHERE activo = 1;';
        const [result] = await conexion.query(sql);
        return result;
    }

    buscarPorId = async (id) => {
        const sql = 'SELECT * FROM usuarios_tipo WHERE activo = 1 AND idUsuarioTipo = ?';
        const [result] = await conexion.query(sql, [id]);
        return (result.length > 0) ? result[0] : null;
    }

    crear = async ({descripcion, activo}) => {        
        const sql = 'INSERT INTO usuarios_tipo (descripcion, activo) VALUES (?,?)';
        const [result] = await conexion.query(sql, [descripcion, activo]);
        return  result   
    }

    actualizar = async (id, datos) => {
        const sql = 'UPDATE usuarios_tipo SET ? WHERE idUsuarioTipo = ?';
        const [result] = await conexion.query(sql, [datos,id]);
        return result
    }
}
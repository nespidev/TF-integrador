import { conexion } from "./conexion.js";

export default class ReclamosEstados {

    buscarTodos = async () => {
        const sql = 'SELECT * FROM reclamos_estado WHERE activo = 1;';
        const [result] = await conexion.query(sql);
        return result;
    }

    buscarPorId = async (id) => {
        const sql = 'SELECT * FROM reclamos_estado WHERE activo = 1 AND idReclamoEstado = ?';
        const [result] = await conexion.query(sql, [id]);
        return (result.length > 0) ? result[0] : null;
    }

    crear = async (descripcion, activo) => {
        
    }

    actualizar = async () => {
        
    }
}
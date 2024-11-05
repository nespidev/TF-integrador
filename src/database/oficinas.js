import { conexion } from "./conexion.js";


export default class Oficinas{

    buscarTodos= async()=>{
        const sql = `SELECT oficinas.idOficina, oficinas.nombre, oficinas.activo AS activo_oficina,
        oficinas.idReclamoTipo, reclamos_tipo.descripcion AS descripcion_reclamo, reclamos_tipo.activo AS activo_reclamo 
        FROM oficinas 
        INNER JOIN reclamos_tipo ON reclamos_tipo.idReclamoTipo = oficinas.idReclamoTipo
        WHERE oficinas.activo = 1`;
        const [result] = await conexion.query(sql);
        return result;
    } 
 
    buscarPorId = async (id) => {
        const sql = `SELECT oficinas.idOficina, oficinas.nombre, oficinas.activo AS activo_oficina,
        reclamos_tipo.descripcion AS descripcion_reclamo, reclamos_tipo.activo AS activo_reclamo 
        FROM oficinas 
        INNER JOIN reclamos_tipo ON reclamos_tipo.idReclamoTipo = oficinas.idReclamoTipo
        WHERE oficinas.activo = 1 AND oficinas.idOficina = ?`;
        const [result] = await conexion.query(sql, [id]);
        return (result.length > 0) ? result[0] : null;
    }

    crear = async ({nombre, idReclamoTipo, activo}) => {        
        const sql = 'INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?,?,?)';
        const [result] = await conexion.query(sql, [nombre, idReclamoTipo, activo]);
        return  result   
    }

    actualizar = async (id, datos) => {
        const sql = 'UPDATE oficinas SET ? WHERE idOficina = ?';
        const [result] = await conexion.query(sql, [datos,id]);
        return result
    }
}
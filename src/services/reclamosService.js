import Reclamos from "../database/reclamos.js";

export default class ReclamosService {
    constructor() {
        this.reclamos = new Reclamos();
    }

    buscarTodos = async () => {
        return await this.reclamos.buscarTodos();
    }

    buscarPorId = async (id) => {
        const result = await this.reclamos.buscarPorId(id);
        return (result.length > 0) ? result[0] : null;
    }

    crear = async (reclamo) => {
        const reclamoCreado = await this.reclamos.crear(reclamo);
        if (!reclamoCreado) {
            return { estado: false, mensaje: 'Reclamo no creado' };
        }
        return { estado: true, mensaje: 'Reclamo creado', data: await this.buscarPorId(reclamoCreado.insertId) };
    }

    modificar = async (id, datos) => {
        await this.reclamos.modificar(id, datos);
        const result = await this.buscarPorId(id)
        if (result === null) {
            return {estado: false, mensaje: 'idReclamo no existe'};
        } 
        if (!result) {
            return { estado: false, mensaje: 'Reclamo no modificado' };
        }
        return {estado: true, mensaje: 'Reclamo modificado con exito', data: result}
    }
}
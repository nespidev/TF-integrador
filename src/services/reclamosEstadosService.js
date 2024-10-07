import ReclamosEstados from "../database/reclamosEstados.js";

export default class ReclamosEstadosService {

    constructor() {
        this.reclamosEstados = new ReclamosEstados();
    }

    buscarTodos = () => {
        return this.reclamosEstados.buscarTodos();
    }

    buscarPorId = (id) => {
        return this.reclamosEstados.buscarPorId(id);
    }

    actualizar = (id, datos) => {
        return this.reclamosEstados.actualizar(id, datos);
    }

}
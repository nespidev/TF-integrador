import UsuariosTipo from "../database/usuariosTipo.js"

export default class UsuariosTipoService {

    constructor() {
        this.usuariosTipo = new UsuariosTipo();
    }

    buscarTodos = () => {
        return this.usuariosTipo.buscarTodos();
    }

    buscarPorId = (id) => {
        return this.usuariosTipo.buscarPorId(id);
    }

    crear = (usuariosTipo) => {
        return this.usuariosTipo.crear(usuariosTipo);
    }

    actualizar = (id, datos) => {
        return this.usuariosTipo.actualizar(id, datos);
    }

}
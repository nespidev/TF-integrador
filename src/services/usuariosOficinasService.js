import UsuariosOficinas from "../database/usuariosOficinas.js";



export default class UsuariosOficinasService{
    constructor(){
        this.usuariosOficinas = new UsuariosOficinas();
    }

    buscarTodos = () =>{
        return this.usuariosOficinas.buscarTodos();
    }

    buscarPorId = (id) =>{
        return this.usuariosOficinas.buscarPorId(id);
    }

    crear = (usuariosOficinas) => {
        return this.usuariosOficinas.crear(usuariosOficinas);
    }

    actualizar = (id, datos) => {
        return this.usuariosOficinas.actualizar(id, datos);
    }

    eliminar = (id) =>{
        return this.usuariosOficinas.eliminar(id);
    }

}


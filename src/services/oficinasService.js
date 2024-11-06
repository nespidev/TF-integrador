import Oficinas from "../database/oficinas.js"



export default class OficinasService{

    constructor(){
        this.oficinas = new Oficinas();
    }

    buscarTodos= ()=>{
        return this.oficinas.buscarTodos();
    }

    buscarPorId = (id) => {
        return this.oficinas.buscarPorId(id);
    }

    crear = (oficina) => {
        return this.oficinas.crear(oficina);
    }

    actualizar = (id, datos) => {
        return this.oficinas.actualizar(id, datos);
    }

}
import Usuarios from "../database/usuarios.js"

export default class UsuariosService {

    constructor() {
        this.usuarios = new Usuarios();
    }

    buscarPorId = (id) => {
        return this.usuarios.buscarPorId(id);
    }

    buscarTodos= ()=>{
        return this.usuarios.buscarTodos();
    }

    crear = async (usuario) => {
        const usuarioCreado = await this.usuarios.crear(usuario);
        if (!usuarioCreado) {
            return { estado: false, mensaje: 'Usuario no creado' };
        }
        return { estado: true, mensaje: 'Usuario creado', data: await this.buscarPorId(usuarioCreado.insertId) };
    }


    actualizar = async (id, datos) => {
        await this.usuarios.actualizar(id, datos);

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
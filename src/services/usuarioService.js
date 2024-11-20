import Usuarios from "../database/usuarios.js"

export default class UsuariosService {

    constructor() {
        this.usuarios = new Usuarios();
    }

    buscarPorId = (id) => {
        return this.usuarios.buscarPorId(id);
    }

    buscar = async (correoElectronico, contrasenia) => {
        const usuario = await this.usuarios.buscar(correoElectronico, contrasenia);
        
        return usuario;
    }

    buscarTodos= ()=>{
        return this.usuarios.buscarTodos();
    }

    buscarCorreoEnUso = async (correoElectronico) => {
        const correo = await this.usuarios.buscarCorreoEnUso(correoElectronico);
        return correo;
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
            return {estado: false, mensaje: 'idUsuario no existe'};
        } 
        if (!result) {
            return { estado: false, mensaje: 'Usuario no modificado' };
        }
        return {estado: true, mensaje: 'Reclamo modificado con exito', data: result}
    }
}
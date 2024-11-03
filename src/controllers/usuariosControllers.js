import { request, response } from "express";
import UsuariosServer from "../services/usuarioServices.js"

export default class UsuariosControllers{

    constructor() {
        this.usuariosService = new UsuariosServer;
    }

    buscarTodos = async (request, response) => {
        try {
          const usuarios = await this.usuariosService.buscarTodos();
          response.status(200).json(usuarios)
        } catch (error) {
          console.error(error);
          response.status(500).send({
            estado: 'Falla',
            mensaje: 'Error interno en servidor'
          });
        }
      }
   
      
    buscarPorId = async (request, response) => {

        try {
          const id = request.params.id;
            const error = this.#checkId(id);
          if (error) {
            return response.status(400).json(error);
          }
          const result = await this.usuariosService.buscarPorId(id);
    
          if (!result || result.length === 0) {
            return response.status(400).json({ message: 'No se encontro tipo de usuario con ese id' });
          }
          response.status(200).json({ estado: true, result: result });
    
        } catch (error) {
            console.log(error)
          response.status(500).json({ message: 'Lo sentimos, ha ocurrido un error en el servidor.' });
        }
      }
    
    crear = async (req, res) => {
      const { nombre,apellido,correoElectronico,contrasenia,idUsuarioTipo,imagen } = req.body;
    
            if (apellido === undefined || apellido === null) {
              return res.status(400).send({
                  estado: "Falla",
                  mensaje: "Faltan completar el campo apellido."
              })
          }
    
        try {
          const usuario = {
            nombre,
            apellido,
            correoElectronico,
            contrasenia,
            idUsuarioTipo,
            imagen
          }
    
          const result = await this.usuariosService.crear(usuario);

          if (!result.estado) {
                res.status(404).send({ estado: "Falla", mensaje: result.mensaje });
                console.log(result)
            }
            res.status(201).send({ estado: "OK", data: result.data });

    
        } catch (error) {
          console.error(error);
          res.status(500).send({
            estado: 'Falla',
            mensaje: 'Error interno en servidor'
          });
        }
      }

    actualizar = async (req, res) => {
        try {
            const id = req.params.id;
            const error = this.#checkId(id);
            if (error) {
                return res.status(400).json(error);
            }

            const datos = req.body;
            if (Object.keys(datos).length === 0) {
                return res.status(400).send({
                    estado: "Falla",
                    mensaje: "No se enviaron datos para ser modificados."
                });
            }

            const result = await this.usuariosService.actualizar(id, datos);
            if (result.estado) {
                res.status(200).send({ estado: "OK", mensaje: result.mensaje, data: result.data });
            } else {
                res.status(404).send({ estado: "Falla", mensaje: result.mensaje });
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({
                estado: "Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    #checkId(id) {
      if (id === undefined) {
          return { message: 'El id es requerido' };
      }
      if (isNaN(id)) {
          return { message: 'El id debe ser un número' };
      }
      if (!Number.isInteger(Number(id))) {
          return { message: 'El id debe ser un número entero' };
      }
      if (id <= 0) {
          return { message: 'El id debe ser un número positivo' };
      }
      return null;
  }

}

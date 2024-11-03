import UsuariosOficinasService from "../services/usuariosOficinasService.js";
import { request, response } from "express";


export default class UsuariosOficinasController {
    
    constructor() {
        this.service = new UsuariosOficinasService()
    }

    buscarTodos = async (req,res) =>{
        try {
           const usuariosOficinas = await this.service.buscarTodos();
            res.status(200).send(usuariosOficinas)

        } catch (error) {
            console.log(error);
            res.status(500).send({
                estado: "falla",
                mensaje: "Error en servidor"
            })
            
        }
    }

    buscarPorId = async (req, res) => {
        try {
          const id = req.params.id;
          const error = this.#checkId(id);
          if (error) {
            return res.status(400).json(error);
          }
          const result = await this.service.buscarPorId(id);
    
          if (!result || result.length === 0) {
            return response.status(400).json({ message: 'No se encontro tipo de usuario con ese id' });
          }
          res.status(200).json({ estado: true, result: result });
        } catch (error) {
          res.status(500).json({ message: 'Lo sentimos, ha ocurrido un error en el servidor.' });
        }
      }

      
      crear = async (req, res) => {

        const { idUsuario, idOficina, activo } = req.body;
        if (!idUsuario) {
          return res.status(400).send({
            estado: "falla",
            mensaje: "se requiere el campo idUsuario."
          })
        }
        
        if (!idOficina) {
          return res.status(400).send({
            estado: "falla",
            mensaje: "se requiere el campo idOficina."
          })
        }
    
        if (activo === undefined || activo === null) {
          return res.status(400).send({
            estado: "falla",
            mensaje: "Se requiere el campo activo."
          })
        }
    
        try {
          const usuariosOficina = {
            idUsuario,
            idOficina,
            activo
          }
          
          const result = await this.service.crear(usuariosOficina);
          if (result.affectedRows === 0) {
            return res.status(404).json({
              mensaje: "No se pudo crear el UsuarioOficina."
            })
          }
          const nuevoUsuariosOficina = await this.service.buscarPorId(result.insertId);
            res.status(201).send({
                estado: "Ok", data: nuevoUsuariosOficina
            });
          
    
        } catch (error) {
          console.error(error);
          res.status(500).send({
            estado: 'Falla',
            mensaje: 'Error interno en servidor'
          });
        }
      }

      actualizar = async (request, response) => {
          const { idUsuario, idOficina, activo } = request.body;
          const id = request.params.id;
    
          const error = this.#checkId(id);
          if (error) {
            return response.status(400).json(error);
          }
    
          if (!idUsuario) {
            return res.status(400).send({
              estado: "falla",
              mensaje: "se requiere el campo idUsuario."
            })
          }
          
          if (!idOficina) {
            return res.status(400).send({
              estado: "falla",
              mensaje: "se requiere el campo idOficina."
            })
          }
      
          if (activo === undefined || activo === null) {
            return res.status(400).send({
              estado: "falla",
              mensaje: "Se requiere el campo activo."
            })
          }
        try {
    
            const usuariosOficina = {
                idUsuario,
                idOficina,
                activo
              }
    
          const result = await this.service.actualizar(id,usuariosOficina);
    
          console.log(result)
          if (result.affectedRows === 0) {
            return response.status(404).json({
              mensaje: "No se ha encontrado la información que estás buscando. Por favor, verifica los campos ingresados e intenta nuevamente."
            })
          }
    
          response.status(200).json({
            mensaje: "usuario Oficina modificada"
          })
    
        } catch (error) {
          console.log(error)
          response.status(500).json({
            mensaje: 'Error en el intento.'
          })
        }
      }
    
      eliminar = async (req, res) => {
        try {
            const id = req.params.id;
            const error = this.#checkId(id);
            if (error) {
              return res.status(400).json(error);
            }
            const result = await this.service.eliminar(id);
            console.log(result);
            
            res.status(200).json({ mensaje: "usuario Oficina eliminada" });
          } catch (error) {
            res.status(500).json({ message: 'Lo sentimos, ha ocurrido un error en el servidor.' });
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
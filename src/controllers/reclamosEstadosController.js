import { request, response } from "express";
import ReclamosEstadosService from "../services/reclamosEstadosService.js";

export default class ReclamosEstadosController {

  constructor() {
    this.reclamosEstadosService = new ReclamosEstadosService();
  }

  buscarTodos = async (request, response) => {
    try {
      const reclamosEstados = await this.reclamosEstadosService.buscarTodos();
      response.status(200).json(reclamosEstados)
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
      //const { id } = request.params; // lo mismo 
      const id = request.params.id;
      const result = await this.reclamosEstadosService.buscarPorId(id);

      if (result.length === 0) {
        return response.status(400).json({ message: 'No se encontro el reclamo con ese id' });
      }
      response.status(200).json({ estado: true, result: result });

    } catch (error) {
      response.status(500).json({ message: 'Error al obtener los reclamos ' + error.message });
    }
  }

  crear = async (req, res) => {

    const { descripcion, activo } = req.body;
    if (!descripcion) {
      return res.status(400).send({
        estado: "falla",
        mensaje: "se requiere el campo descripción."
      })
    }

    if (activo === undefined || activo === null) {
      return res.status(400).send({
        estado: "falla",
        mensaje: "Se requiere el campo activo."
      })
    }

    try {
      const reclamoEstado = {
        descripcion,
        activo
      }

      const result = await this.reclamosEstadosService.crear(reclamoEstado);
      if (result.affectedRows === 0) {
        return res.status(404).json({
          mensaje: "No se pudo crear el Reclamo-estado."
        })
      }

      const nuevoReclamoEstado = await this.reclamosEstadosService.buscarPorId(result.insertId);
      res.status(201).send({
        estado: "Ok", data: nuevoReclamoEstado
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
    try {
      const { descripcion, activo } = request.body;
      const id = request.params.id;

      console.log(activo)
      if (!descripcion) {
        return response.status(404).json({
          mensaje: "Se requiere el campo descripcion"
        })
      }

      if (!activo) {
        return response.status(404).json({
          mensaje: "Se requiere completar el campo activo"
        })
      }

      const datos = {
        descripcion: descripcion,
        activo: activo
      }

      const result = await this.reclamosEstadosService.actualizar(id, datos);

      console.log(result)
      if (result.affectedRows === 0) {
        return response.status(404).json({
          mensaje: "No se pudo modico la inf."
        })
      }

      response.status(200).json({
        mensaje: "Reclamo modificado"
      })

    } catch (error) {
      console.log(error)
      response.status(500).json({
        mensaje: 'Error en el intento.'
      })
    }
  }

   
}
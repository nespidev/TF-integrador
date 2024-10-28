import { request, response } from "express";
import UsuariosTipoService from "../services/usuariosTipoService.js";

export default class UsuariosTipoController {

  constructor() {
    this.usuariosTipoService = new UsuariosTipoService;
  }

  buscarTodos = async (request, response) => {
    try {
      const usuariosTipo = await this.usuariosTipoService.buscarTodos();
      response.status(200).json(usuariosTipo)
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
      const result = await this.usuariosTipoService.buscarPorId(id);

      if (!result || result.length === 0) {
        return response.status(400).json({ message: 'No se encontro tipo de usuario con ese id' });
      }
      response.status(200).json({ estado: true, result: result });

    } catch (error) {
      response.status(500).json({ message: 'Lo sentimos, ha ocurrido un error en el servidor.' });
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
      const usuarioTipo = {
        descripcion,
        activo
      }

      const result = await this.usuariosTipoService.crear(usuarioTipo);
      if (result.affectedRows === 0) {
        return res.status(404).json({
          mensaje: "No se pudo crear el tipo de usuario."
        })
      }

      const nuevoUsuariosTipo = await this.usuariosTipoService.buscarPorId(result.insertId);
      res.status(201).send({
        estado: "Ok", data: nuevoUsuariosTipo
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

      const error = this.#checkId(id);
      if (error) {
        return response.status(400).json(error);
      }

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

      const result = await this.usuariosTipoService.actualizar(id, datos);

      console.log(result)
      if (result.affectedRows === 0) {
        return response.status(404).json({
          mensaje: "No se ha encontrado la información que estás buscando. Por favor, verifica los campos ingresados e intenta nuevamente."
        })
      }

      response.status(200).json({
        mensaje: "Tipo de usuarios modificado"
      })

    } catch (error) {
      console.log(error)
      response.status(500).json({
        mensaje: 'Error en el intento.'
      })
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
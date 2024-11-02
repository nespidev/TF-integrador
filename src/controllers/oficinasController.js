import OficinasService from "../services/oficinasService.js"

export default class OficinasController {

  constructor() {
    this.oficinasService = new OficinasService();
  }

  buscarTodos = async (request, response) => {
    try {
      const oficinas = await this.oficinasService.buscarTodos();
      response.status(200).json({oficinas})
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
      const result = await this.oficinasService.buscarPorId(id);

      if (!result || result.length === 0) {
        return response.status(400).json({ message: 'No se encontro oficina con ese id' });
      }
      response.status(200).json({ estado: true, result: result });

    } catch (error) {
      response.status(500).json({ message: 'Lo sentimos, ha ocurrido un error en el servidor.' });
    }
  }

  crear = async (req, res) => {

    const { nombre, idReclamoTipo, activo } = req.body;
    if (!nombre) {
      return res.status(400).send({
        estado: "falla",
        mensaje: "se requiere el campo nombre."
      })
    }
    
    if (!idReclamoTipo) {
      return res.status(400).send({
        estado: "falla",
        mensaje: "se requiere el campo idReclamoTipo."
      })
    }

    if (activo === undefined || activo === null) {
      return res.status(400).send({
        estado: "falla",
        mensaje: "Se requiere el campo activo."
      })
    }

    try {
      const oficina = {
        nombre,
        idReclamoTipo,
        activo
      }

      const result = await this.oficinasService.crear(oficina);
      if (result.affectedRows === 0) {
        return res.status(404).json({
          mensaje: "No se pudo crear la oficina."
        })
      }

      const nuevaOficina = await this.oficinasService.buscarPorId(result.insertId);
      res.status(201).send({
        estado: "Ok", data: nuevaOficina
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
      const { nombre, idReclamoTipo, activo } = request.body;
      const id = request.params.id;

      const error = this.#checkId(id);
      if (error) {
        return response.status(400).json(error);
      }

      const errorReclamo = this.#checkId(idReclamoTipo);
      if (errorReclamo) {
        return response.status(400).json(error);
      }

      if (!nombre) {
        return response.status(404).json({
          mensaje: "Se requiere el campo nombre"
        })
      }

      if (!idReclamoTipo) {
        return response.status(404).json({
          mensaje: "Se requiere el campo idReclamoTipo"
        })
      }

      if (!activo) {
        return response.status(404).json({
          mensaje: "Se requiere el campo activo"
        })
      }

      const datos = {
        nombre: nombre,
        idReclamoTipo: idReclamoTipo,
        activo: activo
      }

      const result = await this.oficinasService.actualizar(id, datos);

      console.log(result)
      if (result.affectedRows === 0) {
        return response.status(404).json({
          mensaje: "No se ha encontrado la información que estás buscando. Por favor, verifica los campos ingresados e intenta nuevamente."
        })
      }

      response.status(200).json({
        mensaje: "Oficina modificada"
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
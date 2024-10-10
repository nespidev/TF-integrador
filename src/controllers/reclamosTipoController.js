import ReclamosTipoService from "../services/reclamosTipoService.js";


export default class ReclamosTipoController{

    constructor(){
        this.service = new ReclamosTipoService();

    }

    buscarTodos =async (req,res) =>{
        try{
            const reclamosTipo = await this.service.buscarTodos();
            res.status(200).send(reclamosTipo);
        } catch (error){
            console.log(error);
            res.status(500).send({
                estado: "Falla", mensaje: "Error interno en servidor"
            });
        }
    }

    buscarPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const result = await this.service.buscarPorId(id);
            if (result.length === 0) {
                return res.status(400).json({ message: 'No se encontro el reclamo con ese id' });
            }
            res.status(200).json({ estado: true, result: result });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los reclamos ' + error.message });
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
          const reclamosTipo = {
            descripcion,
            activo
          }
    
          const result = await this.service.crear(reclamosTipo);
          if (result.affectedRows === 0) {
            return res.status(404).json({
              mensaje: "No se pudo crear el Reclamo-tipo."
            })
          }
    
          const nuevoReclamoTipo = await this.service.buscarPorId(result.insertId);
          res.status(201).send({
            estado: "Ok", data: nuevoReclamoTipo
          });
    
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
          const { descripcion, activo } = req.body;
          const id = req.params.id;
    
          console.log(activo)
          if (!descripcion) {
            return res.status(404).json({
              mensaje: "Se requiere el campo descripcion"
            })
          }
    
          if (!activo) {
            return res.status(404).json({
              mensaje: "Se requiere completar el campo activo"
            })
          }
    
          const datos = {
            descripcion: descripcion,
            activo: activo
          }
    
          const result = await this.service.actualizar(id, datos);
    
          console.log(result)
          if (result.affectedRows === 0) {
            return res.status(404).json({
              mensaje: "No se pudo modicar la informacion"
            })
          }
    
          res.status(200).json({
            mensaje: "Tipo de reclamo modificado"
          })
    
        } catch (error) {
          console.log(error)
          res.status(500).json({
            mensaje: 'Error en el intento.'
          })
        }
      }

}
import ReclamosService from "../services/reclamosService.js";

export default class ReclamosController {
    constructor() {
        this.service = new ReclamosService();
    }

    buscarTodos = async (req, res) => {
        try {
            const reclamos = await this.service.buscarTodos();
            res.status(200).json(reclamos);
        } catch (error) {
            res.status(500).json({ error: "Error interno en el servidor" });
        }
    };

    buscarPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const error = this.#checkId(id);
            if (error) {
                return res.status(400).json(error);
            }

            const result = await this.service.buscarPorId(id);
            if (result === null) {
                return res.status(400).json({ message: 'No se encontro el reclamo con ese id' });
            }

            res.status(200).json({ estado: true, result: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error interno en el servidor" });
        }
    }

    // al crear un nuevo reclamo siempre sera de estado 1 "creado"
    // fechaCreado lo hago con NOW() de mysql
    crear = async (req, res) => {
        try {
            const { asunto, descripcion, idReclamoTipo, idUsuarioCreador } = req.body;

            if (asunto === undefined || idReclamoTipo === undefined || idUsuarioCreador === undefined) {
                return res.status(400).send({
                    estado: "Falla",
                    mensaje: "Faltan datos obligatorios."
                })
            }

            const reclamo = {
                asunto,
                descripcion,
                idReclamoTipo,
                idUsuarioCreador
            }

            const result = await this.service.crear(reclamo);
            if (!result.estado) {
                res.status(404).send({ estado: "Falla", mensaje: result.mensaje });
            }
            res.status(201).send({ estado: "OK", data: result.data });

        } catch (error) {
            console.log(error);
            res.status(500).send({
                estado: "Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    modificar = async (req, res) => {
        try{
            const id = req.params.id;
            const error = this.#checkId(id);
            if (error) {
                return res.status(400).json(error);
            }

            const datos = req.body;
            if (Object.keys(datos).length === 0) {
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "No se enviaron datos para ser modificados."    
                });
            }

            const result = await this.service.modificar(id, datos);
            if (result.estado){
                res.status(200).send({estado:"OK", mensaje: result.mensaje, data: result.data});
            }else{
                res.status(404).send({estado:"Falla", mensaje: result.mensaje});
            }

        }catch (error){
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    #checkId(id) {
        if (isNaN(id)) {
            return { message: 'El id debe ser un número' };
        }
        if (id <= 0) {
            return { message: 'El id debe ser un número positivo' };
        }
        if (id === undefined) {
            return { message: 'El id es requerido' };
        }
        return null;
    }
}
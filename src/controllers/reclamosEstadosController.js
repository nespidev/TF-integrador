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
            const  id = request.params.id;
            const result = await this.reclamosEstadosService.buscarPorId(id);

            if (result.length === 0) {
                return response.status(400).json({ message: 'No se encontro el reclamo con ese id' });
            }
            response.status(200).json({ estado: true, result: result });

        } catch (error) {
            response.status(500).json({ message: 'Error al obtener los reclamos ' + error.message });
        }
    }

}
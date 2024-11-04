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

    // crear nuevo reclamo siempre sera de estado 1 "creado"
    // fechaCreado con NOW() de mysql
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

            const result = await this.service.modificar(id, datos);
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

    atender = async (request, response) => {
        try {
            const idReclamo = request.params.id
            const idReclamoEstado = request.body.idReclamoEstado

            const errorId = this.#checkId(idReclamo);
            if (errorId) {
                return response.status(400).json(errorId);
            }

            const errorEstadoId = this.#checkId(idReclamoEstado)
            if (errorEstadoId) {
                return response.status(400).json(errorEstadoId);
            }

            const data = {
                idReclamoEstado
            }

            const modificado = await this.service.atender(idReclamo, data)

            if (!modificado.estado) {
                return response.status(400).json({ estado: "ok", message: modificado.mensaje });
            } else {
                return response.status(200).json({ estado: "ok", message: modificado.mensaje });
            }
        } catch (error) {
            console.error(error);
            return response.status(500).json({ estado: "error", message: "Error interno en el servidor..." });
        }
    }

    consultar = async (req, res) => { //! esto busca por body
        try {
            const idUsuarioCreador = req.user.idUsuario;

            //console.log(idUsuarioCreador)
            const error = this.#checkId(idUsuarioCreador);
            if (error) {
                return res.status(400).json(error);
            }

            const result = await this.service.consultar(idUsuarioCreador);
            if (result === null) {
                return res.status(400).json({ message: 'No tiene reclamos Creados' });
            }

            res.status(200).json({ estado: true, result: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error interno en el servidor" });
        }
    }


    cancelar = async (req, res) => {
        try {

            const idUsuarioCreador = req.user.idUsuario;
            const idReclamo = req.params.id;
            const error = this.#checkId(idReclamo);
            if (error) {
                return res.status(400).json(error);
            }


            if (idUsuarioCreador === undefined) {
                return res.status(400).send({
                    estado: "Falla",
                    mensaje: "Faltan datos obligatorios."
                })
            }

            const reclamoCancelado = await this.service.cancelar(idReclamo, idUsuarioCreador)

            res.status(200).json({ estado: true, result: reclamoCancelado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error interno en el servidor" });
        }
    }

    informe = async (req, res) => {
        const formatosPermitidos = ['pdf', 'csv'];

        try {
            const formato = req.params.formato;
            console.log(formato)
            console.log(formatosPermitidos)
            if (!formato || !formatosPermitidos.includes(formato)) {
                return res.status(400).send({
                    estado: "Falla",
                    mensaje: "Formato inválido para el informe."
                })
            }

            const { buffer, path, headers } = await this.service.generarInforme(formato);
            res.set(headers)

            if (formato === 'pdf') {
                res.status(200).end(buffer);
            } else if (formato === 'csv') {
                res.status(200).download(path, (err) => {
                    if (err) {
                        return res.status(500).send({
                            estado: "Falla",
                            mensaje: " No se pudo generar el informe."
                        })
                    }
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                estado: "Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    estadística = async (request, response) => {

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
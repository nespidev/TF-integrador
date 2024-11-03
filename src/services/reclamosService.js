import e from "express";
import Reclamos from "../database/reclamos.js";
import NotificacionCorreo from "./notificacionCorreo.js";
import InformeService from "./informesService.js";

export default class ReclamosService {

    constructor() {
        this.reclamos = new Reclamos();
        this.notificacionCorreo = new NotificacionCorreo();
        this.informeService = new InformeService();
    }

    buscarTodos = async () => {
        return await this.reclamos.buscarTodos();
    }

    buscarPorId = async (id) => {
        const result = await this.reclamos.buscarPorId(id);
        return (result.length > 0) ? result[0] : null;
    }

    crear = async (reclamo) => {
        const reclamoCreado = await this.reclamos.crear(reclamo);
        if (!reclamoCreado) {
            return { estado: false, mensaje: 'Reclamo no creado' };
        }
        return { estado: true, mensaje: 'Reclamo creado', data: await this.buscarPorId(reclamoCreado.insertId) };
    }

    modificar = async (id, datos) => {
        const existe = await this.reclamos.buscarPorId(id)
        if (existe === null || existe.length === 0) {
            return { estado: false, mensaje: 'Reclamo no existe' };
        }
        await this.reclamos.modificar(id, datos);
        const result = await this.reclamos.buscarPorId(id)
        return { estado: true, mensaje: 'Reclamo modificado con exito', data: result }
    }

    atender = async (idReclamo, datos) => {
        const existe = await this.reclamos.buscarPorId(idReclamo)
        if (existe === null || existe.length === 0) {
            return { estado: false, mensaje: 'Reclamo no existe' };
        }

        if (existe[0].idReclamoEstado == datos.idReclamoEstado) {
            return { estado: false, mensaje: 'El estado del reclamo no ha cambiado' };
        }

        const result = await this.reclamos.modificar(idReclamo, datos);
        if (!result) {
            return { estado: false, mensaje: 'Reclamo no modificado' };
        }

        return this.#envioCorreo(idReclamo)
    }

    consultar = async (idUsuarioCreador) => {
        const result = await this.reclamos.consultar(idUsuarioCreador);
        return (result.length > 0) ? result : null;
    }

    cancelar = async (idReclamo, idReclamoCreador) => {

        const existe = await this.reclamos.buscarPorId(idReclamo)
        if (existe === null || existe.length === 0) {
            return { estado: false, mensaje: 'Reclamo no existe' };
        }

        if (existe[0].idReclamoEstado === 3 ) {
            return { estado: false, mensaje: 'Reclamo ya esta cancelado' };
        }

        if (existe[0].idReclamoEstado != 1) {
            return { estado: false, mensaje: 'Ya no podes cancelar el reclamo' };
        }

        const result = await this.reclamos.cancelar(idReclamo, idReclamoCreador);
        if (!result) {
            return { estado: false, mensaje: 'Reclamo no modificado' };
        }
        this.#envioCorreo(idReclamo)
        return { estado: true, mensaje: 'Reclamo cancelado con exito' }
    }

    generarInforme = async (formato) => {
        if (formato === 'pdf') {
            return await this.#reportePdf();
        }else if (formato === 'csv'){ 
            return await this.#reporteCsv();
        }
    }

    #reportePdf = async () => {
        const datosReporte = await this.reclamos.buscarDatosReportePdf();

        if (!datosReporte || datosReporte.length === 0) {
            return { estado: false, mensaje: 'Sin datos para el reporte'};
        }
        const pdf = await this.informeService.informeReclamosPdf(datosReporte);
        return {
            buffer: pdf,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="reporte.pdf"'
            }
        };
    }

    #reporteCsv = async () => {
        const datosReporte = await this.reclamos.buscarDatosReporteCsv();
        if (!datosReporte || datosReporte.length === 0) {
            return {estado: false, mensaje: 'Sin datos para el reporte'};
        }
        const csv =  await this.informeService.informeReclamosCsv(datosReporte);
        return {
            path: csv,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="reporte.csv"'
            }
        };
    }

    #envioCorreo = async (idReclamo) => {
        const cliente = await this.reclamos.buscarCliente(idReclamo)
        if (!cliente) {
            return { estado: false, mensaje: 'Cliente no encontrado' };
        }

        const datosCliente = {
            nombre: cliente[0].cliente,
            correo: cliente[0].correoElectronico,
            idReclamo: idReclamo,
            estado: cliente[0].estado
        }
        console.log("emviado?");
        return await this.notificacionCorreo.notificacionCorreo(datosCliente)
    }
}
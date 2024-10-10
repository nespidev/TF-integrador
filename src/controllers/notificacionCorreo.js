import { request, response } from "express";
import ReclamosEstadosService from "../services/reclamosEstadosService.js";

import { fileURLToPath } from 'url';
import path from 'path'
import handlebars from 'handlebars';
import fs from 'fs';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export default class NotificacionCorreo {
  notificacionCorreo = async (request, response) => {

    // datos del body
    const correoDestino = request.body.correoElectronico;
    const nombreUsuario = request.body.nombre; 
    const reclamoId = request.body.reclamo;
    
    const filename = fileURLToPath(import.meta.url);
    const dir = path.dirname(`${filename}`)
    const plantillaHTML = fs.readFileSync(path.join(dir + '../../../plantilla.hbs'), 'utf-8');

    const template = handlebars.compile(plantillaHTML);

    

    const datos = {
      nombre: nombreUsuario,
      reclamo: reclamoId
    }
    const correoHtml = template(datos)

    const transporte = nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: process.env.CORREO,
          pass: process.env.CLAVE
        },
        tls: {
          rejectUnauthorized: false
        }
      })

    const mailOptions = {
      to: correoDestino,
      subject: "Reclamo",
      text: "Estado de Reclamo fue modificado",
      html: correoHtml,
    };

    transporte.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
    response.send(true)
  }
}
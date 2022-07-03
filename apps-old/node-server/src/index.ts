const express = require('express')
import { Request, Response } from 'express'
import * as http from 'http'

const socketIo = require('socket.io')
import * as sql from 'mssql'

import { Constants } from './constants'
import { log } from '@menus/util.js'

/**
 * Controllers (route handlers).
 */
import * as pdfReaderController from './controllers/pdf-reader.js'
import { Chat_c } from './controllers/chat.controller'

const constants = new Constants()

/**
 * Create Express server.
 */
const app = express()
app.use(express.static('public'))

app.use(function (_req: Request, res: Response, next: () => void) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const port = process.env.PORT || constants.PORT
const server = http.createServer(app)

/**
 * Create Socket connection.
 */
const io = socketIo(server)

/**
 * Connect to DB
 */
(<any>sql).connect(constants.DBConfig).then(() => {
  new Chat_c(io, constants)
})

/**
 * API routes.
 */
app.get('/pdf-reader', pdfReaderController.readPDF)
// app.get('/test1', (req: Request, res: any) => {
//     console.log('public', process.cwd() + '/public');
//     const child = require('child_process');

//     const publicDir = process.cwd() + '\\public';

//     child.exec(`'C:\\Program Files (x86)\\gs\\gs9.22\\bin\\gs' -q -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=pngalpha' -dTextAlphaBits=4 -dGraphicsAlphaBits=4 '-r100x100' -sOutputFile='${publicDir}\\Pic-%d.png' '${publicDir}\\food.pdf'`, (err, std, stderr) => {
//         const str =`${err} ${std} ${stderr}`;

//         res.send(str);
//     });

//     // const PDFImage = require('pdf-image').PDFImage;

//     // const pdfImage = new PDFImage('food.pdf');
//     // pdfImage.convertPage(0).then(function (imagePath) {
//     //     // 0-th page (first page) of the slide.pdf is available as slide-0.png 
//     //     // fs.existsSync('/tmp/slide-0.png') // => true

//     //     console.log('imagePath', imagePath);

//     //     res.send({ test2: 12323423 });
//     // }, function (err) {
//     //   res.send({ test2: err });
//     // });


// });

/**
 * Start Express server.
 */
server.listen(port, () => {
  log('Running server on port %s', port)
})

export default app

const md5 = require('md5')
const fs = require('fs')

// const http = require('http');
const https = require('https')
// const rimraf = require('rimraf');

import {
  Request,
  Response,
  // NextFunction,
} from 'express'
import { Constants } from "../constants"

const { exec } = require('child_process')

let downloadFile = (src: string, dest: string, onComplete: any) => {
  const file = fs.createWriteStream(dest)
  https.get(src, (response: Response) => {
    response.pipe(file)

    file.on('finish', () => {
      if (onComplete) {
        onComplete()
      }
    })
  })
}

let convertPDF2PNG = (filePDF: string, filePNG: string, onComplete: any) => {
  // var cmd = `convert -density 96 ${filePDF} ${filePNG} | wc -l`;
  console.log('public', process.cwd() + '/public')

  // var publicDir = process.cwd() + "\\public";

  // var cmd = `"C:\\Program Files (x86)\\gs\\gs9.22\\bin\\gs" -q -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 "-sDEVICE=pngalpha" -dTextAlphaBits=4 -dGraphicsAlphaBits=4 "-r100x100" -sOutputFile="${publicDir}\\Pic-%d.png" "${publicDir}\\food.pdf"`;

  // LOW Quality
  // var cmd = `${Ctx.GS_PATH} -q -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 "-sDEVICE=pngalpha" -dTextAlphaBits=4 -dGraphicsAlphaBits=4 "-r100x100" -sOutputFile="${filePNG}" "${filePDF}"`;

  // HIGH Quality
  const cmd = `${Constants.GS_PATH} -dNOPAUSE -q -r300 -sPAPERSIZE=a4 -dTextAlphaBits=4 -dGraphicsAlphaBits=4 -dUseTrimBox -sDEVICE=png16m -dBATCH -sOutputFile="${filePNG}" -c "30000000 setvmthreshold" -f "${filePDF}"`

  console.log('cmd', cmd)

  exec(cmd, onComplete)
}

let sendPNGRespoonse = (filePNGDir: string, res: Response) => {
  let pages: any[] = []

  fs.readdirSync(filePNGDir).forEach((file: string) => {
    let path = `${filePNGDir}/${file}`

    path = Constants.BASE_URL + path.substr(path.indexOf('/pdfs/'), path.length - 1)

    pages.push({
      name: file,
      image: path
    })
  })

  pages = pages.sort((a, b) => {
    return (Number(a.name.match(/(\d+)/g)[0]) - Number((b.name.match(/(\d+)/g)[0])))
  })

  res.send({
    status: 'success',
    pages: pages
  })
}

let sendErrResponse = (res: Response) => {
  res.send({ status: 'error' })
}

export let readPDF = (req: Request, res: Response) => {
  // console.log('request', req.query.file);

  // const pdfPath = 'https://apps.datassential.com/snap/api/GetFoodBytes?id=250';
  // const pdfPath = 'food1.pdf';
  // // const pdfPath = req.params[0];
  // const pageNumber = 1;

  // const PDFImage = require("pdf-image").PDFImage;
  // const pdfImage = new PDFImage(pdfPath);

  // pdfImage.convertPage(pageNumber).then(function (imagePath) {
  //   res.sendFile(imagePath);
  // }, function (err) {
  //   res.send(err);
  // });

  // const url: string = 'test';

  // Return Error if File URL is not passed
  if (!req.query.file) {
    sendErrResponse(res)
    return
  }

  const fileURL = req.query.file.toString()

  // Return Error if File URL is not from `datassential`
  if (!fileURL.startsWith(Constants.DATASSENTIAL_URL)) {
    sendErrResponse(res)
    return
  }

  const dir = process.cwd() + '/public/pdfs'

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  const fileNameMD5 = md5(fileURL)

  // Create PDF Directory if doesn't exists
  const fileMD5Dir = `${dir}/${fileNameMD5}`
  if (!fs.existsSync(fileMD5Dir)) {
    fs.mkdirSync(fileMD5Dir)
  }

  // Create PDF File Directory if doesn't exists
  const filePDFDir = `${dir}/${fileNameMD5}/pdf`
  if (!fs.existsSync(filePDFDir)) {
    fs.mkdirSync(filePDFDir)
  }

  // Create PNG File Directory if doesn't exists
  const filePNGDir = `${dir}/${fileNameMD5}/png`
  if (!fs.existsSync(filePNGDir)) {
    fs.mkdirSync(filePNGDir)
  }

  const filePDF = `${filePDFDir}/file.pdf`
  const filePNG = `${filePNGDir}/file-%d.png`

  if (!fs.existsSync(filePDF)) {

    downloadFile(fileURL, filePDF, () => {

      convertPDF2PNG(filePDF, filePNG, (err: string, stdout: string, stderr: string) => {
        if (err || stderr) {
          console.log(`err: ${err}`)

          // rimraf.sync(fileMD5Dir);
          sendErrResponse(res)
          return
        }

        // // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout} ${typeof stdout} ${!stdout}`)
        console.log(`stderr: ${stderr} ${typeof stderr} ${!stderr}`)

        sendPNGRespoonse(filePNGDir, res)
      })
    })
  } else {
    sendPNGRespoonse(filePNGDir, res)
  }

}

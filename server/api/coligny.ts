import fs, { readFileSync } from "node:fs"
import xlsx from 'node-xlsx';

export default defineEventHandler(event => {
  const path = "./assets/coligny.xlsx"
  // const dirContent = fs.readdirSync("./assets/")
  // const fileExists = fs.existsSync(path)
  
  // const wb =  fs.readFileSync(path)
  // const workSheetsFromBuffer = xlsx.parse(wb);
  const workSheetsFromFile = xlsx.parse(path);
 
    return {
    // dir : dirContent,
    // exi : fileExists,
    //data : workSheetsFromBuffer
    data : workSheetsFromFile
    }
  })
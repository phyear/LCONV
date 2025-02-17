import { dataHandle } from '../context/TransferContext.js';

let cachedFileUrl;


const cacheFileStream = (file) => {
  cachedFileUrl = URL.createObjectURL(file);
}

const readExcel =  async(file, type) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target.result;
        const result = dataHandle[type].fileToData(data)
        resolve(result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
}

export {readExcel}
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

const readFileData =  async(file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const uint8Array = new Uint8Array(data);
        // 使用TextDecoder将二进制数据解码为UTF-8编码的字符串
        const text = new TextDecoder('utf-8').decode(uint8Array);
      resolve(text);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
}

export {readExcel, readFileData}
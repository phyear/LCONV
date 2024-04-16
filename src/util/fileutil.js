import * as XLSX from 'xlsx';

const readExcel =  async(file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const result = {}
        result['sourceText'] = XLSX.utils.sheet_to_csv(workbook.Sheets[firstSheetName]); 
        var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
        result['sourceData'] = handleJSONToArray(jsonData);
        resolve(result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
}

function handleJSONToArray(json){
   var data = [];
   var header = Object.keys(json[0]);
   data.push(header)
   for(var i = 0; i < json.length; i++){
      var temp = [];
      for(var j = 0; j < header.length; j++){
         temp.push(json[i][header[j]])
      }
      data.push(temp)
   }

   return data
}

export {readExcel}

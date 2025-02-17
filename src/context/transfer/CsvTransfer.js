import {Tranfer} from './Tranfer.js'
import * as XLSX from 'xlsx';


class CsvTransfer extends Tranfer {

    constructor() {
        super()
    }

    to2DArray(data) {
        let ee = data.split('\n')
        let aa = []
        for (let i = 0; i < ee.length; i++) {
            const element = ee[i];
            if (element.length > 0) {
                aa[i] = element.split(',')
            }
        }
        let excelData = {}
        excelData['sourceData'] = aa
        excelData['sourceText'] = data
        return excelData
    }

    toGenData(data, config) {
        let op = config.op
        let type = ','
        if(config.type){
            type = config.type
        }
        const tableRows = [];
        for(let item of data){
            if('t' == type){
                tableRows.push(item.join('\t'))
            } else {
               tableRows.push(item.join(type))
            }
        } 
        return tableRows.join('\n');
    }

    fileToData(data){
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetNames = workbook.SheetNames;
        
        const sheetDataMap = {};

        for (let i = 0; i < sheetNames.length; i++) {
            const sheetName = sheetNames[i];
            const jsonData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName], {cellDates: true});
            const result1 = {}
            result1['sourceData'] = this.handleJSONToArray(jsonData);
            result1['sourceText'] = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
            sheetDataMap[sheetName] = result1;
        }

        const result = {}
 
        result['sourceData'] = sheetDataMap[sheetNames[0]]['sourceData'];
        result['sourceText'] = sheetDataMap[sheetNames[0]]['sourceText'];
        result['sheetNames'] = sheetNames
        result['sheetDataMap'] = sheetDataMap
    
        return result;
    }

    handleJSONToArray(json){
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
 }

const csvTransfer = new CsvTransfer()
export {
    csvTransfer
}
import {Tranfer} from './Tranfer.js'
import * as XLSX from 'xlsx';
import moment from 'moment';


class ExcelTransfer extends Tranfer {

    constructor() {
        super()
    }

    to2DArray(data) {
        let ee = data.split('\n')
        let aa = []
        for (let i = 0; i < ee.length; i++) {
            const element = ee[i];
            if (element.length > 0) {
                aa[i] = element.split('\t')
            }
        }
        let excelData = {}
        excelData['sourceData'] = aa
        excelData['sourceText'] = data
        return excelData
    }

    toGenData(data, config) {
        console.log('config', config)
        console.log('data:', data)
        if(data.length == 0){
           return ''
        }
        var dd = []
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.length > 0) {
                dd[i] = element.join('\t')
            }
        }
        return dd.join('\n')
    }

    fileToData(data){
        const workbook = XLSX.read(data, { type: 'binary', cellDates: true, dateNF: 'YYYY-MM-dd HH:mm:ss'});

        const sheetNames = workbook.SheetNames;
        
        const sheetDataMap = {};

        for (let i = 0; i < sheetNames.length; i++) {
            const sheetName = sheetNames[i];
            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {cellDates: true});
            const result1 = {}
            result1['sourceData'] = this.handleJSONToArray(jsonData);
            result1['sourceText'] = this.toGenData(result1['sourceData'], {});
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
              var dd = json[i][header[j]]
              temp.push(this.formatDates(dd))
           }
           data.push(temp)
        }
        return data
     }

     formatDates(data) {
        if (data instanceof Date) {
            // 使用moment.js来格式化日期
            return moment(data).format('YYYY-MM-DD HH:mm:ss');
          }
        return data;
      }
 }

const excelTransfer = new ExcelTransfer()
export {
    excelTransfer
}
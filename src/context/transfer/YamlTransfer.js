import {Tranfer} from './Tranfer.js'
import YAML from 'yaml';

class YamlTransfer extends Tranfer {

    constructor() {
        super()
    }

    to2DArray(data) {
        let parsedData = YAML.parse(data)
        let list = this.flattenData(parsedData, '')
        var excelData = {}
        // 对返回的数据做二次处理
        for(let da in list) {
            for (let i = 0; i < da.length; i++) {
                if (typeof element === 'object') {
                    da[i] = JSON.stringify(element)
                }
            }
        }
        excelData['sourceData'] = list
        excelData['sourceText'] = data
        return excelData
    }
    
    toGenData(data, config) {
        let prefix = config.prefix || 'example'
        // 是否使用第一行做为key
        let keyValue = config.keyValue || 'true'
        let transformedData = data
        if (keyValue == 'true') {
            transformedData = data.slice(1).map(row => {
                const obj = {};
                data[0].forEach((key, index) => {
                  obj[key] = row[index];
                });
                return obj;
            });
        }
        
        let topLevelObject = {}
        topLevelObject[prefix] = transformedData
         
        return YAML.stringify(topLevelObject, {
            indent: 4
        })
    }

    flattenData(obj, prefix = '') {
        let result = [];
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'object' && value !== null && Array.isArray(value)) {
                // 对value做是否是对象判断
                if (typeof value === 'object') {
                   // 如果是对象讲提取键值对
                   result.push(Object.keys(value[0]))
                   result = result.concat(value.map(item => Object.values(item)))
                } else {
                    result.push(value);
                }
            } else if (typeof value === 'object' && value !== null) {
               // 如果是对象，递归处理
               result = result.concat(this.flattenData(value, `${prefix}${key}.`));
            }
          }
        }
        return result;
    }
 }

const yamlTransfer = new YamlTransfer()
export {
    yamlTransfer
}
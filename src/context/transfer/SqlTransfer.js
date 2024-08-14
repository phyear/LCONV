import { Tranfer } from './Tranfer.js'
import YAML from 'yaml';

class SqlTransfer extends Tranfer {

    constructor() {
        super()
    }

    to2DArray(data) {
        var excelData = {}
        var list = this.parseInsertSql(data);
        excelData['sourceData'] = list
        excelData['sourceText'] = data
        return excelData
    }

    toGenData(data, config) {
        let tableName = config.tableName || 'example'
        let multiLine = config.multiLine || 'true'
        return this.arrayToInsertSql(data, tableName, multiLine)
    }

    arrayToInsertSql(array, tableName, multiLine) {
        if(array && array.length <= 0){
           return ""
        }
        // 提取列名
        const columns = array[0];

        // 构建列名字符串
        const columnsStr = columns.join(', ');

        let sql = null;
        if (multiLine === 'true') {
            sql = array.slice(1).map(row => {
                let val = `('${row.join("', '")}')`;
                let res = `INSERT INTO ${tableName} (${columnsStr}) VALUES ${val};`
                return res;
            }).join('\n ');
        } else {
            
            // 构建 VALUES 部分
            const values = array.slice(1).map(row => {
                let val = `('${row.join("', '")}')`;
                return val;
            }).join(', ');
            // 构建完整的 INSERT 语句
            sql = `INSERT INTO ${tableName} (${columnsStr}) VALUES ${values};`;
        }
         
        return sql;
    }

    parseInsertSql(sql) {
        let data = []
        let columns = this.matchColumn(sql)
        // 匹配values
        let values = this.matchValues(sql)
        data.push(columns)
        return data.concat(values);
    }

    matchColumn(sql) {
        // 正则表达式用于匹配列名
        const columnsRegex = /INSERT\s+INTO\s+\w+\s*\(([^)]+)\)/i;

        // 匹配列名
        const match = sql.match(columnsRegex);

        if (!match) {
            throw new Error('Invalid INSERT statement');
        }

        // 提取列名
        const columnsStr = match[1];

        // 分割每个列名
        const columns = columnsStr.split(/\s*,\s*/);

        return columns;
    }

    matchValues(sql) {
        const dataArray = sql.match(/'[^']*'/g).map(item => item.replace(/'/g, ''));
        // 将数组转换为二维数组
        const data = dataArray.reduce((acc, curr, index) => {
            if (index % 3 === 0) {
                acc.push([curr]);
            } else {
                acc[acc.length - 1].push(curr);
            }
            return acc;
        }, []);
        return data;
    }
}

const sqlTransfer = new SqlTransfer()
export {
    sqlTransfer
}
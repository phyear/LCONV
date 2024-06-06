import {Tranfer} from './Tranfer.js'


class JsonTransfer extends Tranfer {

    constructor() {
        super()
    }

    to2DArray(data) {
        let result = this.checkFile(data, {})
         // 格式不符合返回错误信息
        if('error' in result){
            return result
        }
        const json = JSON.parse(data)
        var dataList = [];
        var header = Object.keys(json[0]);
        dataList.push(header)
        for(var i = 0; i < json.length; i++){
           var temp = [];
           for(var j = 0; j < header.length; j++){
              temp.push(json[i][header[j]])
           }
           dataList.push(temp)
        }
        console.log(data)
        console.log(dataList)
        result.sourceText = data;
        result.sourceData = dataList
        return result 
    }

    // 校验文件内容是否符合要求
    checkFile(text, result) {
        if(!text.startsWith('[')){
            result.error = '数据不符合要求'
            return result
        }
        try {
            JSON.parse(text)
        } catch (error) {
            result.error = '数据不符合要求'
        }
        return result
    }

    toGenData(data) {

    }
 }

const jsonTransfer = new JsonTransfer()
export {
    jsonTransfer
}
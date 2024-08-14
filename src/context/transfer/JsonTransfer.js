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

    toGenData(data, config) {
        const {type, splic, mini, tran} = config
        let res = this.tranData(type, tran, data);
        if('yes' == splic){
           res = {'data': res}
        }
        // 将二维数组转换成字符串
        if ('yes' == mini) {
            res = JSON.stringify(res)
        } else {
            res = JSON.stringify(res, null, 2)
        }
        return res
    }

    tranData (type, tran, datas) {
        let res = []
        // 将二维数组转成对象数组
        if ('array' == type) {
          const keys = datas[0];
          datas.forEach((element, index) => {
             if(index > 0) {
                const obj = {};
                element.forEach((item, i) => {
                   obj[keys[i]] = item
                })
                res.push(obj)
             }
          });
       } else if ('colArray' == type) {
          // 将二维数组转成列数组
          const keys = datas[0];
          keys.forEach((key, index) => {
             const values = [];
             datas.forEach((element, i) => {
                if(i > 0) {
                   values.push(element[index])
                }
             });
             const arr = {};
             arr[key] = values
             res.push(arr)
          });
       } else if ('keyArray' == type) {
          // 将二维数组转成主键数组
          const map = {}
          datas.forEach((element, index) => {
             map[index] = element;
          });
          res.push(map)
      } else {
         res = datas
      }
      return res
   }
 }

const jsonTransfer = new JsonTransfer()
export {
    jsonTransfer
}
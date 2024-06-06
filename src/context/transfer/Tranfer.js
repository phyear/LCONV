class Tranfer {

    to2DArray(data) {
        result = this.checkFile(text, result);
        // 格式不符合返回错误信息
        if('error' in result){
            return result
        }
    }

    toGenData(data, config) {

    }
    
    // 校验文件内容是否符合要求
    checkFile(text, result) {
        result['error'] = '格式不符'
        return result
    }

    fileToData(file){
        let result = {}
        // 假设数据是UTF-8编码的JSON字符串
        const uint8Array = new Uint8Array(file);
        const text = new TextDecoder('utf-8').decode(uint8Array);
        return this.to2DArray(text);
    }
}

export {Tranfer}
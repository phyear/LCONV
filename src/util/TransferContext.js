
// 将csv文件或者文本解析为二维数组
const sourceCsvHandle = (data)  => {
    // 返回二维数组
    return [[]]
}

const dataSourceHandle = {
    'csv': sourceCsvHandle
}

const dataGenHandle = {
    'csv': sourceCsvHandle
}

const sourceTransferContext = function(type, data) {
     return dataSourceHandle[type](data)
}

const genTransferContext = function(type, data) {
    return dataGenHandle[type](data)
}

export {sourceTransferContext, genTransferContext}
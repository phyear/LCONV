import { csvTransfer } from './transfer/CsvTransfer.js'
import { excelTransfer } from './transfer/ExcelTransfer.js'
import { jsonTransfer } from './transfer/JsonTransfer.js'
import { htmlTransfer } from './transfer/HtmlTransfer.js'
import { markdownTransfer } from './transfer/MarkdownTransfer.js'

const dataHandle = {
    'csv': csvTransfer,
    'excel': excelTransfer,
    'json': jsonTransfer,
    'html': htmlTransfer,
    'md': markdownTransfer
}


const TransferContext = (op, type, data) => {
    if('GEN' == op){
        return dataHandle[type].toGenData(data)
    } else {
        return dataHandle[type].to2DArray(data)
    }
}

export {TransferContext, dataHandle}
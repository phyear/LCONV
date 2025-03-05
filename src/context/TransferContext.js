import { csvTransfer } from './transfer/CsvTransfer.js'
import { excelTransfer } from './transfer/ExcelTransfer.js'
import { jsonTransfer } from './transfer/JsonTransfer.js'
import { htmlTransfer } from './transfer/HtmlTransfer.js'
import { markdownTransfer } from './transfer/MarkdownTransfer.js'
import { wikitableTransfer } from './transfer/WikitableTransfer.js'
import { yamlTransfer } from './transfer/YamlTransfer.js'
import { sqlTransfer } from './transfer/SqlTransfer.js'

// 常量定义
const OP_GEN = 'GEN';

const dataHandle = {
    'csv': csvTransfer,
    'excel': excelTransfer,
    'json': jsonTransfer,
    'html': htmlTransfer,
    'md': markdownTransfer,
    'yaml': yamlTransfer,
    'sql': sqlTransfer,
    'wikitable': wikitableTransfer
}

// 输入验证函数，你可以根据实际情况调整这些验证函数的实现
function validateType(type) {
    // 假设type必须是字符串且存在于dataHandle中
    return typeof type === 'string' && dataHandle.hasOwnProperty(type);
}

const TransferContext = (op, type, data) => {
    if (!validateType(type)) {
        throw new Error('Invalid type provided.');
    }

    if (OP_GEN == op) {
        return dataHandle[type].toGenData(data)
    } else {
        return dataHandle[type].to2DArray(data)
    }
}

export { TransferContext, dataHandle }
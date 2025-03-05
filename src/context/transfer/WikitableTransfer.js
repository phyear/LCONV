import { Tranfer } from './Tranfer.js';

class WikitableTransfer extends Tranfer {
  constructor() {
    super();
  }

  parseTableData(tableData) {
    // 将字符串按行分割
    const lines = tableData.split('\n');
    
    // 处理每一行
    const tableRows = [];
    lines.forEach(line => {
        // 去除空白字符
        const trimmedLine = line.trim();
        // 检查行是否以 | 开头
        if (trimmedLine.startsWith('|')) {
            // 去掉行首的 |
            const rowContent = trimmedLine.slice(1);
            // 分割为单元格并去除空字符串
            const cells = rowContent.split('||').map(cell => cell.trim()).filter(cell => cell !== '');
            tableRows.push(cells);
        }
    });
    
    // 过滤无效行
    if (tableRows.length === 0) return [];
    
    // 确定列数
    const headerRow = tableRows[0];
    const columnCount = headerRow.length;
    const validRows = tableRows.filter(row => row.length === columnCount);
    
    return validRows;
}

  to2DArray(data) {
    if (!data || typeof data !== 'string' || !/\{\|[\s\S]*?\|\}/.test(data)) {
      return { error: 'Invalid input data' };
    }

    let result = {};
    const tableMatch = data.match(/\{\|[\s\S]*?\|\}/);

    if (!tableMatch) {
      result.error = 'No valid Wikitable content found';
      return result;
    }

      const dataArray = this.parseTableData(data);
      result.sourceData = dataArray.filter(arr => arr.length > 0);
      result.sourceText = data;
    

    return result;
  }

  checkFile(text, result) {
    if(!/^\s*\{\|[\s\S]+?\|\}\s*$/.test(text)) {
      result.error = 'Invalid Wikitable format';
    }
    return result;
  }

  toGenData(array, config) {
        const { borderStyle = 'full', operations = [] } = config;
        const hasHeader = operations.includes('header');
        const enableMerge = operations.includes('merge');

        let rows = hasHeader ? array.slice(1) : array;
        const headers = hasHeader ? array[0] : [];

        // 生成表头
        const headerRow = headers.map(h => `! ${h}`).join(' | ') + (headers.length > 0 ? ' |-' : '');
        
        // 生成表格主体
        const bodyRows = rows.map((row, i) => {
          return row.map((cell, index) => {
            // 处理合并单元格
            // 跨行合并检测
let isSameAsPrevRow = i > 0 && rows[i-1][index] === cell;
if (enableMerge && (row[index - 1] === cell || isSameAsPrevRow)) {
              return '| ';
            }
            // 处理空单元格
            const escapedCell = cell.toString().replace(/([|{}!])/g, '{{$1}}');
const cellContent = escapedCell === '' ? ' ' : escapedCell;
            return `| ${cellContent} `;
          }).join('|').slice(0, -1);
        });

        // 添加边框样式
        const border = borderStyle === 'full' ? 
          '{| class="wikitable" style="border: 2px solid #CCC"' : 
          '{| class="wikitable" style="border: 1px solid #DDD"';

        return [
          border,
          hasHeader ? headerRow : '',
          ...bodyRows,
          '|}'
        ].filter(line => line).join('\n');
      }
}

const wikitableTransfer = new WikitableTransfer();
export { wikitableTransfer };

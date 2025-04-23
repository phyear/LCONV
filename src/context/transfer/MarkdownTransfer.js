import { Tranfer } from './Tranfer.js'
import { marked } from 'marked';
import {load} from 'cheerio';


class MarkdownTransfer extends Tranfer {

  constructor() {
    super()
  }

  to2DArray(data) {
    let html = marked(data)
    const excelData = {}
    excelData['sourceData'] = this.htmlToArray(html)
    excelData['sourceText'] = data
    return excelData
  }

  toGenData(array, config) {
    if (!Array.isArray(array) || !array.length) return '';
    const type = config.type;
    const op = config.op;

    let headers = [];
    // 设置是否用第一行数据做表头
    if (op.indexOf('first') > -1) {
      headers = array.shift()
    } else {
      headers = array[0].map(h => '   ');
    }

    const maxColumnWidths = headers.map(_ => 0);
    const tableRows = [headers.join(' | ')];

    // 计算最大列宽
    let rowIndex = 0;
    for (let row of array) {
      row = row.map(cell => cell.toString());
      for (let i = 0; i < row.length; i++) {
        let maxWidth = 3
        // 设置是否按数据的最大长度显示列宽
        if (op.indexOf('pretty') > -1) {
          maxWidth = Math.max(maxColumnWidths[i], row[i].toString().length)
        }
        maxColumnWidths[i] = maxWidth;
        // 设置第一行加粗
        let firstCellSet = true;
        if (rowIndex == 0 && op.indexOf('bold_first_row') > -1) {
          row[i] = `**${row[i]}**`
          firstCellSet = false
        }

        // 设置第一列加粗
        if (i == 0 && op.indexOf('bold_first_col') > -1 && firstCellSet) {
          row[i] = `**${row[i]}**`
        }
      }
      tableRows.push(row.join(' | '));
      rowIndex++
    }

    // 添加分隔线
    const separator = maxColumnWidths.map(width => {
      const spilt = '-'.repeat(width)
      // 设置居中样式
      if ('left' === type) return `:${spilt}`
      else if ('center' === type) return `:${spilt}:`
      else return `${spilt}:`

    }).join(' | ');
    tableRows.splice(1, 0, separator);


    // 生成Markdown表格
    const markdownTable = tableRows.map(row => {
      // 设置简易模式
      return op.indexOf('simple') > -1 ? row : `| ${row} |`
    }).join('\n');
    return markdownTable;
  }

  htmlToArray(html) {
    const $ = load(html);
    const tableElement = $('table');

    // 获取表格的HTML代码
    const tableHtml = tableElement.html();
    const data1 = [];

    // 遍历表格的行
    tableElement.find('tr').each((index, row) => {
      const rowData = [];

      // 遍历当前行的单元格
      $(row).find('th').each((cellIndex, cell) => {
        rowData.push($(cell).text());
      });
      $(row).find('td').each((cellIndex, cell) => {
        rowData.push($(cell).text());
      });

      // 将当前行数据添加到总数据数组
      data1.push(rowData);
    });

    return data1
  }
}

const markdownTransfer = new MarkdownTransfer()
export {
  markdownTransfer
}
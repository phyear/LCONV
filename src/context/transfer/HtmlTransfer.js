import {Tranfer} from './Tranfer.js'
import cheerio from 'cheerio';


class HtmlTransfer extends Tranfer {

    constructor() {
        super()
    }

    to2DArray(data) {
        const $ = cheerio.load(data);
        const tableElement = $('table');

        // 获取表格的HTML代码
        const tableHtml = tableElement.html();
        const data1 = [];

        // 遍历表格的行
        tableElement.find('tr').each((index, row) => {
          const rowData = [];
          
          // 遍历当前行的单元格
          $(row).find('td').each((cellIndex, cell) => {
            rowData.push($(cell).text());
          });
          
          // 将当前行数据添加到总数据数组
          data1.push(rowData);
        });
        const excelData = {}
        excelData['sourceData'] = data1
        excelData['sourceText'] = data
        return excelData
    }

    toGenData(data, config) {
        let op = config.op
        let usingDiv = false
        let minify = false
        let thead = false
        let first_headers = false
        if(config.op){
           usingDiv = op.indexOf('div') > -1
           minify = op.indexOf('minify') > -1
           thead = op.indexOf('thead') > -1
           first_headers = op.indexOf('thead') > -1
        }
        let tableHTML = usingDiv ? '<div class="table">' : '<table>';
        let level = 1
        let aa = level;
        for (let i = 0; i < data.length; i++) {

            if(thead && i === 0){
                tableHTML += this.format(minify, aa+1)
                level = level + 1
                tableHTML += usingDiv ? '<div class="thead">' : '<thead>'
            } else if (thead && i == 1){
                tableHTML += this.format(minify, aa+1)
                tableHTML += usingDiv ? '<div class="tbody">' : '<tbody>'
            }
            tableHTML += this.format(minify, level+1)
            tableHTML += (usingDiv ? '<div class="row">' : '<tr>') ;

            for (let j = 0; j < data[i].length; j++) {  
              let td = thead && i === 0 ? '<th>' : '<td>'
              let tde = thead && i === 0 ? 'th' : 'td'

              if(first_headers && j === 0){
                td = '<th>'
                tde = 'th'
              }
              tableHTML += this.format(minify, level+2)
              tableHTML +=  ((usingDiv ? '<div class="cell">' : td)) 
              tableHTML +=  `${data[i][j]}`;
              tableHTML +=  this.endFlag(tde, usingDiv)
            }
            tableHTML += this.format(minify, level+1)
            tableHTML += this.endFlag('tr', usingDiv);
            if(thead && i === 0){
                tableHTML += this.format(minify, aa+1)
                tableHTML += usingDiv ? '</div>' : '</thead>'
            } else if(thead && i == data.length -1 ) {
                tableHTML += this.format(minify, aa+1)
                tableHTML += usingDiv ? '</div>' : '</tbody>'
            }
        }
        tableHTML += this.format(minify, 0)
        tableHTML += this.endFlag('table', usingDiv);
        return tableHTML;
    }

    endFlag(text, usingDiv) {
         return '</' + (usingDiv ? 'div' : text ) + '>'
    }

    format(minify, level) {
        return minify ? '' : '\n' + ' '.repeat(level * 2)
    }
  
 }

const htmlTransfer = new HtmlTransfer()
export {
    htmlTransfer
}
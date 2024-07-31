import { defineStore } from 'pinia'
import { code_type } from '../util/source.js'

export const rowColNumberStore = defineStore('rowColNumber', {
  state: () => ({
    row: 5, // 行数
    col: 3, // 列数
    hidden: true, // 是否隐藏
    preType: {"code":"excel"}, // 源类型
    toType:{"code":"json"}, // 目的类型
    canTrans:[], // 可转换类型列表
    data: [], // 数据
    historyData:[JSON.stringify([['','',''],['','',''],['','',''],['','',''],['','','']])],
    currentIndex:0,
    sourceData:[['','',''],['','',''],['','',''],['','',''],['','','']], // 统一二维数组 受DataSource影响,
    sourceText:null, // 源文本
    genText: null
  }),
  getters: {
    getRow: (state) => state.row,
    getCol: (state) => state.col,
    getHidden: (state) => state.hidden,
    getSourceData: (state) => state.sourceData,
    getSourceText: (state) => state.sourceText,
    getPreType: (state) => state.preType,
    getPreCode: (state) => state.preType.code,
    getToType: (state) => state.toType,
    getToTypeCode: (state) => {
       return state.toType.code
    },
    getData: (state) => state.data,
  }, 
  actions: {
    setRow(row) {
      this.row = row
    },
    setCol(col) {
      this.col = col
    },
    setToType(data) {
      this.toType = data
    },
    setHidden(hidden) {
      this.hidden = hidden
    },
    setSourceData(data) {
      this.sourceData = data
      if(data.length > 0){
           this.row = data.length
           this.col = data[0].length
           this.data = data
      }
    },
    setSourceText(data) {
      this.sourceText = data
    },
    updateRowColNumber(row, col, hidden) {
      this.row = row
      this.col = col
      this.hidden = hidden
    },
    updateSourceData(data) {
      this.row = data.length
      this.col = data[0].length
      this.sourceData = data
      this.data = data
    },
    setTransTo(preCode, endCode) {
        let pre = code_type[preCode]
        let end = code_type[endCode]
        this.setTypeInfo(pre, end)
    },
    // 设置源类型 以及默认转换类型以及可转换类型
    setTypeInfo(data, endData) {
      this.preType = data
      let list = data['canTran']
      if(list.length > 0){
        let aa = []
        for(let i = 0; i < list.length; i++){
          let item = list[i]
          aa.push(code_type[item['code']])
        }
        this.canTrans = aa
      } 
      if(!endData){
        let code = list[0]['code']
        this.toType = code_type[code]
      } else {
        this.toType = endData
      }
      this.sourceText = null
      this.sourceData = [['','',''],['','',''],['','',''],['','',''],['','','']]
    },
    setHistoryData(data) {
      this.historyData.push(JSON.stringify(data))
      this.currentIndex = this.historyData.length - 1
    },
    setGenText(data){
      this.genText = data
    }
  }
})
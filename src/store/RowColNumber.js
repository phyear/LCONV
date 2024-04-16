import { defineStore } from 'pinia'

export const rowColNumberStore = defineStore('rowColNumber', {
  state: () => ({
    row: 5,
    col: 3,
    hidden: true,
    preType: null,
    toType:{},
    data: [],
    sourceData:[['','',''],['','',''],['','',''],['','',''],['','','']], // 统一二维数组 受DataSource影响,
    sourceText:null
  }),
  actions: {
    setRow(row) {
      this.row = row
    },
    setCol(col) {
      this.col = col
    },
    setHidden(hidden) {
      this.hidden = hidden
    },
    setSourceData(data) {
      this.sourceData = data
      console.info(data)
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
      this.data = data
    },
  }
})
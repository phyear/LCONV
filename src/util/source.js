import source1 from '../source.json';




function tran(data, code_type) {
    let all_trans = [];
    for (let i = 0; i < data.length; i++) {
        let preCode = data[i]['code'];
        for (let j = 0; j < data[i]['canTran'].length; j++) {
            let tran = data[i]['canTran'][j];
            let endCode = tran['code'];
            tran['pre_code'] = preCode;
            tran['op_code'] = preCode + '_' + endCode;
            if (!tran['name']) {
                tran['name'] = preCode + ' To ' + endCode;
            }
            // 如果可转换图标为空则使用目标类型的icon
            if (!tran['icon']) {
                tran['icon'] = code_type[endCode]['icon'];
            }
            tran['color'] = code_type[endCode]['color'];
            all_trans.push(tran);
        }
    }
    return all_trans
}

function tran_to_code(data) {
    let map = {};
    for (let i = 0; i < data.length; i++) {
        let code = data[i]['code']
        let canTran = data[i]['canTran']
        map[code] = data[i];
        let canTranMap = {};
        for (let j = 0; j < canTran.length; j++) {
            let code = canTran[j]['code']
            canTranMap[code] = canTran[j];
        }
        data[i]['canTranMap'] = canTranMap;
    }
    return map;
}

function getCanTranList(cantran, code_type) {
    let aa = []
    for (let index in cantran) {
        aa.push(code_type[cantran[index]['code']])
    }    
    return aa 
}
    

let source = localStorage.getItem('default-setting');
if (source) {
    source = JSON.parse(source);
} else {
    source = source1;
}



export { source,  tran, tran_to_code, getCanTranList}
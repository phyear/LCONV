import source from '../source.json';

function tran(data, code_type){
    let all_trans = [];
    for (let i = 0; i < data.length; i++) {
        let preCode = data[i]['code'];
        for (let j = 0; j < data[i]['canTran'].length; j++) {
            let tran = data[i]['canTran'][j];
            let endCode = tran['code'];
            tran['pre_code'] = preCode;
            tran['op_code'] = preCode + '_' + endCode;
            if(!tran['name']){
                tran['name'] = preCode + ' To ' + endCode;
            }
            // 如果可转换图标为空则使用目标类型的icon
            if(!tran['icon']){
                tran['icon'] = code_type[endCode]['icon'];
            }
            all_trans.push(tran);
        }
    }
    return all_trans
}

function tran_to_code(data) {
   let map = {};
    for (let i = 0; i < data.length; i++) {
        let code = data[i]['code']
        map[code] = data[i];
    }
    return map;
}

const code_type = tran_to_code(source);

const all_trans = tran(source, code_type);


export{source, all_trans, code_type}
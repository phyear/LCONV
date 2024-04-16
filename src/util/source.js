import source from '../source.json';

function tran(data){
    let all_trans = [];
    for (let i = 0; i < data.length; i++) {
        let preCode = data[i]['code'];
        for (let j = 0; j < data[i]['canTran'].length; j++) {
            let tran = data[i]['canTran'][j];
            let endCode = tran['code'];
            tran['op_code'] = preCode + '_' + endCode;
            if(!tran['name']){
                tran['op_code'] = preCode + ' To ' + endCode;
            }
            all_trans.push(tran);
        }
    }
    return all_trans
}

const all_trans = tran(source);


export{source, all_trans}
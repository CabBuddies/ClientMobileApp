
function testSearchUtil(attributes:string[],search:string=''){
    const _data:any[] = [];
    search
        .trim()
        .toLowerCase()
        .replace(/  +/g, ' ')
        .split(' ')
        .forEach((s)=>{
            attributes.forEach((attr)=>{
                const data = {};
                data[attr] = {$regex: `.*${s}.*`, $options:"i"};
                console.log(data); 
                _data.push(JSON.parse(JSON.stringify(data)));
            })
        })
    console.log(_data);
    
    return { $or:_data }
}

export {
    testSearchUtil
}
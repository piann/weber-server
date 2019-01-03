const cleanNullArgs = (args:object):object =>{
    const notNullObj = {};
    Object.keys(args).forEach(key => {
        if(args[key]!==null){
            notNullObj[key] = args[key];
        }
    })
    return notNullObj;
}


export default cleanNullArgs;
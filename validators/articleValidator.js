exports.isNumber = (number) => {
    const regex = /\d\d*[^\w]*/g;
    const matched = String(number).match(regex);
    return matched!=null && matched.length>0 && matched[0] === String(number);
};

exports.validateBody = (body,elementsNames) => {
    if(body){
        for(var element in elementsNames){
            if(body[elementsNames[element]] == null) return false;
        }
        return true;
    }
    return false;    
};


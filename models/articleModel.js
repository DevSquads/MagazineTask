let mongoose = require('mongoose');

const model = mongoose.model('article',new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    autherName:{
        type:String,
        required:true
    }
},{
    collation:'article',
    timestamps:true
}));

//crude operations

exports.create = (data) => {
    return model.create(data);
};

exports.update = (id,description) => {
    return model.findById(id).then(article => {
        if(article){
            article.description = description;
            article.save();            
            return article;
        }
        else{
            //not found article
            return null;
        }
    });
};


exports.deleteOne = (id) => {
    return model.deleteOne({_id:id});
}
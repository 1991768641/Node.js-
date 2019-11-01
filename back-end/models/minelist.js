const {Movie}=require('../utils/db');

const save=(data)=>{
    const movie=new Movie(data);
    return movie.save()
}

const findOne=async (id)=>{
    return await Movie.findById(id);
}

const findAll=async ()=>{
    return await Movie.find({}).sort({_id:-1});
}

const update=async (data)=>{
    return await Movie.findByIdAndUpdate(data.id,data);
}

const remove=async (id)=>{
    return await Movie.findByIdAndDelete(id);
}

const search=async (keywords)=>{
    let reg=new RegExp(keywords,'gi');
    return await Movie.find({}).sort({_id:-1}).or([{moviename:reg},{starring:reg},{details:reg},{showTime:reg}]);
}

module.exports={
    save,
    findAll,
    findOne,
    update,
    remove,
    search
}
const UsersModel=require('../models/register');
const tools=require('../utils/tools');

const signup =async function (req, res, next) {
    res.set('Content-Type', 'application/json;charset=utf-8')
    let {username,password}=req.body
    
    let hash = await tools.hash(password)

    let result=await UsersModel.save({
        username,
        password:hash
    });
    if(result){
        res.render('succ.art', {
            data: JSON.stringify({
                message: "用户注册成功",
                name:username
            })
        })
    }else{
        res.render('fail.art', {
            data: JSON.stringify({
                message: "用户注册失败",
                name:username
            })
        })
    }
}

const hasUsername=async function(req,res,next){
    res.set('Content-Type', 'application/json; charset=utf-8')
    let {username}=req.body;
    let result=await UsersModel.findOne({username});

    if(result){
        res.render('fail.art',{
            data:JSON.stringify({
                message:"用户名已存在",
                name:username
            })
        })
    }else{
        next()
    }
}

module.exports= {
    signup,
    hasUsername
}
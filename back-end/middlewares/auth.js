const tools=require('../utils/tools');
const path=require('path');

const isSignin=async function(req,res,next){
    res.set('Content-Type', 'application/json;charset=utf-8');
    let {token,username}=req.cookies;
    
    if(token){
        if(req.path==='/isSignin'){
            res.render('succ.art',{
                data:JSON.stringify({
                    username
                })
            })
        }
        else{
            let decoded=await tools.verifyToken(token);

            if(decoded){
                next();
            }
            else{
                res.render('fail.art',{
                    data:JSON.stringify({
                        message:'token验证失败'
                    })
                })
            }
        }
    }
    else{
        res.render('fail.art',{
            data:JSON.stringify({
                message:'没有权限'
            })
        })
    }
}

module.exports=isSignin;
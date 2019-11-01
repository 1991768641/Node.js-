const UsersModel = require('../models/register');
const tools = require('../utils/tools');
const authMiddleware = require('../middlewares/auth');

const signin = async function (req, res, next) {
    res.set('Content-Type', 'application/json;charset=utf-8');

    let {
        username,
        password
    } = req.body;

    let result = await UsersModel.findOne({
        username
    });

    if (result) {
        let compareResult = await tools.compare(password, result.password);
        if (compareResult) {
            let token = await tools.generateToken(username);
            
            /* res.header('X-Access-Token', token); */
            res.cookie('token',token);
            res.cookie('username',username);

            res.render('succ.art', {
                data: JSON.stringify({
                    message: "登录成功",
                    name: username
                })
            })
        } else {
            res.render('fail.art', {
                data: JSON.stringify({
                    message: "用户名或密码不对",
                    name: username
                })
            })
        }
    } else {
        res.render('fail.art', {
            data: JSON.stringify({
                message: "用户名或密码不对",
                name: username
            })
        })
    }
}

const isSignin = authMiddleware;

const signout = function (req, res, next) {
    res.cookie('token', '');
    res.cookie('username', '');
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.render('succ', {
        data: JSON.stringify({
            message: '注销成功.'
        })
    })
}

module.exports = {
    signin,
    isSignin,
    signout
}
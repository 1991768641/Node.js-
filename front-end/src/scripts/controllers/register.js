import registerView from '../views/register.art';
import httpModel from '../../models/http';

export const register=(req,res,next)=>{
    res.render(registerView());
    new Register().render();
}

class Register {
    render() {
        $('.jump-login').on('click', function () {
            location.hash = 'login';
        })
        $('#registerbtn').on('click',this.handlesubmit.bind(this));
    }
    async handlesubmit(){
        let data= $('#form-register').serialize();
        
        let result=await httpModel.get({
            url:"/api/users/signup",
            type:'post',
            data:data
        })
        
        this.handlesubmitSucc(result);
    }
    handlesubmitSucc(result){
        $('#form-register')[0].reset();
        alert(result.data.message);
        
        if(result.data.message=='用户注册成功'){
            location.hash='login';
        }
        else{
            window.location.reload();
        }
    }
}

export default new Register();
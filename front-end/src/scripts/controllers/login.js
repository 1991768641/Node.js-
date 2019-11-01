import loginView from './../views/login.art';
import httpModel from '../../models/http';

export const loginer=(req,res,next)=>{
    res.render(loginView());
    new Login().render();
}

class Login {

    render() {
        $('.jump-register').on('click',function(){
            location.hash = 'register';
        })

        $('#loginbtn').on('click',this.handlesubmit.bind(this));
    }
    async handlesubmit(){
        let data= $('#form-login').serialize();
        
        let result=await httpModel.get({
            url:"/api/users/signin",
            type:'post',
            data:data
        })
        console.log(result);
        this.handlesubmitSucc(result);
    }

    handlesubmitSucc(result){
        $('#form-login')[0].reset();
        alert(result.data.message);

        if(result.ret){
            location.hash='#home';
            $('#admin-name').html(result.data.name);
            window.location.reload();
        }
        else{
            $('#form-login')[0].reset();
        }
    }
}

export default new Login();
import layoutView from '../views/layout.art';
import httpModel from '../../models/http';
import store from 'store';

class Layout {
    
    constructor(){
        this.render()
    }
    
    async render() {
        let layouthtml = layoutView({});
        $('#root').html(layouthtml);

        let result= await this.auth();
        let usersname=result.data.username||'';

        if (usersname) {
            $('#admin-name').html(usersname);
            $('.logout').html('退出');
            let hash=location.hash.slice(1).split('_')[0]||'home';
            $(`.sidebar-menu li[data-url=${hash}]`).addClass('highlight').siblings().removeClass('highlight');
            
            $('.logout').on('click',async function () {
                $('.logout').html('去登录');
                $('.logout').attr('href','#home');

                let logoutresult=await httpModel.get({
                    url:'/api/users/signout',
                })
                if(logoutresult.ret){
                    location.reload();
                }
                /* if(logoutresult.ret){
                    store.remove('token');
                    location.reload();
                } */

            })
            $('.tanchu').on({
                mouseover:function(){
                    $('.minute').show();
                },
                mouseout:function(){
                    $('.minute').hide();
                }
            })
        } else {
            $('#movie-message').attr('href','#home');
            $('#admin-name').html('登录后查看个人信息');
            $('.logout').html('去登录');
            $('.logout').on('click', function () {
                location.hash = 'login';
            })

            $('#sidebar .sub-menu').on('click',function(){
                alert('您还没有登录呢 快去登录吧~');
            })
        }
    }

    async auth(){
        let result=await httpModel.get({
            url:"/api/movielist/isSignin"
        })
        return result;
    }
}

export default new Layout();
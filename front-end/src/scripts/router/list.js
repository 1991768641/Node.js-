import SMERouter from 'sme-router';
import {
    home
} from '../controllers/home';
import * as login from '../controllers/login';
import * as regist from '../controllers/register';
import * as minelist from '../controllers/minelist';
import titleView from '../views/title.art';

const router = new SMERouter('listcontent');
let token = getcookie('token');

if (token) {
    router.route('minelist', minelist.minelister);
    router.route('minelist_add', minelist.add);
    router.route('minelist_update',minelist.update);
    router.use((req) => {

        let url = req.url.slice(0).split('?')[0].split('_')[0];
        $(`.sidebar-menu li[data-url=${url}]`).addClass('highlight').siblings().removeClass('highlight');
        // 面包屑
        let BreadcrumbMap = {
            'home': {
                level1: '管理系统',
                level2: '首页'
            },
            'minelist': {
                level1: '管理系统',
                level2: '电影管理'
            }
        }
        let TitleMap = {
            'home': {
                title: '首页',
                subtitle: '欢迎你'
            },
            'minelist': {
                title: '电影管理',
                subtitle: '管理系统'
            }
        }

        let info = {
            Breadcrumb: {
                level1: BreadcrumbMap[url].level1,
                level2: BreadcrumbMap[url].level2
            },
            Title: {
                title: TitleMap[url].title,
                subtitle: TitleMap[url].subtitle
            }
        }
        let html = titleView({
            title: info.Title,
            breadcrumb: info.Breadcrumb
        })

        $('.mine-box .titles').html(html);

    })
}
window.router = router;
router.route('home', home);
router.route('login', login.loginer);
router.route('register', regist.register);

router.route('*', (req, res, next) => {
    res.redirect('home');
})

export default {
    router
};

function getcookie(key) {
    var a = document.cookie.split('; ');
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        if (b[0] == key) {
            return b[1];
        }
    }
}
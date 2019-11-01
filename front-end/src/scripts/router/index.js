/* import layoutController from '../controllers/layout';
import loginController from '../controllers/login';
import registerController from '../controllers/register';

class Router {

    constructor() {
        this.render();
    }

    render() {
        window.addEventListener('load', this.pageload.bind(this));
        window.addEventListener('hashchange', this.handhashchange.bind(this));
    }
    renderDOM(hash) {
        let pagetoController = {
            layoutController,
            loginController,
            registerController
        }
        pagetoController[hash + 'Controller'].render();
    }

    pageload() {
        let hash = location.hash.substr(1) || 'layout';
        let reg = new RegExp('^(\\w+)', 'g');
        let path = reg.exec(hash);
        location.hash = hash;
        this.renderDOM(path[1]);
    }
    handhashchange() {
        let hash = location.hash.substr(1);
        let reg = new RegExp('^(\\w+)', 'g');
        let path = reg.exec(hash);
        this.renderDOM(path[1]);
    }
}

new Router(); */

/* import SMERouter from 'sme-router';
import './list.js';

import {home} from '../controllers/home';
const router=new SMERouter('listcontent');
console.log($('.listcontent'));
router.route('home',home); */





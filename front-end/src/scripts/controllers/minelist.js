import minelistView from './../views/minelist.art';
import minelistaddView from './../views/minelist.add.art';
import minelist_update from './../views/minelist.update.art';
import httpModel from '../../models/http';

function handleAdd(res) {
    $('#add-btn').on('click', () => {
        res.go('minelist_add');
    });
}

function handupdate(res, obj) {
    let id = $(obj).attr('data-id');
    res.go('minelist_update', {
        id
    });
}
async function handsearch(res, keywords) {
    let result = await httpModel.update({
        url: '/api/movielist/search',
        data: {
            keywords
        }
    })
    if (result.ret) {
        res.render(minelistView({
            list: result.data.list
        }))
    } else {
        res.go('minelist')
    }
}

async function handdelete(res, obj) {
    let id = $(obj).attr('data-id');
    let result = await httpModel.update({
        url: '/api/movielist/',
        type: 'delete',
        data: {
            id
        }
    })
    if (result.ret) {
        res.go('minelist?t=' + (new Date().getTime()));
    }
}

export const minelister = async (req, res, next) => {
    let result = await httpModel.get({
        url: '/api/movielist/'
    })
    if (result.ret) {
        res.render(minelistView({
            list: result.data.list
        }));
        handleAdd(res);
    } else {
        res.go('home');
    }

    $('body').on('click', '.btn-update', function () {
        handupdate(res, this);
    });

    $('body').on('click', '.btn-delete', function () {
        handdelete(res, this);
    });

    $('body').on('keyup', '#search-inp', (e) => {
        if (e.keyCode == 13) {
            handsearch(res, e.target.value);
        }
    });

    $('body').on('click', '#btn-search', function () {
        handsearch(res, $('#search-inp').val());
    });
}

export const add = async (req, res, next) => {
    res.render(minelistaddView());

    /* $('#movieadd').on('click', async function () {
        let $form = $('#movieForm');
        let data = $form.serialize();

        let result = await httpModel.update({
            url: '/api/movielist/',
            data
        });

        if (result.ret) {
            $form[0].reset()
            alert(result.data.message);
            res.go('minelist');
        } else {
            alert(result.data.message);
        }
    }); */

    $('#movieForm').ajaxForm({
        resetForm: true
    })

    $('#movieback').on('click', () => {
        res.go('minelist');
    });

}

export const update = async (req, res, next) => {
    let id = req.body.id;
    let result = await httpModel.get({
        url: '/api/movielist/findOne',
        data: {
            id
        }
    })

    res.render(minelist_update({
        item: result.data
    }));

    /*  $('#movieupdate').on('click', async function () {
         let $updateform = $('#updateForm');
         let data = $updateform.serialize();

         let result = await httpModel.update({
             url: '/api/movielist',
             data: data + '&id=' + id,
             type: 'patch'
         })

         if (result.ret) {
             res.go('minelist')
         } else {
             alert(result.data.message);
         }
     }) */
    $('#updateForm').ajaxForm({
        resetForm: true,
        dataType: 'json',
        url: '/api/movielist',
        method: 'patch',
        success:(result)=>{
            if(result.ret){
                res.go('/minelist')
            }
            alert(result.data.message);
        }
    })


    $('#movieback').on('click', function () {
        res.go('minelist');
    });
}
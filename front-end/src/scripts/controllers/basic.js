import basicView from './../views/basic.art';

export const message=(req,res,next)=>{
    res.render(basicView());
}
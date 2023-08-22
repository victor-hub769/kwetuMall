import express from 'express'

const router = express.Router();

router.get ('/items', (req,res)=>{
    let items = ['eggs','tomatoes','etc'];
    res.send(items);
});


export default router
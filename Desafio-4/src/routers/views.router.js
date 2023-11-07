import {Router} from 'express';
const router = Router();

import fs from 'fs';

router.get('/home', (req, res)=>{
    res.render('home')
})

router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts')
})
export default router;
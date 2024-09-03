
import express from 'express'
import { Router } from 'express'
import ProductManager from '../service/ProductManager.js'



const router = express.Router()
const prodManager = new ProductManager()


router.get('/', (req, res) => {
    
    const obj = prodManager.getAllProducts()
    res.render('home', { obj } )
})



//--------------------------
router.get('/realtimeproducts',(req,res)=>{
     
    res.render('realTimeProducts')
    
})

export default router;
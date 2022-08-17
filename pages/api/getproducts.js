import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

//tshirt is initiallt empty, therefore 'item.title' is'nt in 'tshirts'


const handler = async (req, res)=>{
    let products = await Product.find();
    // products // --> array
    // console.log(products)
    let tshirts = {}
    for(let item of products){
        // item //--> object
        if(item.title in tshirts){
            if(!tshirts[item.title].color.includes(item.color) && item.availableQty>0){
                tshirts[item.title].color.push(item.color)
            }
            if(!tshirts[item.title].size.includes(item.size) && item.availableQty>0){
                tshirts[item.title].size.push(item.size)
            }
        }
        else{
            // key is 'item.title' and the value is whole 'item' 
            tshirts[item.title] = JSON.parse(JSON.stringify(item))
                if(item.availableQty > 0){
                    tshirts[item.title].color = [item.color]
                    tshirts[item.title].size = [item.size]
                }
        }
        // console.log(tshirts)
    }
    res.status(200).json({tshirts})      
}

export default connectDb(handler)
const asyncHandler = require('express-async-handler');
const Item = require('../models/Item');


const getItems = asyncHandler(async(req, res) => {
    

    const items = await Item.find().sort({updatedAt: -1});

    if(!items){

        return res.status(404).json({message: "No items were found"});
    }

    if(items && items.length == 0){
        return res.status(200).json({message: "There are no items"})
    }

    res.status(200).json(items);



    
})


const createItem = asyncHandler(async(req, res) => {

    const user = req.user;


    if((user.roles.indexOf("admin") === -1) && (user.roles.indexOf("vendor") === -1)){
        return res.status(403).json({message: "User is neither vendor nor admin"});
    }



    const {name, brand, model, category, price} = req.body;
    

    
    const item = await Item.create({name, brand, model, category, price});

    if(!item){
        return res.status(404).json("Item could not be create. Something went wrong");
    }
    

    res.status(200).json({message: "Item created successfully", item});

})



const updateItem = asyncHandler(async(req, res) => {


    const user = req.user;
    if((user.roles.indexOf("admin") === -1) && (user.roles.indexOf("vendor") === -1)){
        return res.status(403).json({message: "User is neither vendor nor admin"});
    }

   const {id} = req.params;

   const {name, brand, model, category, price} = req.body;

   const item = await Item.findById(id).exec();

   if(!item){

    return res.status(404).json({message: "Item does not exist"});
   }
   
   item.name = name ? name : item.name;
   item.brand = brand ? brand : item.brand;
   item.model = model ? model : model.brand;
   item.category = category ? category : item.category;
   item.price = price ? price : item.price;
   

   const updateSuccessful = await item.save();

   if(!updateSuccessful){

    return res.status(404).json({message: "Update was not successful"});
   }

   res.status(200).json({message: "Update was successful", updateSuccessful});

   
    

})

const deleteItem = asyncHandler(async(req, res) => {
  
    const {id} = req.params;


    const item = await Item.findOneAndDelete({id});

    if(!item){

        return res.status(404).json({message: "Item does not exist"})
    }

    res.status(200).json({message: "Item deleted successfully", item});

    



})


module.exports = {

    getItems,
    createItem,
    updateItem,
    deleteItem
}




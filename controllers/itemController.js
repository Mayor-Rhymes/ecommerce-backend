const asyncHandler = require('express-async-handler');

const Item = require('../models/Item');


const getItems = asyncHandler(async(req, res) => {
    

    const items = await Item.find().sort({updatedAt: -1});

    res.status(200).json(items);



    
})


const getItem = asyncHandler(async(req, res) => {
    
    const {id} = req.params.id;
    const item = await Item.findById(id);

    res.status(200).json(item);



    
})



const createItem = asyncHandler(async(req, res) => {

    const user = req.user;


    
    if((user.roles.indexOf("admin") === -1) && (user.roles.indexOf("vendor") === -1)){
        return res.status(403).json({message: "User is neither vendor nor admin"});
        
    } 



    const {name, brand, model, category, price} = req.body;
    

    
    const item = await Item.create({name, brand, model, category, price});

    if(!item){
        return res.status(404).json("Item could not be created. Something went wrong");
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

   const item = await Item.findById(id);

   if(!item){

    return res.status(404).json({message: "Item does not exist"});
   }
       

   const updateSuccessful = await Item.findByIdAndUpdate(id, {name, brand, model, category, price}, {new: true});


   if(!updateSuccessful){

    return res.status(404).json({message: "Update was not successful"});
   }
   


   res.status(200).json({message: "Update was successful", updateSuccessful});

   
    

})

const deleteItem = asyncHandler(async(req, res) => {
  
    const {id} = req.params;
    const user = req.user;

    if((user.roles.indexOf("admin") === -1) && (user.roles.indexOf("vendor") === -1)){
        return res.status(403).json({message: "User is neither vendor nor admin"});
        
    } 


    const item = await Item.findOneAndDelete({id});

    if(!item){

        return res.status(404).json({message: "Item does not exist"})
    }

    res.status(200).json({message: "Item deleted successfully", item});

    



})


module.exports = {

    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}




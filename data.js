const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/E-Help');
const help_schema=new mongoose.Schema({
   Name:{
   type:String,
require:[true,"Name is Mandatory"]
   },
   password:{
    type:String,
    require:[true,"Password Fied is mandatory"]
   }
});
module.exports=mongoose.model('E-help',help_schema);

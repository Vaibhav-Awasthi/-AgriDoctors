const mongoose=require('mongoose')
const bcrypt = require('bcrypt')

const cropSchema=new mongoose.Schema(
    {
        DiseasePic: {type:String,required:true} ,// stores url of the image
        DiseaseDesc:{type:String},
        DiseaseDiagnosis:{type:String},
        Confidence:{type:Number}

        
    }
)



const Crop=mongoose.model('Crop',cropSchema);


module.exports=Crop;
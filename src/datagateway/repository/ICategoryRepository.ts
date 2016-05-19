
import mongoose = require("mongoose");

interface ICategoryRepository<T extends mongoose.Document>{ 
    getRootCategory: (isAppendChild:boolean ,callback: (error:any, result: any) => void) => void;   
} 

export = ICategoryRepository;
import mongoose = require("mongoose");

interface ICategoryModel extends mongoose.Document {
    name: string;
    desc: string;
    parent: any;
    childrens: any[];
    create_date: Date;
}

export = ICategoryModel;
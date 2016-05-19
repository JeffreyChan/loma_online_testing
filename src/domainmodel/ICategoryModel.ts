import IEntityModel = require("./IEntityModel");

interface ICategoryModel extends IEntityModel {
    name: string;
    desc: string;
    parent: any;
    childrens: any[];
    create_date: Date;
}

export = ICategoryModel;
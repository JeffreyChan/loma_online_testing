"use strict";
/// <reference path="typings/tsd.d.ts" />
var Rx = require('rx');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/loma');
var Category = require("./models/Category");
mongoose.connection.once('open', function () {
    // step 1 prepare data
    var catList = [];
    var catRoot = new Category({
        name: "LOMA280",
        desc: "Principles of Insurance(2011)",
        parent: null
    });
    var cat1 = new Category({
        name: "chapter_1",
        desc: "Introduction to Risk and Insurance",
        parent: catRoot
    });
    var cat2 = new Category({
        name: "chapter_2",
        desc: "The Life and Health Insurance Industry",
        parent: catRoot
    });
    var cat3 = new Category({
        name: "chapter_3",
        desc: "The Insurance Contract",
        parent: catRoot
    });
    var cat4 = new Category({
        name: "chapter_4",
        desc: "Financial Design of Life Insurance Products",
        parent: catRoot
    });
    var cat5 = new Category({
        name: "chapter_5",
        desc: "Term Life Insurance",
        parent: catRoot
    });
    var cat6 = new Category({
        name: "chapter_6",
        desc: "Cash Value Life Insurance and Endowment Insurance",
        parent: catRoot
    });
    var cat7 = new Category({
        name: "chapter_7",
        desc: "Supplemental Benefits",
        parent: catRoot
    });
    var cat8 = new Category({
        name: "chapter_8",
        desc: "Individual Life Insurance Policy Provisions and Ownership Rights",
        parent: catRoot
    });
    var cat9 = new Category({
        name: "chapter_9",
        desc: "Life Insurance Policy Ownership Rights",
        parent: catRoot
    });
    var cat10 = new Category({
        name: "chapter_10",
        desc: "Annuities",
        parent: catRoot
    });
    var cat11 = new Category({
        name: "chapter_11",
        desc: "Principles of Group Insurance",
        parent: catRoot
    });
    var cat12 = new Category({
        name: "chapter_12",
        desc: "Group Life Insurance and Group Retirement Plans",
        parent: catRoot
    });
    var cat13 = new Category({
        name: "chapter_13",
        desc: "Health Insurance",
        parent: catRoot
    });
    var cat14 = new Category({
        name: "chapter_14",
        desc: "Health Insurance Policies",
        parent: catRoot
    });
    var childrens = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10, cat11, cat12, cat13, cat14];
    Rx.Observable.from(childrens).subscribe(function (c) {
        catRoot.childrens.push(c);
    });
    catList.push(catRoot);
    catList = catList.concat(childrens);
    console.log('step 1: all categories init done!');
    // step 2 delete all category
    Category.remove({}).exec(function (err, cats) {
        if (err) {
            console.log("\nSomething wrong with create categories! Please see the log." + err);
        }
        else {
            console.log('step 2: remove all categories done!');
        }
        //step 3 init category data
        Category.create(catList, function (err, cats) {
            if (err) {
                console.log("\nSomething wrong with create categories! Please see the log." + err);
            }
            else {
                console.log('step 3: all categories was created succesfully!');
            }
            mongoose.disconnect();
        });
    });
});

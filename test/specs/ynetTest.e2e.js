const ynetPage= require('../pageobjects/ynetNews.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const mongoose = require("mongoose");
const Ynet= require('../../model/ynet.js');



describe('Articles Data', () => {
    let articleArray;
    let num=1;
    it('Connect DB ', async()=>{
        await ynetPage.connectDB();
    })




    it('Main Article Data', async()=>{
        startStep('click on main article');
        await ynetPage.clickOnMainArticleButton();
        
        endStep();
        await ynetPage.printData(articleArray,num); 
        num++;
    })

   

    it('Four Sub-Main Articles Data ', async()=>{
        
        await ynetPage.dataFromMainSubTitleArticle(articleArray,num);
        num+= await ynetPage.subArticlesButton.length;        
    })

    it('Political News Data ', async()=>{
        articleArray=[];        
        await ynetPage.dataFromPoliticalArticle(articleArray,num);        
        num+=1;
        
    })

    it('Isreal News Data ', async()=>{
        articleArray=[];

        await ynetPage.dataFromIsrealNewsArticle(articleArray,(num+2));
      
    })

    it('World News Data ', async()=>{
        articleArray=[];
  
        await ynetPage.dataFromWorldNewsArticle(articleArray,(num+3));
    })

   
})


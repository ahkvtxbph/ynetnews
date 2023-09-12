
const { default: mongoose } = require('mongoose');
const BasePage = require('../pageobjects/base.page');
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;
const Ynet= require('../../model/ynet.js');





class ynetNewsPage {



//////////////////////////data from article///////////////////////////////////////////////////

    get titleText(){ return $("//*[@class='mainTitle'] |  //*[@class='BlogsPageTitle']");}
    get subTitleText(){ return $("//div[@class='subTitleWrapper'] |  //*[@class='BlogsPageSubTitle']");}
    get summaryText(){ return $$("//*[@class='text_editor_paragraph rtl']");}
    get imageText(){ return $$("[id^='ReduxEditableImage_ArticleImageData']");}
    get dateTimeText(){ return $(".DateDisplay");}
    get blog(){return $('.blogs-auto-feed-header a');}
    get authorsText(){return $("//*[@class='authors ']/span[1]/a")}
    
/////////////////////////////articles/////////////////////////////////////////////////

    get mainArticleButton(){ return $("//*[@class='TopStory1280Componenta basic AuthorOnMode']");}
    get subArticlesButton(){ return $$("//*[@class='YnetMultiStripComponenta oneRow']/div/div[1]/div[1]/div[1]");}
    get politicalAndSecurityButton(){return $$("(//*[@class='slotsContent'])[2]/div/div[@class='slotView']/div[1]/div[1]/a");}
    get isrealNewsButton(){ return $$("(//*[@class='slotsContent'])[4]/div/div[@class='slotView']/div[1]/div[1]/a");}
    get worldNewsButton(){ return $$("(//*[@class='slotsContent'])[5]/div/div[@class='slotView']/div[1]/div[1]/a");}

    /////////////popup between the pages//////////////////////////
    get popup(){ return $("//*[@id='closeimg']");}


       


   //----------------------------------------------------------
   //Click
   //----------------------------------------------------------


    async clickOnMainArticleButton(){
        return await BasePage.clickButton(this.mainArticleButton);
        
    }

    async closePopup(){
        if(await this.popup.isExisting({ timeout: 2000 })){
            await this.popup.click();
            await browser.pause(3000);
        }

    }


    //----------------------------------------------------------
    //Actions (get)
    //----------------------------------------------------------

    async getTitle(){
        startStep('print title text');       
        endStep();

        return await BasePage.getText(this.titleText);
    }

    async getSubTitle(){
        startStep('print sub title text');       
        endStep();

        return await BasePage.getText(this.subTitleText);
    }

     async getTime(){
        let temp;
        startStep('print Time text');       
        endStep();
        if ((await this.blog).isExisting)
          {temp= '00:00';} 
       else 
        {temp= await BasePage.getText(this.dateTimeText);}
        return temp;
    }

    async getDate(){
        startStep('print Time text');       
        endStep();
        const date = new Date();
        let day =  date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        const datec=day+"/"+month+"/"+year;
       
        return await datec;

    }
    

    async getImg(){

        startStep('print img text');       
        let list= await this.imageText;
        endStep();
        return await BasePage.getAtribute(list[0],'src');
        

    }

    async getSummery(){
        startStep('print summery text');       
        let list= await this.summaryText;
        let summary= "";
        for( let i=0; i< list.length; i++ ){
           summary+= await BasePage.getText(list[i]);
        }
        endStep();
        return summary;
    }

    async connectDB(){
        startStep('connectDB');       
         mongoose.connect('mongodb+srv://yaal-2122:wsmJQ3ggbFxFtHX@cluster0.qnlfmxm.mongodb.net/GQ-Dashboard')
        //  mongoose.connect('mongodb+srv://shilo:a72Y53vXKjhNDAJn@chatnews.uaripa9.mongodb.net/GQ-Dashboard')
        .then(() => console.log('Connected!'));   

       
    endStep(); 
}
   async updateDB()
   { this.connectDB();
       const filter = { count: "11" };
        const update = { title: "Blabla" };        
        let doc1=await Ynet.findOne(filter);
        console.log("updateDB status - "+doc1);
//        let doc = await Ynet.findOneAndUpdate(filter, update);
   }


    //----------------------------------------------------------
    //Actions 
    //----------------------------------------------------------
 

    async dataFromMainSubTitleArticle(arr1,num){
        
        let list= await this.subArticlesButton;
        
        for(let i= 0; i< list.length ; i++){
            startStep(" clicking on article number "+ (i+1));
            console.log("List "+i+" "+list[i].getText());
            console.log("num "+num);
           
            await BasePage.clickButton(list[i]);
            await this.printData(arr1,num);
            num++;
            endStep();
            
        }

    }

    async dataFromPoliticalArticle(arr1,num){
        let list= await this.politicalAndSecurityButton;

        for(let i=0; i< 3; i++){
            startStep(" clicking on article number "+ (i+1));
            console.log("num "+num);
           
            await BasePage.clickButton(list[i]);
            await this.printData(arr1,num);
            num++;
            endStep();
            
        }
    }

    async dataFromIsrealNewsArticle(arr1,num){
        
        let list= await this.isrealNewsButton;

        for(let i=0; i<1; i++){
            startStep(" clicking on article number "+ (i+1));
            console.log("num "+num);
            
            await BasePage.clickButton(list[i]);
            await this.printData(arr1,num);
            num++;
            endStep();
           
        }
        
    }

    async dataFromWorldNewsArticle(arr1,num){
        
        let list= await this.worldNewsButton;

        for(let i=0; i<1; i++){
            startStep(" clicking on article number "+ (i+1));
            console.log("num "+num);
            
            await BasePage.clickButton(list[i]);
            await this.printData(arr1,num);
            num++;
            endStep();
        }
        
    }

    async printData(arr1,num){
        
        
        startStep("printing the data of the article");
        let title1=await this.getTitle();
        let subTitle1=await this.getSubTitle();
        let time1=await this.getTime();
        let date1=await this.getDate();
        let img1=await this.getImg();
         if (img1.length<1)
         {img1='https://ynet-pic1.yit.co.il/picserver5/wcm_upload/2021/06/02/BylDa46E900/ynet_menu_logo_2x.png'}
        let summery1=await this.getSummery();
        let author1='ynet_news';
        console.log("title is: " +await this.getTitle());
        console.log("img link: " +await this.getImg());
        console.log("sub title: " +await this.getSubTitle());
        console.log("time: " +await this.getTime());
        console.log("date: " +await this.getDate());
        console.log("summery : " +await this.getSummery());
        console.log("-----------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("num "+num);
        arr1=[{title:title1, subTitle:subTitle1,time:time1, date:date1, image:img1, summary:summery1,author:author1,count: num}];
         
        const filter = { count: num.toString() };
        let doc1=await Ynet.findOne(filter);
        console.log("filter - "+doc1);;
        if (doc1== null)
        {
            console.log("filter - "+doc1);
        const ynet= await Ynet.create(arr1[0]);
        console.log("Insert "+num+" verify")
        }
        else{
            console.log("filter - "+doc1);
            const update = {title:title1, subTitle:subTitle1,time:time1, date:date1, image:img1, summary:summery1,author:author1,count: num}; 
            let doc = await Ynet.findOneAndUpdate(filter, update);
            console.log("Update "+num+" verify")
        }
        
        
        endStep();
        startStep("back to home page");
        await browser.pause(2000);
        await browser.back();
        endStep();
        await browser.pause(7000);

    }




}
module.exports = new ynetNewsPage();

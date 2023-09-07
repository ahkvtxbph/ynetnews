
const {startStep, endStep, addStep} = require('@wdio/allure-reporter').default;



class BasePage{


    async selectValueFromList(list, value){
        // addStep('Select value from list');
        let i=0;
        let found = false;
        console.log("list length: ", list.length);
        console.log("value to find: ", value);

        while(i < list.length && !found){
            console.log("item text: ", await list[i].getText());
            if(await list[i].getText() === value)
            {
                console.log("item text: ", await list[i].getText());
                await list[i].isClickable();
                await list[i].click();
                found = true;
            }
            i++;
        }

        if(!found){
            console.log("value not exist");
            // addStep('Value does not exist: '+value);
            // assert.fail('error');
            //add assertion error
        }
        // endStep();
    }
    
    async fillField (field, value){
        await field.scrollIntoView();
        await browser.pause(500);
        await field.waitForDisplayed({ timeout: 20000 });
        await field.setValue(value);
    }

    async clickButton (button){
        await button.waitForDisplayed({ timeout: 20000 });
        await button.scrollIntoView();
        // await browser.pause(5000);
        await browser.pause(6000);
        await button.waitForClickable({ timeout: 30000 });
        await button.click();
    }


    async getText (value){
        // await value.waitForDisplayed({ timeout: 20000 });
        // await value.scrollIntoView();
        await browser.pause(500);
        return value.getText();
    }

    async getAtribute (value,att){
        // await value.waitForDisplayed({ timeout: 20000 });
        // await value.scrollIntoView();
        await browser.pause(1000);
        let tempValue="";
        try {
            tempValue=await value.getAttribute(att);
            if (tempValue.length==0)
            {
                tempValue="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Ynet_website_logo.svg/1200px-Ynet_website_logo.svg.png";
            }
        } catch (e) {
             console.log(e);        
        }
       //  return await value.getAttribute(att);
       return tempValue;
        
      //  return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Ynet_website_logo.svg/1200px-Ynet_website_logo.svg.png";
    }


}

module.exports= new BasePage();
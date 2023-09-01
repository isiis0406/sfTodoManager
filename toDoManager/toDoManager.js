import { LightningElement, track } from 'lwc';

export default class ToDoManager extends LightningElement {
    @track time;
    greeting;
    @track toDos = [];

    connectedCallback(){
        this.getTime();
        setInterval(() => {
            this.getTime();
            //console.log("set interval called");
        }, 1000 * 60);

        
    }

    getTime(){
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();
        this.time = `${this.getHour(hour)}:${this.getDoubleDigit(min)} ${this.getMidDay(hour)}`

        this.setGreeting(hour);
        console.log(this.time);
        console.log(this.greeting);
    }
    getHour(hour){
   
        return hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;
        //return hour;
    }
    getMidDay(hour){
        return hour >12 ? "PM" : "AM";
    }
    getDoubleDigit(digit){
        return digit < 10 ? "0"+ digit : digit;
    }
    setGreeting(hour){
        if(hour < 12){
            this.greeting ="Good Mornung";
        }else if(hour >=12 && hour < 17){
            this.greeting ="Good Afternoon";
        }else{
            this.greeting= "Good Evening";
        }
    }

    addTodoHandler(){
        const inputBox = this.template.querySelector('lightning-input');
        this.toDos.push(inputBox.value);
        //console.log('current value', inputBox.value);
    }
};
// calc values
let bill,tip=0,numberPeople,finalTip=0,finalTotal=0,tipClick,isClick;

// capture bill input
let catchBill = document.querySelector("#bill");
 
// capture select
let tipCard = document.querySelectorAll(".tip-card");

// capture tip-card-input 
let tipInput = document.querySelector('#tipInput');

// capture number of people
let peopleCount = document.querySelector('#people');

// capture reset button
let reset = document.querySelector('#reset');

// slice input
catchBill.addEventListener('input',limitInput);
peopleCount.addEventListener('input',limitInput);
tipInput.addEventListener('input',limitInput);

// add event on tip card click
tipCard.forEach(function(el){
    el.addEventListener("click", () => {
        tipInput.value = "";
        if(!el.classList.contains('active'))
        {
            removeActive();
        }
        let value = el.value;
        tip = parseFloat(value);
        let result = toggleActive(el);
        if(!result) {
            tip = 0;
        }
        init();
    })
})

// remove active when tip input is focus
tipInput.addEventListener('focus',function() {
    removeActive();
    tip = 0;
    init();
})

// add active class
function toggleActive(el){
    return el.classList.toggle('active');
}

// remove active class
function removeActive() {
    tipCard.forEach(function(el){
        if(el.classList.contains('active')){
            el.classList.remove('active');
        }
    })
}

// check tip input if valid or not
function checkInput (selector,label) {
    let dangerInput = document.querySelector(`${label}-input`);
    let dangerLabel = document.querySelector(`${label}-danger-text`);
    if(parseInt(selector.value) === 0 ){
        dangerLabel.innerText = "Can't be Zero";
        dangerInput.classList.add("border-danger");
    }else if (parseInt(selector.value) < 0 ){
        dangerLabel.innerText = "Must be greater than 0";
        dangerInput.classList.add("border-danger");
    }
     else {
        dangerLabel.innerText = "";
        if(dangerInput.classList.contains("border-danger")){
            dangerInput.classList.remove("border-danger");
        }
    }
}

// reset
reset.addEventListener('click',killAll);

// remove all input and values
function killAll() {
    catchBill.value = "";
    peopleCount.value = "";
    removeActive();
    tipInput.value = "";
    tip = 0;
    finalTip = 0;
    finalTotal = 0;
    showResult('.tip-amount',finalTip);
    showResult('.total-amount',finalTotal);
}


// catch them all
function catchInput (){
    bill = parseFloat(catchBill.value);
    numberPeople = parseFloat(peopleCount.value);
    if(tipInput.value){
        tip = parseInt(tipInput.value);
    } else if (tipInput.value == "" && tipInput == document.activeElement) {
        tip = 0;
    }
}


// calculate function 
function calculate() {
    if(bill > 0 && tip >= 0 && numberPeople > 0){
        finalTip = (bill / 100) * tip;
        finalTotal = (bill + finalTip);
    }
     else {
        finalTip = 0;
        finalTotal =0;
    }
}

// miniValue
function miniValue(value) {
    let newValue = value;
    if(value > 0){
        if(value > 999){
            if(value > 999999){
                if(value > 999999999){
                    newValue = (value / 1000000000).toFixed(2) + "b";
                } else {
                    newValue = (value / 1000000).toFixed(2) + "m";
                }
            } else {
                newValue = (value / 1000).toFixed(2) + "k";
            }
        } else {
            newValue = value.toFixed(2);
        }
    }
    return newValue;
}

// limit input
function limitInput(){
    this.value = this.value.slice(0,this.max);
}

// show result 
function showResult(selector,value) {
    let parent = document.querySelector(selector);
    
    if(value >  0)
    {
        let newValue = miniValue(value);
        parent.querySelector('.amount-price').innerText ="$" +newValue;
    } else if (value == 0) {
        parent.querySelector('.amount-price').innerText ="$" +value.toFixed(2);
    }
}

// init function
function init() {
    checkInput(catchBill,".bill");
    checkInput(peopleCount,".people");
    catchInput();
    calculate();
    showResult('.tip-amount',finalTip);
    showResult('.total-amount',finalTotal);
}

document.addEventListener('keyup',init);

init();
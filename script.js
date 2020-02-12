(function() {
//////////////// Public Variables ///////////////////
const input = document.getElementsByTagName('input');

const form = document.getElementById('form');

const printBtn = document.querySelector('.printbtn');
const controller = document.querySelector('.controller');
const clearBtn = document.querySelector('.clearbtn');
const main = document.querySelector('.main');
const total = document.querySelector('.totalamount');
const dateField = document.querySelector('.datefield');

const items = document.querySelectorAll('.items');
const amountInput = document.querySelectorAll('.amount-input');
const itemNumberArray = document.querySelectorAll('.item-number');
const priceArray = document.querySelectorAll('.price-input');
const qty = document.querySelectorAll('.qty-input');

const none = 'none';
const backAgain = '1px solid lightgray';

//////////////// Our Object & Arrays /////////////////
let partNumArray = [];

const itemList = {

    hl1038: { part: '1038', desc: 'NAV Headlamp' },

    hl1045: { part: "1045", desc: "Headlamp - Gray" },

    hl1090: { part: "1090", desc: "Pro Kit - 6 pc" },

    hl1205: { part: "1205", desc: "HEX Speaker" },

    hl1236: { part: "1236", desc: "Headlamp - Yellow" },

    hl1243: { part: "1243", desc: "Headlamp - Black" },

    hl1250: { part: "1250", desc: "Mammoth - Yellow" },

    hl1304: { part: "1304", desc: "PUC - Black" },

    hl1342: { part: "1342", desc: "PUC - Yellow" },

    hl1342b: { part: "1342b", desc: "PUC - Yellow (box)" },

    hl1441: { part: "1441", desc: "Journey 150 - Black" },

    hl1533b: { part: "1533b", desc: "Journey 160 - Purple (box)"},

    hl1540b: { part: "1540b", desc: "Journey 160 - Pink (box)"},

    hl1557: { part: "1557", desc: "Journey 150 - Yellow" },

    hl1564: { part: "1564", desc: "Journey 160 - Black" },

    hl1564b: { part: "1564b", desc: "Journey 160 - Black (box)" },

    hl1571: { part: "1571", desc: "Journey 250 - Black" },

    hl1588: { part: "1588", desc: "Journey 160 - Yellow" },

    hl1588B: { part: "1588b", desc: "Journey 160 - Yellow (box)" },

    hl1595: { part: "1595", desc: "Journey 150 - Black" },

    hl1663: { part: "1663", desc: "Journey 250 - Realtree" },

    hl1694: { part: "1694", desc: "Journey 160 - Realtree" },

    hl1755: { part: "1755", desc: "Journey 300 - Black" },

    hl1762: { part: "1762", desc: "Journey 300 - Yellow" },

    hl1779: { part: "1779", desc: "Journey 300 - Gray" },

    hl1793: { part: "1793", desc: "Journey 600 - Black" },

    hl1823: { part: "1823", desc: "Mammoth - True Timber" },

    hl1847: { part: "1847", desc: "Journey 300 - True Timber" },

    hl1854: { part: "1854", desc: "True Timber Pro Kit - 7 pc"},

    hl1885: { part: "1885", desc: "Atlas 600 - Black" },

    hl1915: { part: "1915", desc: "PUC - Gray" },

    hl1939: { part: "1939", desc: "Atlas 600 - Gray" },

    hl9999: { part: "9999", desc: "Other" },

    hl2: { part: "2", desc: "freight"}
    
}


///////////////// Public functions /////////////////
function eventListeners() {
    printBtn.addEventListener('click', printIt);
    clearBtn.addEventListener('click', clearForm);

    // attach event listener to every item-number input
    itemNumberArray.forEach(function(elem) {
        elem.addEventListener('change', getDesc);
    });

    // event listener to every price-input input
    priceArray.forEach(function(object) {
        object.addEventListener('change', checkCurrency)
    });

    // event listener on qty
    qty.forEach(function(elem) {
        elem.addEventListener('change', recalcItem)
    }); 
}


function printIt() {
    controller.style.display = 'none';
    borderDrop(none);
    print();
    borderDrop(backAgain);
    printBtn.style.border = 'none';
    clearBtn.style.border = 'none';
    controller.style.display = 'grid';
}


function borderDrop(value) {
    for (let i = 0; i < 21; i++) {
        input[i].style.border = value;
    }
}


function clearForm() {
    form.reset();
    total.innerText = '$ - ';
    date();
}


function createDataList() {
    // create array of objects from our Object
    const values = Object.values(itemList);
    
    // iterate array of objects to create array of part #'s
    for (let i = 0; i < values.length; i++) {
        let parts = Object.values(values[i]);
        let x = parts[0];
        partNumArray.push(x);
    }
     
    // create html datalist
    const dataList = document.createElement('datalist');
    dataList.id = 'itemList';
    main.appendChild(dataList);
    
    // iterate part# array to create options for datalist
    for (let i = 0; i < partNumArray.length; i++) {
        const option = document.createElement('option');
        option.value = partNumArray[i];
        dataList.appendChild(option);
    }
}


// auto populate description element
function getDesc() {
    // create array of objects from our Object
    const values = Object.values(itemList);
    
    for (let i = 0; i < values.length; i++) {
        if(event.target.value === values[i].part) {
            event.target.nextElementSibling.value = values[i].desc;
            return;
        } else {
            event.target.nextElementSibling.value = 'no item #';
        }
    }
}


// currency format for Price Ea.
function checkCurrency() {
    event.target.value = Number(event.target.value).toFixed(2);
    calcItem();
    calcTotal();
}


// calculate amount for line item
function calcItem() {
    const z = event.target.parentElement.children[0].value;
    const x = event.target.value;
    event.target.nextElementSibling.value = Number(x * z).toFixed(2);
 }


// get date
 function date() {
    let currDate = new Date();
    const dd = String(currDate.getDate()).padStart(2, '0');
    const mm = String(currDate.getMonth() + 1).padStart(2, '0');
    const yyyy = currDate.getFullYear();
    currDate = `${mm}/${dd}/${yyyy}`;
    dateField.value = currDate;
}


// calculate total 
function calcTotal() {
    let sum;
    const amountArray = [];

    for (let i = 0; i < amountInput.length; i++) {
        const x = amountInput[i].value;
        if (x === "") {
            // do nothing
        } else {
            amountArray.push(Number(x));
            const add = (a,b) => a + b;
            sum = amountArray.reduce(add);
            total.innerText = '$ ' + sum.toFixed(2);
        }
    }
}

// recalc totals if qty changes
function recalcItem() {
    const val = event.target.value;
    const y = event.target.parentElement.children[4].value;
    const z = event.target.parentElement.children[5];

        if (y === '') {
            // do nothing
        } else {
            z.value = (val*y).toFixed(2);
        }

    calcTotal();
}


////////////////// Start Application ////////////
eventListeners();
date();
createDataList();

////////////////// Testing ////////////////////


})();
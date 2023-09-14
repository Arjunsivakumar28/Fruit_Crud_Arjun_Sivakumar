console.log("App Works!");

let fruits = [];

// Local Storage
// Stores info even after closing tab and refresh
// Session Storage
// Does not store info afetr closing tab but stores on refresh
// cookies
// sends cookie info to request and response operations between front end and back end

// check
console.log("Initial data check", JSON.parse(localStorage.getItem("fruits")));
if (JSON.parse(localStorage.getItem("fruits")) != null) {
    fruits = JSON.parse(localStorage.getItem("fruits"));
    displayFruits();
}

// HW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// CHECK LENGTH OF ARRAY OR ANY ATTRIBUTE THAT IS NULL USING CONSOLE LOG THEN CHECK THAT AND 
// SOLVE GET NULL BUG FROM LOCAL STORAGE

// Add Fruit to fruits array
function saveFruits() {
    console.log("Fruit saving is in progress!");
    // Click results in alert box in chrome site.
    // alert("Fruit is saved after click!");

    let fruit = new Object();
    if (document.getElementById("fname").value != "" && document.getElementById("fcolor").value != "") {
        fruit.name = document.getElementById("fname").value;
        console.log("Fruit Name : ", fruit.name);
        fruit.color = document.getElementById("fcolor").value;
        console.log("Fruit Color : ", fruit.color);
        fruit.id = "";
        for (let i = 0; i < fruit.name.length; i++) {
            fruit.id += fruit.name.charCodeAt(i);
        }
        for (let i = 0; i < fruit.color.length; i++) {
            fruit.id += fruit.color.charCodeAt(i);
        }
        let index = fruits.findIndex(f => f.id == fruit.id);
        if (index == -1) {
            fruits.push(fruit);
            displayFruits();
        } else {
            let modalHtml = `
            <div class="alert alert-danger alert-dismissible fade show">
            <strong>Duplicate Warning!</strong> A fruit of the same name and color already exists.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
            `
            document.getElementById("duplicateWarning").innerHTML = modalHtml;
        }
    }

    reset();

};

// Resets value of fruit object input fields.
function reset() {
    document.getElementById("fname").value = null;
    document.getElementById("fcolor").value = null;
}

// tmp fucntion to print fruits array in console.
function printFruits() {
    console.log("Fruits : ", fruits);
}

// Read Function
function displayFruits() {

    localStorage.setItem("fruits", JSON.stringify(fruits));

    let baseHtml = "";

    for (let fruit of fruits) {

        baseHtml += `<div class=container-cus>

        <div class="d-flex flex-column">

        <div class="d-flex">
        <span class="me-1"><b>Fruit Name : </b></span>
        <span id="fnameDp">`+ fruit.name + `</span>
        </div>

        <div class="d-flex">
        <span class="me-2"><b>Fruit Color : </b></span>
        <span id="fcolorDp">` + fruit.color + `</span>
        </div>

        <div class="d-flex mt-3">
        <button class= "btn btn-outline-secondary ms-2 me-2 w-100" type="button"
        id="editDropdown" data-bs-toggle="dropdown" aria-expanded="true">
        Edit</button>

        <button class="btn btn-outline-danger me-2 w-100" id="deleteFruit" 
        onclick="deleteFruit(this)">Delete</button>
        

        <div class="dropdown-menu">
        <form class="p-4" aria-labelledby="editDropdown">

        <label for="newFnameDp" class="form-label"><b>New Fruit Name: </b></label>
        <input class="form-control" id="newFnameDp" required>

        <label for="newFcolorDp" class="form-label"><b>New Fruit Color: </b></label>
        <input class="form-control" id="newFcolorDp" required>

        </form>

        <button class="btn btn-primary ms-4" type="submit" onclick="updateFruit(this)">
        Submit</button>

        </div>

        </div>

        </div>
        </div>`;
    }   

    console.log("Base HTML : ", baseHtml);

    // converts string into html code and sends it to html file with element that has id
    document.getElementById("displayFruits").innerHTML = baseHtml;

}

function updateFruit(ele) {
    // splice function
    // f(start, ?deleteCount, ...items)
    // talk about ? thread operator delete count
    let editFruitName = ele.parentElement.parentElement.parentElement.children[0].children["fnameDp"].innerText;

    let editFruitColor = ele.parentElement.parentElement.parentElement.children[1].children["fcolorDp"].innerText;

    let editId = "";
    for (let i = 0; i < editFruitName.length; i++) {
        editId += editFruitName.charCodeAt(i);
    }
    for (let i = 0; i < editFruitColor.length; i++) {
        editId += editFruitColor.charCodeAt(i);
    }

    let fruitObj = new Object();
    fruitObj.name = editFruitName;
    fruitObj.color = editFruitColor;
    fruitObj.id = editId;

    console.log("fruitObj : ", fruitObj);

    let editFruitObj = fruits.find((fruit) => (fruit.id == editId));

    let testFruitObj = fruits.find((f) => JSON.stringify(f) == JSON.stringify(fruitObj))

    console.log("Does === to method work on objects -> editFruitObj : ", editFruitObj, "\n", "testFruitObj : ", testFruitObj)

    console.log("old fruit name : ", editFruitObj.name);

    console.log("old fruit color : ", editFruitObj.color);

    let newFruit = new Object();

    if (ele.parentElement.children[0].children["newFnameDp"].value != "") {
        newFruit.name = ele.parentElement.children[0].children["newFnameDp"].value;
    } else {
        newFruit.name = editFruitObj.name;
    }

    if (ele.parentElement.children[0].children["newFcolorDp"].value != "") {
        newFruit.color = ele.parentElement.children[0].children["newFcolorDp"].value;
    } else {
        newFruit.color = editFruitObj.color;
    }

    newFruit.id = "";
    for (let i = 0; i < newFruit.name.length; i++) {
        newFruit.id += newFruit.name.charCodeAt(i);
    }
    for (let i = 0; i < newFruit.color.length; i++) {
        newFruit.id += newFruit.color.charCodeAt(i);
    }

    let index = fruits.findIndex(f => f.id == newFruit.id);

    if (index == -1) {
        fruits.splice(fruits.indexOf(editFruitObj), 1, newFruit);
        displayFruits();
    } else {
        let modalHtml = `
            <div class="alert alert-danger alert-dismissible fade show">
            <strong>Duplicate Warning!</strong> A fruit of the same name and color already exists.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
            `
        document.getElementById("duplicateWarning").innerHTML = modalHtml;
    }

}

function deleteFruit(ele) {

    let editFruitName = ele.parentElement.parentElement.children[0].children["fnameDp"].innerText;

    let editFruitObj = fruits.find((fruit) => fruit.name == editFruitName);

    fruits.splice(fruits.indexOf(editFruitObj), 1);

    displayFruits();
}

// assiignmenyt finish update and delete with different objects put in a table and put in different screens
// 50 days 50 projects github
// 100 days css challeneg
import Wishlist from "./wishlist";

//DOM Selection Statements
const carForm = document.querySelector("#submitForm");
const carMakeInput = document.querySelector("#makeInput");
const carModelInput = document.querySelector("#modelInput");
const carYearInput = document.querySelector("#yearInput");
const carMakeP = document.querySelector("#car-make");
const carModelP = document.querySelector("#car-model");
const carYearP = document.querySelector("#car-year");
const removeButton = document.querySelector(".removeBtn");
const wishListUl = document.querySelector("#wishListContainer > ul");

//Internal state variable
const carsWishList = new Wishlist();
//Adding cars to the state (information behind the scene)
carsWishList.add("Chevy", "2500", 2023);
carsWishList.add("Ford", "F-150", 2010);
carsWishList.add("Honda", "Accord", 2017);
updateDOMList();

function showCarDetails(car) {
    carMakeP.textContent = car.make;
    carModelP.textContent = car.model;
    carYearP.textContent = car.year;
    //Enable the button
    removeButton.disabled = false;
    removeButton.addEventListener("click", removeCar);
    //Storing the current car's id inside the button
    removeButton.setAttribute("data-carId", car.id);
}

//Generic DOM Update Function
function updateDOMList() {
    //Reset everything in the unorderd list
    wishListUl.textContent = "";
    //Iteration over the cars
    carsWishList.list.forEach((car, index, arr) => {
        //Create the list item
        const newLi = document.createElement("li");
        const newP = document.createElement("p");
        newP.textContent = `${car.make} ${car.model}`;

        //Add a click event to the list item
        newLi.addEventListener("click", () => {
            showCarDetails(car);
        })
    
        //Append Everything!
        newLi.appendChild(newP);
        wishListUl.appendChild(newLi);
    });
}

//Add an event to the "Add" button
carForm.addEventListener("submit", addCar);

//The callback function for a submit event
function addCar(event) {
    event.preventDefault();
    //Rewrite with destructuring
    const { value : tempMakeVal } = carMakeInput;
    //const tempMakeVal = carMakeInput.value;
    const tempModelVal = carModelInput.value;
    const tempYearVal = carYearInput.value;

    //This updated our internal state
    carsWishList.add(tempMakeVal,tempModelVal, tempYearVal);
    //We need to make sure that the display is 
    //up to date with our internal state
    updateDOMList();
}

function removeCar() {
    //Retrieveing the current car id off of the removeButton element.
    const carId = Number(removeButton.getAttribute("data-carId"));

    //Added Extra Bonus Super Fun Material
    /**
     * 1. Get the car's infor (make, model)
     * 2. A list of all the car id's that have a matching make and model
     * 3. Remove each of those cars in that list
     */

    //Step 1 
    const carToRemove = carsWishList.list.find((car) => {
        return car.id == carId;
    })
    const { make, model } = carToRemove;
    //Step 2 & 3
    carsWishList.list = carsWishList.list.filter((car, index, arr) => {
        return !(car.make == make && car.model == model);
    }); 


    //Updated the internal state variable
    carsWishList.remove(carId);
    //Keep our display in sync with the internal state
    updateDOMList();
    carMakeP.textContent = "";
    carModelP.textContent = "";
    carYearP.textContent = "";
    //Disable the remove button
    removeButton.disabled = true;
}
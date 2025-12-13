// script.js the functionality of the password manager

// DOM Document Object Model
// This code get the data from the html and brings it into Javascript

// Remember variables temporary store data. There are 3 types of variables const, let, and var. 
// Const is a constant variable, let is a variable that can be changed, and var is a also variable that can be changed.

//Input Fields
const username = document.getElementById('username');
const website = document.getElementById('website');
const password = document.getElementById('password');

// Form
const form = document.querySelector('form');

//Buttons
const unlockBtn = document.getElementById('unlock-btn')
const lockBtn = document.getElementById('lock-btn')

//Response
const response = document.getElementById("response")

const master = document.getElementById('master')

// Master Password
const masterPassword = "123"




// Storage

function storeData(data) {

    const stored = getData() || []; // Get the Stored Data from localstorage or return an empty array
    stored.push(data) // adds the new password to the array
    window.localStorage.setItem("passwords", JSON.stringify(stored)); //Stores the new data
    console.log("Saved") // Debug message
}

function getData() {
    return JSON.parse(window.localStorage.getItem("passwords")); //Gets The Data from localstorage
}

// Encryption and Decryption
function enc(text) {
    return window.btoa(text);//Base64 encoding
}

function dec(text) {
    return window.atob(text);//Base64 decoding
}

// Event Listeners
form.addEventListener("submit", function (e) { // Listens for the form to submit
    e.preventDefault(); // Prevents default Action

    const data = { //saves the data as a JS object
        website: website.value,
        username: username.value,
        password: enc(password.value),
    }

    storeData(data); // Stores the data

})

unlockBtn.addEventListener('click', function () { // Listens for when the unlock button is pressed

    if (masterPassword === master.value) { // Checks if the master password is correct

        const data = getData() || []; // Gets the data from localstorage or creates an empty array if there is no data

        response.innerHTML = "" // Clears the response area

        data.forEach(function (data) { // Iterates through each data item

            response.innerHTML += `Website: ${data.website}<br>Username: ${data.username}<br>Password: ${dec(data.password)}<br/>` // Displays the data in a formatted way
        })
    } else { // If the master password is incorrect, displays an error message

        response.innerHTML = "Incorrect Password"
    }
})
lockBtn.addEventListener('click', function () { // Listens for when the lock button is pressed
    
    response.innerHTML = ""; // Clears the response area
})





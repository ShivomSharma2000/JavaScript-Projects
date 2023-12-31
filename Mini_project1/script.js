const inputSlider = document.querySelector("[sliderIcon]");
const inputSliderLength = document.querySelector("[passwordLength]");

const generatorPasswordShows = document.querySelector("[generatorPasswordShows]");
const msg_copy_text = document.querySelector("[copied_msg]");
const passCopy = document.querySelector("[passwordCopied]");
const upperCase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const light = document.querySelector("[strength-light]");
const generatorButton = document.querySelector(".generatorPassword");
const allCheckBox = document.querySelectorAll("input[type=CheckBox]");


let password = "";
let passwordLength = 10;
let countBoxes = 0;
setPassLength();


//1. let by default will set password slider length and text of length i.e 10
function setPassLength(){
    inputSlider.value = passwordLength;
    inputSliderLength.innerText = passwordLength;

    //apply nhi hua niche wala code,don't know why
    const minValue = inputSlider.min;
    const maxValue = inputSlider.max;
    inputSlider.style.backgroundSize =((passwordLength - minValue)*100/(maxValue-minValue)) +"% 100%";
}

// 2.Change the length of input slider
inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    setPassLength();
})



//3.
//  (a) random integer generator
function randomIntGenerator(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

// (b) random lower case char generator(using 'String.fromCharCode()' for convert int to char)
function lowerCaseGenerator(){
    return String.fromCharCode(randomIntGenerator(97,123));
}

// (c) random upper case char generator(using 'String.fromCharCode()' for convert int to char)
function upperCaseGenerator(){
    return String.fromCharCode(randomIntGenerator(65,91));
}

// (d) random number generator
function numbersGenerator(){
    return randomIntGenerator(0,9);
}

const symbol = '~`?.<;}{][)(/,@$%^&*@!';
// (e) random symbol generator(firstly,generating random integer and then get value of given random index)
function symbolsGenerator(){
    let randChar = randomIntGenerator(0,symbol.length);
    return symbol.charAt(randChar);
}






//set default color for strength
strengthLight("#ccc")

//4. strength light color which one shown
function strengthLight(color){
    light.style.backgroundColor = color;
}
// calculate strength (or light view)
function calStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(upperCase.checked) hasUpper = true;
    if(lowercase.checked) hasLower = true;
    if(numbers.checked) hasNum = true;
    if(symbols.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        strengthLight("#0f0");
    }
    else{
        strengthLight("#f00");
    }
}
 



// 5. copy password
async function copyMsg(){
    try{
    await navigator.clipboard.writeText(generatorPasswordShows.value)
    msg_copy_text.innerText = "Copied";
    }
    catch(e){
        msg_copy_text.innerText = "Failed";
    }

    //active class make in css file and then given text will be shown
    msg_copy_text.classList.add("active");

    //after 2second given will be removed
    setTimeout(()=>{
        msg_copy_text.classList.remove("active");
    },500)
}

// 6. copied eventListener
passCopy.addEventListener('click',()=>{
    if(generatorPasswordShows.value){
        copyMsg();
    }
})





//7. step:2 Count all checkboxes
function countAllCheckBoxes(){
    countBoxes = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            countBoxes++; 
        }
    })

    if(passwordLength < countBoxes){
        passwordLength = countBoxes;
        setPassLength();
    }
}

//8. step:1 add eventlistener in all checkboxes 
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',countAllCheckBoxes)
})



//Shuffling password
function shufflePassword(password){

    for(let i=password.length-1;i>0;i--){
        let p = Math.floor(Math.random() * (i+1));
        let temp = password[i];
        password[i] = password[p];
        password[p] = temp;
    }

    let str = "";
    password.forEach((e)=>{
        str += e;
    })
    return str;

}

// 9. generator Password button
generatorButton.addEventListener('click',()=>{
    //if none checkbox are checked
    if(countBoxes == 0) return;

    if(passwordLength < countBoxes) {
        passwordLength = countBoxes;
        setPassLength();
    }

    //let's see the journey to find password

    //firstly we should insurely that given checkboxes checked put in password,so firstly we will set password 0;
    password = "";

    // if(upperCase.checked){
    //     password += upperCaseGenerator();
    // }

    // if(lowercase.checked){
    //     password += lowerCaseGenerator();
    // }

    // if(numbers.checked){
    //     password += numbersGenerator();
    // }

    // if(symbols.checked){
    //     password += symbolsGenerator();
    // }


    // instead of using above if condition ,we will be using array,where firstly we are adding checked boxes values and then remaining
    let arr=[];

    if(upperCase.checked){
        arr.push(upperCaseGenerator);
    }

    if(lowercase.checked){
        arr.push(lowerCaseGenerator);
    }

    if(numbers.checked){
        arr.push(numbersGenerator);
    }

    if(symbols.checked){
        arr.push(symbolsGenerator);
    }

    //compulsory adding which one are checked
    for(let i=0;i<arr.length;i++){
        password += arr[i]();
    }
   

    //Add random remaining password as much their length
    for(let i=0;i<passwordLength - arr.length;i++){
        let randIndex = randomIntGenerator(0,arr.length);
        password += arr[randIndex] ();
    } 

    password = shufflePassword(Array.from(password));      //convert password into array form
    generatorPasswordShows.value = password;
    calStrength(); 


})



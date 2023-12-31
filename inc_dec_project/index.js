let content = document.querySelector('#value');

let decrement = () => {
   let value = parseInt(content.innerText);
   value = value-1;
   content.innerText = value;
}


let increment = () => {
    let value = parseInt(content.innerText);
    value = value+1;
    content.innerText = value; 
 }
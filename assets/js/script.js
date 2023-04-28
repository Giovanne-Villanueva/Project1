var modalResponse = document.querySelector(".error")









function errorHandeler(event){
    
    var element = event.target;
    console.log(element)
    if(element.matches("button")){
        modalResponse.classList.add('inivisible');
    }
}


modalResponse.addEventListener("click", errorHandeler)
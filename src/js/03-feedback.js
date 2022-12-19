const throttle = require("lodash.throttle");

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('.feedback-form input'),
}

refs.form.addEventListener('submit', onFormSubmit)
refs.form.addEventListener('input', throttle(onTextareaOrInputDataEntry, 500))

const data = {
    message: '',
    email: '',
};

dataOutputAfterReboot();
checkOfEnteredData();

function onFormSubmit (e){
    e.preventDefault()

    let formData = new FormData(e.target)
    formData.forEach((value, name) => {
        data[name] = value
    })
    console.log(data)

    e.target.reset()
    localStorage.removeItem("feedback-form-state")

}

function onTextareaOrInputDataEntry (e){
    const value = e.target.value
    const name = e.target.name
    data[name] = value;
    recordsData(data)
}

function recordsData(data){
    localStorage.setItem("feedback-form-state", JSON.stringify(data))
}

function checkOfEnteredData(){
if (refs.textarea.value){
    data.message = refs.textarea.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(data))
}
if (refs.input.value){
    data.email = refs.input.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(data))
}
}

function dataOutputAfterReboot(){
    const saveData = JSON.parse(localStorage.getItem("feedback-form-state"));
    if(saveData) {
            refs.textarea.value = saveData.message;
            refs.input.value = saveData.email;
            return saveData
    } 
}


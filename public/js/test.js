console.log("From JS file")
const weatherForm = document.querySelector('form');
const searchAdd = document.querySelector('input');
const para1 = document.querySelector('#message1');
const para2 = document.querySelector('#message2');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchAdd.value;
    para1.textContent = "Loading...";
    para2.textContent = "";
    fetch("http://localhost:3000/weather?address="+ location).then((response) => {
    response.json().then((data) => {
        console.log("^^^^ ", data)
        if (data.err) {
            console.log("****** ", data.err);
            para1.textContent = data.err;
        } else {
            console.log(data);
            para2.textContent = data.location;
            para1.textContent = data.forecast.temparature;

        }
    });
});
})
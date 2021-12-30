
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
}); 

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg_one');
const msg2 = document.querySelector('#msg_two');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
   
    msg1.textContent = 'Loading......';

    fetch('/weather?address='+location).then((res) => {
    res.json().then((data) => {
        if(data.error){
            msg2.textContent = data.error;
            msg1.textContent = '';
        }else{
            msg1.textContent = data.data;
            msg2.textContent = '';
        }
    })
});
});
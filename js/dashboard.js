let hello = document.querySelector('h1');
let btn = document.querySelector('button');

let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (loggedInUser) {
    hello.innerHTML = `Welcome ${loggedInUser.name}`; 
} else {
    window.location.href = 'index.html';
}

btn.addEventListener('click', function(e){
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
});
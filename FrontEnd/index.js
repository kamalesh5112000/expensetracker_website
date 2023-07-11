var form = document.getElementById('signupForm');
var nam = document.getElementById('name');
var email=document.getElementById('email');
var password=document.getElementById('password');

form.addEventListener('submit',submitForm);

async function submitForm(e){
    e.preventDefault();

    
    
    var myobj={
        name : nam.value,
        email: email.value,
        password:password.value
    }
    console.log(myobj)
    const res = await axios.post('http://localhost:3000/',myobj)
    
    
    

    
    

}
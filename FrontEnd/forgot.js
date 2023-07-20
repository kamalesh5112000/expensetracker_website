var forgotform = document.getElementById('forgotForm');
var email=document.getElementById('email');

forgotform.addEventListener('submit',submitForm);

async function submitForm(e){
    e.preventDefault();
    console.log(email.value)
    const res = await axios.post('http://localhost:5000/password/forgotpassword',{email:email.value})
}
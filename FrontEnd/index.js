var form = document.getElementById('signupForm');
var loginform = document.getElementById('loginForm');

var nam = document.getElementById('name');
var email=document.getElementById('email');
var password=document.getElementById('password');
var emailcheck=document.getElementById('emailcheck');

form.addEventListener('submit',submitForm);

async function submitForm(e){
    e.preventDefault();
    let flag=false;
    var myobj={
        name : nam.value,
        email: email.value,
        password:password.value
    }
    console.log(myobj)
    const res = await axios.get('http://localhost:5000/')
    console.log(res)
    if (res.data.length==0){
        const res = await axios.post('http://localhost:5000/',myobj)
    }else{
        for(var i=0;i<res.data.length;i++){
            if(res.data[i].email==email.value){
                console.log("Email Already Exits")
                flag=true
            }
        }
    }
    if(flag==false){
        const res = await axios.post('http://localhost:5000/',myobj)

    }else{
        emailcheck.innerHTML="Email Already Exits"
    }

    //const res = await axios.post('http://localhost:5000/',myobj)

}

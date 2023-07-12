var loginform = document.getElementById('loginForm');

var email=document.getElementById('email');
var password=document.getElementById('password');
var emailcheck=document.getElementById('emailcheck');
var passwordcheck=document.getElementById('passwordcheck');

loginform.addEventListener('submit',submitForm);

async function submitForm(e){
    e.preventDefault();
    let flag=false;
    emailcheck.innerHTML="";
    passwordcheck.innerHTML="";
    // var myobj={
    //     name : nam.value,
    //     email: email.value,
    //     password:password.value
    // }
    // console.log(myobj)
    const res = await axios.get('http://localhost:5000/')
    console.log(res)
    if (res.data.length==0){
        emailcheck.innerHTML="No Such Email Exits"
    }else{
        for(var i=0;i<res.data.length;i++){
            if(res.data[i].email==email.value){
                flag=true
                if(res.data[i].password==password.value){
                    alert("Successfully Logged In");
                    break;
                }else{
                    passwordcheck.innerHTML="Password is Incorrect"
                }
            }
        }
    }
    if(flag==false){
        emailcheck.innerHTML="No Such Email Exits"
    }else{
        emailcheck.innerHTML=""
    }

    //const res = await axios.post('http://localhost:5000/',myobj)

}
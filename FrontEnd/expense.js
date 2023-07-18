var form = document.getElementById('addForm');
var newitem = document.getElementById('items');
var amount=document.getElementById('amount');
var desc=document.getElementById('desc');
var cat=document.getElementById('categories');
var iid=0;
var expense=[]
var premiumbtn= document.getElementById('premiumbtn');
var premiumtxt=document.getElementById('premiumtxt');
var leaderbtn=document.getElementById('leaderboard');
var leaderitems=document.getElementById('leaderitems');


premiumbtn.addEventListener('click',buyPremium);

async function buyPremium(e){
    const token = localStorage.getItem('token');
    const res=await axios.get('http://localhost:5000/purchase/premium',{headers:{"Authorization":token}});
    console.log(res)
    var options={
        "key":res.data.key_id,
        "order_id":res.data.order.id,
        "handler":async function(response){
            await axios.post('http://localhost:5000/purchase/updatetransaction',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id
            },{headers:{"Authorization":token}})

            alert('You are Premium User Now')
        }
    };
    const rzpl = new Razorpay(options);
    rzpl.open();
    e.preventDefault();
    rzpl.on('payment.failed',function(response){
        console.log(response)
        alert('something went worng')
    })

};

form.addEventListener('submit',submitForm);


newitem.addEventListener('click',delitem)
async function submitForm(e){
    e.preventDefault();

    
    
    var myobj={
        amount : amount.value,
        description: desc.value,
        catecgory:cat.value
    }
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:5000/expense',myobj,{headers:{"Authorization":token}});
    //const res = await axios.post('http://localhost:5000/expense',myobj)
    newitem.innerHTML='';
    display();
    
    

    
    

}
async function display(){
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/expense',{headers:{"Authorization":token}});
    console.log(res.data)
    if(res.data.userdata){
        premiumbtn.style.display="none";
        premiumtxt.innerText="You are a Premium User Now"
        
    }else{
        leaderbtn.disabled = true;

    }
    if(res.data.data.length<=0){
        console.log("No data Present")
        newitem.innerHTML='No data Present';
    }else{
        
        for(var i=0;i<res.data.data.length;i++){
            showData(res.data.data[i])
            console.log("data",i,res.data.data[i])
            
        }

    }

}
display();

function showData(obj){
    iid=obj.id
    var li=document.createElement('li');
    li.className='list-group-item';
    li.appendChild(document.createTextNode("Amount: "));
    li.appendChild(document.createTextNode(obj.amount));
    li.appendChild(document.createTextNode(" - Descrption :"));
    li.appendChild(document.createTextNode(obj.description));
    li.appendChild(document.createTextNode(" - Catecgory :"));
    li.appendChild(document.createTextNode(obj.catecgory));
    var id=document.createElement('input')
    id.setAttribute("type", "hidden");
    id.appendChild(document.createTextNode(iid))
    //delete Btn
    var del=document.createElement('button');
    del.className='btn btn-danger btn-sm float-right delete';
    del.appendChild(document.createTextNode('X'));

    //Edit btn
    var edt=document.createElement('button');
    edt.className='btn btn-warning btn-sm float-right edit';
    edt.appendChild(document.createTextNode('Edit'))

    
    li.appendChild(edt)
    li.appendChild(id)
    li.appendChild(del)
    newitem.appendChild(li);
    // leaderboarditems.appendChild(li)
    
    
    amount.value=""
    desc.value=""
    cat.value=""
}

leaderbtn.addEventListener('click',showleaderboard);

async function showleaderboard(e){
    //if(!document.getElementById('leaderboarditems')){
        var ulleader=document.createElement('ul');
        ulleader.id="leaderboarditems";
        ulleader.className="list-group-item"
        leaderitems.appendChild(ulleader)
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/showLeaderBoard',{headers:{"Authorization":token}});
        console.log(res)
        // for(var i=0;i<res.data.leaderboard.length;i++){
        //     displayleader(res.data.leaderboard[i],res.data.userId)
        //     //console.log("data",i,res.data.leaderboard[i])
            
        // }
        //console.log("leader Board",res)
    //}

    

    
    
    

}
function displayleader(obj,userId){
    var leaderboarditems=document.getElementById('leaderboarditems');
    iid=obj.id
    var li=document.createElement('ul');
    if(obj.id===userId){
        li.className='list-group-item active';

    }else{
        li.className='list-group-item ';
    }
    
    li.appendChild(document.createTextNode("Name: "));
    li.appendChild(document.createTextNode(obj.name));
    li.appendChild(document.createTextNode(" - Total Amount :"));
    li.appendChild(document.createTextNode(obj.totale));

    
    leaderboarditems.appendChild(li)
    


}

function delitem(e){
    var li=e.target.parentElement;
    var itemaount=li.childNodes[1].textContent;
    var itemdes=li.childNodes[3].textContent;
    var itemcat=li.childNodes[5].textContent;
    iid=li.childNodes[7].textContent;
    
    if(e.target.classList.contains('delete')){
        if(confirm("Are you Sure, You want to Delete it?")){
            
            newitem.removeChild(li)
            console.log(itemaount,itemcat,itemdes,iid)
            const token = localStorage.getItem('token');
            axios.delete(`http://localhost:5000/expense/${iid}`,{headers:{"Authorization":token}})
            .then(()=>{
                newitem.innerHTML='';
                display();
            }).catch(err=>console.log(err))

            
        }
    }
    if(e.target.classList.contains('edit')){
        if(confirm("Are you Sure, You want to Edit it?")){
            var li=e.target.parentElement;
            var edititem=li.childNodes[3].textContent;
            amount.value=li.childNodes[1].textContent;
            desc.value=li.childNodes[3].textContent;
            cat.value=li.childNodes[5].textContent;
            newitem.removeChild(li)
            localStorage.removeItem(edititem)
            
        }
    }
}

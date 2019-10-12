function check(){
    document.getElementById("submitButton").disabled = true;
    
    email=document.getElementById('name').value;
    password=document.getElementById('pass').value;
    const xhttp=new XMLHttpRequest();
    xhttp.open('POST',"http://localhost:3000/users/login",true)
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify({
        "email":email,"password":password

}));
    
    
        xhttp.onreadystatechange=(e)=>{
            
            if (xhttp.readyState == 4 && xhttp.status == 200){
            if(xhttp.responseText=='Invalid password or username'){
                document.getElementById("submitButton").disabled = false;
                console.log("Wrong username or password")

            }
            else{alert(xhttp.responseText)
                
                
                const result=JSON.parse(xhttp.responseText)
                const token=result.token;
                console.log(token);
                sessionStorage.setItem('token',token);
                return gotoHome(token);
            }}
        }


}
function gotoHome(token)
{

    window.location.href="/homepage"
        
    }

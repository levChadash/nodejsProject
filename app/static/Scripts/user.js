
function newUser() {
 document.getElementById("divNewU").style.display="block";
}
function register() {
    let user = {
        firstName: document.getElementById("fName").value,
        lastName: document.getElementById("lName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("psw").value
    }
    

    let x = fetch("api/user/",
        {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then((data) => {
            alert("Hi to  " + user.firstName + " new !!!!")
        })
        .catch(error => alert(error));
}
function logIn() {
    debugger;
     let email= document.getElementById("em").value
     let password= document.getElementById("ps").value
    
    let x = fetch("api/user/" + email + "/" + password)
        .then(response => response.json())
        .then((data) => {
            sessionStorage.setItem('user', JSON.stringify(data));
            window.location.href = "enterUser.html";//h
        })
        .catch(error => alert("catch"));
}
   

    
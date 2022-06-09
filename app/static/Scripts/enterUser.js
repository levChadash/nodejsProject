let email=  JSON.parse(sessionStorage.getItem('user')).email
document.getElementById("email").value = email;
let password = JSON.parse(sessionStorage.getItem('user')).password
document.getElementById("psw").value = password;
let fName = JSON.parse(sessionStorage.getItem('user')).firstName
document.getElementById("fName").value = fName;
let lName = JSON.parse(sessionStorage.getItem('user')).lastName
document.getElementById("lName").value = lName;
function update(){
    let user = {
        id:JSON.parse(sessionStorage.getItem('user'))._id,
        firstName: document.getElementById("fName").value,
        lastName: document.getElementById("lName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("psw").value
    }
    let x = fetch("api/user/"+user.id,
        {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (response.ok)
            window.location.href = "Products.html";
              
            else
                throw new Error(response.status)
        })
        .catch(error => alert(error));

}
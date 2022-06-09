window.addEventListener('load', (event) => {
    
    getMyShoppingBag();

});
function getMyShoppingBag() {
    let sum=0;
    const shoppingBag = JSON.parse(sessionStorage.getItem('shoppingBag'));
    productTemp = document.getElementById("temp-row");
    shoppingBag.forEach(productObj => {
        drawProduct(productObj, productTemp);
        sum+=productObj.product.price * productObj.quantity;
    });
    document.getElementById("totalAmount").innerHTML=sum;
    document.getElementById("itemCount").innerHTML=JSON.parse(sessionStorage.getItem('prodQuantity'));

}
function drawProduct(productObj, productTemp) {
    let clonProduct = productTemp.content.cloneNode(true);
    clonProduct.querySelector(".itemName").innerHTML = productObj.product.name;
    clonProduct.querySelector(".itemNumber").innerHTML = productObj.quantity;
    clonProduct.querySelector(".image").style.backgroundImage = "url('./images/" + productObj["product"].image + ".JPG')";
    clonProduct.querySelector(".price").innerText = (productObj.product.price * productObj.quantity) + "$";
    clonProduct.getElementById("deleteProduct").addEventListener('click', ()=>deleteItem(productObj))

    document.getElementById("products").appendChild(clonProduct);
}

function deleteItem(productObj) {
    const shoppingBag = JSON.parse(sessionStorage.getItem('shoppingBag'));
    const pq=JSON.parse(sessionStorage.getItem('prodQuantity'));
    sessionStorage.setItem('prodQuantity',pq-1);
    shoppingBag.forEach(prod => {
        if (prod.product.name == productObj.product.name) {
            if (prod.quantity == 1) {
                const ind = shoppingBag.findIndex(prod => prod.product._id == productObj.product._id);
                shoppingBag.splice(ind, 1);
            }
            else
                prod.quantity--;
            sessionStorage.setItem('shoppingBag', JSON.stringify(shoppingBag));
            cleanProductsTemp();
            getMyShoppingBag();
        }
    });
    
}
function cleanProductsTemp() {
    document.getElementById("products").innerHTML = " ";
}
function placeOrder(){
    debugger;
    let order={
     user:JSON.parse(sessionStorage.getItem('user')),
     products:JSON.parse(sessionStorage.getItem('shocppingBag')),
     sum: document.getElementById('totalAmount').innerHTML,
     date:new Date()
    }
    let x = fetch("api/order/",
    {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(order)
    })
    .then(response => response.json())
    .then((data) => {
        alert("order  " + data._id + " wes  placed successfully !!!!")
    })
    .catch(error => alert("catch"));

}
async function TrackLinkID(){
    
    const id=JSON.parse(sessionStorage.getItem('user'))._id;
    let jsonuser=await fetch("api/user/" +id);
    user=await jsonuser.json();
    console.log(user);
    throw new Error("nice try");

}

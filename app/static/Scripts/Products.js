var categories;

window.addEventListener('load', (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.has('fromShoppingBag')){
        document.getElementById("ItemsCountText").innerHTML =JSON.parse(sessionStorage.getItem('prodQuantity'));   
    }
    getAllCategories();
    getAllProducts();
});
async function getAllCategories() {
    // var res=await fetch("api/category")
    // res=res.json();
    // drawCategory(res);
    fetch('api/category')
        .then(res => res.json())
        .then(res => drawCategory(res))
        .catch(err => alert(err))
}
async function getAllProducts() {
    // const res= await fetch("api/product");
    // res= res.json();
    // drawProduct(res);
    fetch('api/product')
        .then(res => res.json())
        .then(res => drawProducts(res))
        .catch(err => alert(err))
}

function drawProducts(products) {
    cleanProductsTemp();
    temp = document.getElementById("temp-card");

    products.forEach(product => {
        var clonProducts = temp.content.cloneNode(true);

        clonProducts.querySelector("img").src = "./images/" + product.image + ".JPG";
        clonProducts.querySelector("h1").innerText = product.name;
        clonProducts.querySelector(".price").innerText = product.price + "$";
        clonProducts.querySelector(".description").innerText = product.description;
        clonProducts.querySelector("button").addEventListener("click", () => {

            addToCart(product);
        });

        document.getElementById("PoductList").appendChild(clonProducts);
    })


}
function drawCategory(categories) {
    let categories2 = []

    const templateCategory = document.getElementById('temp-category');
    categories.forEach(category => {
        var cloneCategory = templateCategory.content.cloneNode(true);
        cloneCategory.getElementById("OptionName").textContent = category.name;
        filterProducts(cloneCategory, category, categories2);
        document.getElementById("filters").appendChild(cloneCategory);
    });

}
function getProductsByCategoryId(categories) {
    let url = 'api/product/category?'
    categories.forEach(cat =>
        url += 'category=' + cat + '&'
    )
    url.substring(0, url.length - 1);
    fetch(url)
        .then(res => res.json())
        .then(res => drawProducts(res))
        .catch(err => alert(err))
}
function cleanProductsTemp() {
    document.getElementById("PoductList").innerHTML = " ";
}
function filterProducts(cloneCategory, category, categories) {

    const chebox = cloneCategory.getElementById("categoryCheckbox")
    chebox.addEventListener('change', () => {
        if (chebox.checked) {
            categories.push(category._id)
            getProductsByCategoryId(categories);
        }
        else {
            const ind=categories.findIndex(id=>id==category._id);
            categories.splice(ind,1);
            if (categories.length == 0)
                getAllProducts();
            else
                getProductsByCategoryId(categories);
        }
        });
}
function addToCart(product) {
    let found = false;
    if (document.getElementById("ItemsCountText").innerHTML == 0) {
        const shoppingBag = JSON.stringify([{ 'product': product, 'quantity': 1 }]);
        sessionStorage.setItem('shoppingBag', shoppingBag);
        sessionStorage.setItem('prodQuantity',1);
        document.getElementById("ItemsCountText").innerHTML = Number(document.getElementById("ItemsCountText").innerHTML) + 1;
    }
    else {
        const shoppingBag = JSON.parse(sessionStorage.getItem('shoppingBag'));
        const pq=JSON.parse(sessionStorage.getItem('prodQuantity'));
        sessionStorage.setItem('prodQuantity',pq+1);
        shoppingBag.forEach(prod => {
            if (prod.product.name == product.name) {
                prod.quantity++;
                sessionStorage.setItem('shoppingBag', JSON.stringify(shoppingBag));
                document.getElementById("ItemsCountText").innerHTML = Number(document.getElementById("ItemsCountText").innerHTML) + 1;
                found = true;
            }
        });
        if (found == false) {
            shoppingBag.push({ 'product': product, 'quantity': 1 });
            sessionStorage.setItem('shoppingBag', JSON.stringify(shoppingBag));
            document.getElementById("ItemsCountText").innerHTML = Number(document.getElementById("ItemsCountText").innerHTML) + 1;
        }
    }

}
async function TrackLinkID(){
    const id=JSON.parse(sessionStorage.getItem('user'))._id;
    let jsonuser=await fetch("api/user/" +id);
    user=await jsonuser.json();
    console.log(user);
    
}
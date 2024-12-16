
const productsCart = document.getElementById("products-cart");
const btnBackMenu = document.getElementById("btn-back-menu");

const carritoCompras = async()=>{
    const response = await fetch("/api/carts", { method:"GET" });
    const data = await response.json();
    const products = data.payload || [];

    productsCart.innerHTML = "";

    if (products.length > 0) {
        products.forEach((item) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const productName = document.createElement("h4");
            productName.textContent = `Nombre: ${item.title}`;

            const productPrice = document.createElement("p");
            productPrice.textContent = `Precio: $ ${item.price}`;

            const productCategory = document.createElement("p");
            productCategory.textContent = `Categoria: ${item.category}`;

            card.appendChild(productName);
            card.appendChild(productPrice);
            card.appendChild(productCategory);

            productsCart.appendChild(card);
        });
    }
};

btnBackMenu.addEventListener("click", ()=>{
    window.location.href = "/";
});

carritoCompras();
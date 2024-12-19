
const productsCart = document.getElementById("products-cart");
const btnBackMenu = document.getElementById("btn-back-menu");

const carritoCompras = async()=>{
    const response = await fetch("/api/carts", { method:"GET" });
    const data = await response.json();
    const carts = data.payload || [];

    productsCart.innerHTML = "";

    if (carts.length > 0) {
        carts.forEach((cart) => {
            cart.products.forEach((item) => {
                const card = document.createElement("div");
                card.classList.add("card");
                console.log(item);

                const productName = document.createElement("h4");
                productName.textContent = `id: ${item.product}`;

                const productQuantity = document.createElement("p");
                productQuantity.textContent = `Cantidad: $ ${item.quantity}`;

                card.appendChild(productName);
                card.appendChild(productQuantity);

                productsCart.appendChild(card);
            });
        });
    }
};

btnBackMenu.addEventListener("click", ()=>{
    window.location.href = "/";
});

carritoCompras();
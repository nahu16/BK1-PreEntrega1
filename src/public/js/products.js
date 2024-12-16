
const btnRefreshProductsList = document.getElementById("btn-refresh-products-list");
const btnCartProducts = document.getElementById("btn-cart-products");
const btnNewProduct = document.getElementById("btn-new-product");
const productsContainer = document.getElementById("products-list");

const loadProductsList = async()=>{
    const response = await fetch("/api/products", { method:"GET" });
    const data = await response.json();
    const products = data.payload || [];

    productsContainer.innerHTML = "";

    products.forEach((prod) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const productId = document.createElement("p");
        productId.textContent = `Id: ${prod._id}`;

        const productName = document.createElement("h4");
        productName.textContent = `Nombre: ${prod.title}`;

        const productPrice = document.createElement("p");
        productPrice.textContent = `Precio: $ ${prod.price}`;

        const agregarAlCarrito = document.createElement("button");
        agregarAlCarrito.innerHTML = "Agregar al carrito";
        agregarAlCarrito.addEventListener("click", async ()=>{
            const buy = {
                title: prod.title,
                price: prod.price,
                category: prod.category,
                id: prod._id,
            };
            const response = await fetch("/api/carts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ buy }),
            });
            if (response){
                alert("se agrego al carrito");
            }

        });

        const descripcionId = document.createElement("button");
        descripcionId.innerHTML = "Ver más...";
        descripcionId.addEventListener("click", ()=>{
            window.location.href =`/descripcionId/${prod._id}`;
        });

        card.appendChild(productId);
        card.appendChild(productName);
        card.appendChild(productPrice);
        card.appendChild(agregarAlCarrito);
        card.appendChild(descripcionId);
        productsContainer.appendChild(card);
    });
};

btnRefreshProductsList.addEventListener("click", ()=>{
    loadProductsList();
    console.log("Lista recargada");
});

btnNewProduct.addEventListener("click", ()=>{
    window.location.href = "/realTimeProducts";});

btnCartProducts.addEventListener("click", ()=>{
    window.location.href = "/cartProducts";
});

loadProductsList();
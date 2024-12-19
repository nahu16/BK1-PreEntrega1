
const btnRefreshProductsList = document.getElementById("btn-refresh-products-list");
const btnCartProducts = document.getElementById("btn-cart-products");
const btnNewProduct = document.getElementById("btn-new-product");
const productsContainer = document.getElementById("products-list");
const paginationContainer = document.getElementById("pagination");

let currentPage = 1;
let sortDirection = "asc";

const loadProductsList = async()=>{
    const response = await fetch(`/api/products?page=${currentPage}&sort=${sortDirection}`, { method:"GET" });
    const data = await response.json();
    const products = data.payload || [];
    const pagination = data.pagination || [];

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
                products: [{ product: prod._id, quantity: 1 }],
            };
            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ buy }),
            });

            if (response.ok) {
                alert("Producto agregado al carrito");
            } else {
                console.error("Error al agregar al carrito:", data.message);
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
    paginationContainer.innerHTML = "";
    const totalPages = pagination.totalPages || 1;

    for (let page = 1; page <= totalPages; page++) {
        const button = document.createElement("button");
        button.textContent = page;
        button.addEventListener("click", () => {
            currentPage = page;
            loadProductsList();
        });
        paginationContainer.appendChild(button);
    }
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

const sortAscButton = document.getElementById("sort-asc");
const sortDescButton = document.getElementById("sort-desc");

sortAscButton.addEventListener("click", () => {
    sortDirection = "asc";
    loadProductsList();
});

sortDescButton.addEventListener("click", () => {
    sortDirection = "desc";
    loadProductsList();
});

loadProductsList();
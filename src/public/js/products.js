const btnRefreshProductsList = document.getElementById("btn-refresh-products-list");
const productsContainer = document.getElementById("products-list");

const loadProductsList = async()=>{
    const response = await fetch("/api/products", { method:"GET" });
    const data = await response.json();
    const products = data.payload || [];

    productsContainer.innerHTML = "";

    products.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const productId = document.createElement("p");
        productId.textContent = `Id: ${producto.id}`;

        const productName = document.createElement("h4");
        productName.textContent = `Nombre: ${producto.title}`;

        const productDescription = document.createElement("p");
        productDescription.textContent = `Descripción: ${producto.description}`;

        const productCode = document.createElement("p");
        productCode.textContent = `Codigo: ${producto.code}`;

        const productPrice = document.createElement("p");
        productPrice.textContent = `Precio: $ ${producto.price}`;

        const productStatus = document.createElement("p");
        productStatus.textContent = `Estado: ${producto.status}`;

        const productStock = document.createElement("p");
        productStock.textContent = `Stock: ${producto.stock}`;

        const productCategory = document.createElement("p");
        productCategory.textContent = `Categoria: ${producto.category}`;

        card.appendChild(productId);
        card.appendChild(productName);
        card.appendChild(productDescription);
        card.appendChild(productCode);
        card.appendChild(productPrice);
        card.appendChild(productStatus);
        card.appendChild(productStock);
        card.appendChild(productCategory);

        productsContainer.appendChild(card);
    });
};

btnRefreshProductsList.addEventListener("click", ()=>{
    loadProductsList();
    console.log("Lista recargada");
});
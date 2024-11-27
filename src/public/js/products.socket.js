const socket = io();

const productsContainer = document.getElementById("products-list");
const productForm = document.getElementById("product-form");
const errorMessage = document.getElementById("error-message");
const inputProductId = document.getElementById("input-product-id");
const btnDeletedProduct = document.getElementById("btn-deleted-product");

socket.on("products-list", (data) => {
    const products = data.products || [];
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
});

productForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const form = event.target;
    const formdata = new FormData(form);

    errorMessage.innerHTML = "";
    form.reset();

    socket.emit("insert-product", {
        title: formdata.get("title"),
        status: formdata.get("status") || "off",
        description: formdata.get("description"),
        code: formdata.get("code"),
        price: formdata.get("price"),
        stock: formdata.get("stock"),
        category: formdata.get("category"),
    });
});

btnDeletedProduct.addEventListener("click", ()=>{
    const id = inputProductId.value;
    inputProductId.innerHTML="";
    errorMessage.innerHTML = "";

    if (id > 0){
        socket.emit("delete-product", { id });
    }

});

socket.on("error-message", (data) => {
    errorMessage.innerHTML = data.message;
});
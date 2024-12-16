
const descriptionContainer = document.getElementById("description-list");
const btnBackMenu = document.getElementById("btn-back-menu");

const loadDescriptionId = async()=>{
    const urlParts = window.location.pathname.split("/");
    const productId = urlParts[urlParts.length -1];

    const response = await fetch(`/api/products/${productId}`, { method:"GET" });
    const data = await response.json();
    const products = data.payload || [];

    descriptionContainer.innerHTML = "";

    if (products) {
        const card = document.createElement("div");
        card.classList.add("card");

        const productName = document.createElement("h4");
        productName.textContent = `Nombre: ${products.title}`;

        const productDescription = document.createElement("p");
        productDescription.textContent = `Descripción: ${products.description}`;

        const productCode = document.createElement("p");
        productCode.textContent = `Codigo: ${products.code}`;

        const productPrice = document.createElement("p");
        productPrice.textContent = `Precio: $ ${products.price}`;

        const productStock = document.createElement("p");
        productStock.textContent = `Stock: ${products.stock}`;

        const productCategory = document.createElement("p");
        productCategory.textContent = `Categoria: ${products.category}`;

        card.appendChild(productName);
        card.appendChild(productDescription);
        card.appendChild(productCode);
        card.appendChild(productPrice);
        card.appendChild(productStock);
        card.appendChild(productCategory);

        descriptionContainer.appendChild(card);
    }
};

btnBackMenu.addEventListener("click", ()=>{
    window.location.href = "/";
});

loadDescriptionId();
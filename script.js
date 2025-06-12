document.querySelectorAll(".btn-comprar").forEach(button => {
  button.addEventListener("click", () => {
    button.style.backgroundColor = "#00cc66";
    button.innerText = "¡Comprado!";
    setTimeout(() => {
      button.innerText = "Comprar";
      button.style.backgroundColor = "#007bff";
    }, 1500);
});
});
const carritoIcono = document.getElementById("carrito-icono");
const carritoPanel = document.getElementById("carrito-panel");
const cerrarCarrito = document.getElementById("cerrar-carrito");
const listaCarrito = document.getElementById("carrito-lista");
const carritoTotal = document.getElementById("carrito-total");

let total = 0;

function actualizarTotal() {
  carritoTotal.textContent = `Total: $${total.toLocaleString()}`;
}

function crearItemCarrito(nombre, talle, precioTexto) {
  const precio = parseInt(precioTexto.replace(/\D/g, ''));
  total += precio;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${nombre} - Talle: ${talle} - Precio: $${precio.toLocaleString()}</span>
    <button class="eliminar-item">X</button>
  `;

  li.querySelector(".eliminar-item").addEventListener("click", () => {
    total -= precio;
    li.remove();
    actualizarTotal();
  });

  listaCarrito.appendChild(li);
  actualizarTotal();
}

document.querySelectorAll(".btn-comprar").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    const nombre = card.querySelector("h3").textContent;
    const talle = card.querySelector("select").value;
    const precioTexto = card.querySelector("h2").textContent;

    if (talle === "") {
      alert("Por favor, seleccioná un talle antes de comprar.");
      return;
    }

    crearItemCarrito(nombre, talle, precioTexto);

    button.style.backgroundColor = "#00cc66";
    button.innerText = "¡Comprado!";
    setTimeout(() => {
      button.innerText = "Comprar";
      button.style.backgroundColor = "#007bff";
    }, 1500);
  });
});

carritoIcono.addEventListener("click", () => {
  carritoPanel.classList.toggle("abierto");
});

cerrarCarrito.addEventListener("click", () => {
  carritoPanel.classList.remove("abierto");
});

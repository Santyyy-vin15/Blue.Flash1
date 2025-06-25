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
  // Microinteracción: mostrar mensaje flotante cuando se agrega un producto
const noti = document.createElement("div");
noti.className = "mensaje-flotante";
noti.textContent = `${nombre} agregado al carrito ✅`;
document.body.appendChild(noti);

setTimeout(() => {
  noti.remove();
}, 2500);

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

document.getElementById("whatsapp-comprar").addEventListener("click", () => {
  const nombreCliente = document.getElementById("cliente-nombre").value.trim();
  const items = document.querySelectorAll("#carrito-lista li");

  if (nombreCliente === "") {
    alert("Por favor, ingresá tu nombre y apellido.");
    return;
  }

  if (items.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  let mensaje = `Hola, soy ${nombreCliente} y quiero comprar:\n`;

  items.forEach(item => {
    mensaje += `• ${item.querySelector("span").textContent}\n`;
  });

  mensaje += `\nTotal: ${carritoTotal.textContent}`;

  const numeroWhatsApp = "5493496446680"; // Cambiar si querés
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  // Abrir WhatsApp
  window.open(url, "_blank");

  // Limpiar carrito después del envío
  document.getElementById("cliente-nombre").value = "";
  document.getElementById("carrito-lista").innerHTML = "";
  total = 0;
  actualizarTotal();
  carritoPanel.classList.remove("abierto");
});

// Carrusel automático de promos
let indice = 0;
const promos = document.querySelectorAll('.promo');

setInterval(() => {
  promos.forEach(p => p.classList.remove('activa'));
  indice = (indice + 1) % promos.length;
  promos[indice].classList.add('activa');
}, 4000);

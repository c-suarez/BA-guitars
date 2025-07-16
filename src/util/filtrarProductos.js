export function filtrarProductos(productos, { busqueda = "", filtroMarca = "", filtroStock = "", filtroTipo = "", orden = "" }) {
  let filtrados = [...(productos || [])];

  if (busqueda.trim() !== "") {
    const texto = busqueda.toLowerCase();
    filtrados = filtrados.filter(p =>
      p.marca.toLowerCase().includes(texto) ||
      p.nombre.toLowerCase().includes(texto) ||
      (p.clon && p.clon.toLowerCase().includes(texto))
    );
  }

  if (filtroMarca !== "") {
    filtrados = filtrados.filter(p => p.marca === filtroMarca);
  }

  if (filtroTipo !== "") {
    filtrados = filtrados.filter(p => p.tipo.toLowerCase() === filtroTipo.toLowerCase());
  }

  if (filtroStock === "conStock") {
    filtrados = filtrados.filter(p => Number(p.stock) > 0);
  }
  if (filtroStock === "sinStock") {
    filtrados = filtrados.filter(p => Number(p.stock) <= 0);
  }

  switch (orden) {
    case "precioAsc":
      filtrados.sort((a, b) => Number(a.precio) - Number(b.precio));
      break;
    case "precioDesc":
      filtrados.sort((a, b) => Number(b.precio) - Number(a.precio));
      break;
    case "stockAsc":
      filtrados.sort((a, b) => Number(a.stock) - Number(b.stock));
      break;
    case "stockDesc":
      filtrados.sort((a, b) => Number(b.stock) - Number(a.stock));
      break;
    case "alfabetoAZ":
      filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
      break;
    case "alfabetoZA":
      filtrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
      break;
    // podés agregar más casos si querés
  }

  return filtrados;
}

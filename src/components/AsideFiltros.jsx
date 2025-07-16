import { Accordion } from "react-bootstrap";
const AsideFiltros = ({
  marcas,
  busqueda,
  setBusqueda,
  filtroMarca,
  setFiltroMarca,
  filtroStock,
  setFiltroStock,
  orden,
  setOrden,
  tipos = [], 
  filtroTipo, 
  setFiltroTipo, 
}) => (
  <aside className="p-3 border-end d-flex flex-column" style={{ width: "320px", gap: "1rem", minWidth: "260px", maxWidth: "320px"}}>
    <h4 className="mb-3"> Filtros</h4>

    <div>
      <label htmlFor="buscar" className="form-label">
        Buscar por marca o modelo
      </label>
      <input
        type="text"
        className="form-control"
        id="buscar"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Ej: Gibson..."
      />
    </div>

    {tipos && filtroTipo !== undefined && setFiltroTipo && (
  <Accordion>
    <Accordion.Item eventKey="tipo">
      <Accordion.Header>Filtrar por Tipo</Accordion.Header>
      <Accordion.Body>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="filtroTipo"
            id="tipoTodos"
            value=""
            checked={filtroTipo === ""}
            onChange={(e) => setFiltroTipo(e.target.value)}
          />
          <label htmlFor="tipoTodos" className="form-check-label">
            Todos
          </label>
        </div>
        {tipos.map((tipo, idx) => (
          <div className="form-check" key={idx}>
            <input
              type="radio"
              className="form-check-input"
              name="filtroTipo"
              id={`tipo-${idx}`}
              value={tipo}
              checked={filtroTipo === tipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            />
            <label htmlFor={`tipo-${idx}`} className="form-check-label">
              {tipo}
            </label>
          </div>
        ))}
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
)}

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Filtrar por Marca</Accordion.Header>
        <Accordion.Body>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="filtroMarca"
              id="todas"
              value=""
              checked={filtroMarca === ""}
              onChange={(e) => setFiltroMarca(e.target.value)}
            />
            <label htmlFor="todas" className="form-check-label">
              Todas
            </label>
          </div>
          {marcas.map((marca, idx) => (
            <div className="form-check" key={idx}>
              <input
                type="radio"
                className="form-check-input"
                name="filtroMarca"
                id={`marca-${idx}`}
                value={marca}
                checked={filtroMarca === marca}
                onChange={(e) => setFiltroMarca(e.target.value)}
              />
              <label htmlFor={`marca-${idx}`} className="form-check-label">
                {marca}
              </label>
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>Ordenar por</Accordion.Header>
        <Accordion.Body>
          {["alfabetoAZ", "alfabetoZA", "precioAsc", "precioDesc"].map(
            (value, idx) => (
              <div className="form-check" key={idx}>
                <input
                  type="radio"
                  className="form-check-input"
                  name="orden"
                  id={`orden-${value}`}
                  value={value}
                  checked={orden === value}
                  onChange={(e) => setOrden(e.target.value)}
                />
                <label htmlFor={`orden-${value}`} className="form-check-label">
                  {value === "alfabetoAZ"
                    ? "A-Z"
                    : value === "alfabetoZA"
                    ? "Z-A"
                    : value === "precioAsc"
                    ? "Precio Menor a Mayor"
                    : "Precio Mayor a Menor"}
                </label>
              </div>
            )
          )}
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Stock</Accordion.Header>
        <Accordion.Body>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="filtroStock"
              id="stockTodos"
              value=""
              checked={filtroStock === ""}
              onChange={(e) => setFiltroStock(e.target.value)}
            />
            <label htmlFor="stockTodos" className="form-check-label">
              Todos
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="filtroStock"
              id="stockDisponible"
              value="conStock"
              checked={filtroStock === "conStock"}
              onChange={(e) => setFiltroStock(e.target.value)}
            />
            <label htmlFor="stockDisponible" className="form-check-label">
              Solo con stock
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="filtroStock"
              id="stockSin"
              value="sinStock"
              checked={filtroStock === "sinStock"}
              onChange={(e) => setFiltroStock(e.target.value)}
            />
            <label htmlFor="stockSin" className="form-check-label">
              Sin stock
            </label>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </aside>
);

export default AsideFiltros;

import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: 0 });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: "Basic " + btoa("admin:admin123"),
        },
      });
  
      if (!res.ok) {
        throw new Error("Error al obtener los productos");
      }
  
      const data = await res.json();
  
      console.log(data);
  
      setProducts(data);
  
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  

  const handleCreate = async () => {
    if (!form.name || !form.description || !form.price) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admin:admin123"),
        },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        throw new Error("Hubo un error al crear el producto");
      }
  
      setForm({ name: "", description: "", price: 0 });
  
      fetchProducts();
  
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };
  

  const handleUpdate = async () => {
    try {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admin:admin123"),
        },
        body: JSON.stringify(form),
      });
      setForm({ name: "", description: "", price: 0 });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + btoa("admin:admin123"),
        },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const startEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
    });
    setEditingId(product.id);
  };

  const cancelEdit = () => {
    setForm({ name: "", description: "", price: 0 });
    setEditingId(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-8 max-w-6xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Gestión de Productos</h1>

        <div className="flex gap-2 mb-4 justify-center">
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded w-full md:w-1/3"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded w-full md:w-1/3"
          />
          <input
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            className="border p-2 rounded w-32"
          />
          {editingId ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 rounded"
              >
                Guardar
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-400 text-white px-4 rounded"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Crear
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto mx-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Descripción</th>
                <th className="px-4 py-2 text-left">Precio</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.description}</td>
                    <td className="px-4 py-2">${p.price}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">No hay productos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

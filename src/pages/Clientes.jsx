import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { Search, Edit, Trash2, X } from "lucide-react";

export default function Clientes() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [clientes, setClientes] = useState([
    { id: 1, nome: "João Silva", email: "joao@email.com", telefone: "(11) 99999-1111" },
    { id: 2, nome: "Maria Oliveira", email: "maria@email.com", telefone: "(21) 98888-2222" },
    { id: 3, nome: "Carlos Souza", email: "carlos@email.com", telefone: "(31) 97777-3333" },
    { id: 4, nome: "Ana Costa", email: "ana@email.com", telefone: "(41) 96666-4444" },
    { id: 5, nome: "Paulo Santos", email: "paulo@email.com", telefone: "(51) 95555-5555" },
  ]);

  const [selected, setSelected] = useState(null);
  const [modalType, setModalType] = useState(null); // 'edit' ou 'delete'

  // Filtro e paginação
  const filtered = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Handlers de ação
  const openEditModal = (cliente) => {
    setSelected(cliente);
    setModalType("edit");
  };

  const openDeleteModal = (cliente) => {
    setSelected(cliente);
    setModalType("delete");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setClientes((prev) =>
      prev.map((c) => (c.id === selected.id ? selected : c))
    );
    setModalType(null);
    alert("Cliente atualizado com sucesso!");
  };

  const handleDelete = () => {
    setClientes((prev) => prev.filter((c) => c.id !== selected.id));
    setModalType(null);
    alert("Cliente excluído com sucesso!");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Clientes
          </h2>

          <div className="relative mt-4 md:mt-0">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <th className="py-3 px-4 font-semibold">Nome</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Telefone</th>
                <th className="py-3 px-4 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0 ? (
                paginated.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                      {cliente.nome}
                    </td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                      {cliente.email}
                    </td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                      {cliente.telefone}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => openEditModal(cliente)}
                        className="p-2 rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(cliente)}
                        className="p-2 rounded-md text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 text-center text-gray-600 dark:text-gray-300"
                  >
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Página {page} de {totalPages || 1}
          </p>
          <div className="space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      </div>

      {/* === MODAIS === */}
      {modalType === "edit" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4">Editar Cliente</h3>
            <form onSubmit={handleEdit} className="space-y-3">
              <input
                type="text"
                value={selected.nome}
                onChange={(e) =>
                  setSelected({ ...selected, nome: e.target.value })
                }
                className="w-full p-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              />
              <input
                type="email"
                value={selected.email}
                onChange={(e) =>
                  setSelected({ ...selected, email: e.target.value })
                }
                className="w-full p-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              />
              <input
                type="text"
                value={selected.telefone}
                onChange={(e) =>
                  setSelected({ ...selected, telefone: e.target.value })
                }
                className="w-full p-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}

      {modalType === "delete" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-80 p-6 text-center">
            <h3 className="text-lg font-semibold mb-3">Excluir Cliente</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-5">
              Tem certeza que deseja excluir{" "}
              <span className="font-medium">{selected.nome}</span>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

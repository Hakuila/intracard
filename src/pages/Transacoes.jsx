import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import {
  FileDown,
  FileText,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
} from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";

export default function Transacoes() {
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "data", direction: "desc" });
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(5);

  const [modalAberto, setModalAberto] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);

  const [transacoes, setTransacoes] = useState([
    { id: 1, cliente: "João Silva", valor: 250.0, status: "Concluída", data: "2025-11-01" },
    { id: 2, cliente: "Maria Oliveira", valor: 400.5, status: "Pendente", data: "2025-11-05" },
    { id: 3, cliente: "Ana Costa", valor: 120.75, status: "Cancelada", data: "2025-11-06" },
    { id: 4, cliente: "Carlos Souza", valor: 600.0, status: "Concluída", data: "2025-11-08" },
    { id: 5, cliente: "Fernanda Rocha", valor: 150.0, status: "Pendente", data: "2025-11-11" },
    { id: 6, cliente: "Pedro Lima", valor: 820.3, status: "Concluída", data: "2025-11-10" },
    { id: 7, cliente: "Julia Ramos", valor: 320.0, status: "Pendente", data: "2025-11-02" },
  ]);

  // ======== FILTRAGEM ========
  const filtradas = transacoes.filter((t) => {
    const nomeMatch = t.cliente.toLowerCase().includes(filtroCliente.toLowerCase());
    const statusMatch = filtroStatus === "Todos" || t.status === filtroStatus;
    const dataT = new Date(t.data);
    const dentroPeriodo =
      (!dataInicio || dataT >= new Date(dataInicio)) &&
      (!dataFim || dataT <= new Date(dataFim));
    return nomeMatch && statusMatch && dentroPeriodo;
  });

  // ======== ORDENAÇÃO ========
  const ordenar = (key) => {
    setSortConfig((prev) => {
      const novaDirecao = prev.key === key && prev.direction === "asc" ? "desc" : "asc";
      return { key, direction: novaDirecao };
    });
  };

  const ordenadas = [...filtradas].sort((a, b) => {
    const { key, direction } = sortConfig;
    let result = 0;

    if (key === "valor") result = a.valor - b.valor;
    else if (key === "data") result = new Date(a.data) - new Date(b.data);
    else result = a[key].localeCompare(b[key]);

    return direction === "asc" ? result : -result;
  });

  // ======== PAGINAÇÃO ========
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const paginadas = ordenadas.slice(inicio, fim);
  const totalPaginas = Math.ceil(ordenadas.length / itensPorPagina);

  const handleStatusChange = (id, novoStatus) => {
    setTransacoes((prev) => prev.map((t) => (t.id === id ? { ...t, status: novoStatus } : t)));
  };

  // ======== EXPORTAÇÃO ========
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Transações - IntraCard", 14, 15);
    doc.autoTable({
      head: [["Cliente", "Valor (R$)", "Status", "Data"]],
      body: ordenadas.map((t) => [
        t.cliente,
        `R$ ${t.valor.toFixed(2)}`,
        t.status,
        new Date(t.data).toLocaleDateString(),
      ]),
      startY: 25,
      headStyles: { fillColor: [59, 130, 246] },
    });
    doc.save("transacoes.pdf");
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(ordenadas);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "transacoes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ======== MODAL ========
  const abrirModal = (transacao) => {
    setTransacaoSelecionada(transacao);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setTransacaoSelecionada(null);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* ======= Cabeçalho ======= */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Transações</h1>
          <div className="flex gap-3">
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              <FileText size={18} /> PDF
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              <FileDown size={18} /> CSV
            </button>
          </div>
        </div>

        {/* ======= Filtros ======= */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Search size={18} /> Filtros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={filtroCliente}
              onChange={(e) => setFiltroCliente(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            />

            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            >
              <option value="Todos">Todos os Status</option>
              <option value="Concluída">Concluída</option>
              <option value="Pendente">Pendente</option>
              <option value="Cancelada">Cancelada</option>
            </select>

            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            />

            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            />
          </div>
        </section>

        {/* ======= Tabela ======= */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                <th className="py-2">Ações</th>
                {["cliente", "valor", "status", "data"].map((col) => (
                  <th
                    key={col}
                    onClick={() => ordenar(col)}
                    className="py-2 cursor-pointer select-none"
                  >
                    {col.charAt(0).toUpperCase() + col.slice(1)}{" "}
                    {sortConfig.key === col &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginadas.length > 0 ? (
                paginadas.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td>
                      <button
                        onClick={() => abrirModal(t)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                    <td className="py-3 text-gray-800 dark:text-gray-100">{t.cliente}</td>
                    <td className="text-gray-800 dark:text-gray-100">
                      R$ {t.valor.toFixed(2)}
                    </td>
                    <td>
                      <select
                        value={t.status}
                        onChange={(e) => handleStatusChange(t.id, e.target.value)}
                        className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm text-gray-800 dark:text-gray-200"
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Concluída">Concluída</option>
                        <option value="Cancelada">Cancelada</option>
                      </select>
                    </td>
                    <td className="text-gray-800 dark:text-gray-100">
                      {new Date(t.data).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-600 dark:text-gray-300"
                  >
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* ======= MODAL ======= */}
        {modalAberto && transacaoSelecionada && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl relative">
              <button
                onClick={fecharModal}
                className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Detalhes da Transação
              </h2>

              <div className="space-y-3 text-gray-800 dark:text-gray-200">
                <p><strong>ID:</strong> {transacaoSelecionada.id}</p>
                <p><strong>Cliente:</strong> {transacaoSelecionada.cliente}</p>
                <p><strong>Valor:</strong> R$ {transacaoSelecionada.valor.toFixed(2)}</p>
                <p><strong>Data:</strong> {new Date(transacaoSelecionada.data).toLocaleDateString()}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <select
                    value={transacaoSelecionada.status}
                    onChange={(e) =>
                      handleStatusChange(transacaoSelecionada.id, e.target.value)
                    }
                    className="ml-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm"
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Concluída">Concluída</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </p>
              </div>

              <button
                onClick={fecharModal}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

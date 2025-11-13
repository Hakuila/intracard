import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, User, Calendar, Lock, Unlock, Wallet, X } from "lucide-react";

export default function Cartoes() {
  const [cartoes, setCartoes] = useState([
    { id: 1, cliente: "Maria Oliveira", numero: "**** **** **** 2345", validade: "12/26", status: "Ativo", limite: 3000 },
    { id: 2, cliente: "João Souza", numero: "**** **** **** 9876", validade: "08/25", status: "Ativo", limite: 1500 },
    { id: 3, cliente: "Ana Costa", numero: "**** **** **** 5432", validade: "05/24", status: "Inativo", limite: 0 },
    { id: 4, cliente: "Rafael Lima", numero: "**** **** **** 1122", validade: "03/27", status: "Ativo", limite: 5000 },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [cartaoSelecionado, setCartaoSelecionado] = useState(null);
  const [novoLimite, setNovoLimite] = useState("");

  const handleToggleStatus = (id) => {
    setCartoes((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === "Ativo" ? "Inativo" : "Ativo" } : c
      )
    );
  };

  const abrirModal = (cartao) => {
    setCartaoSelecionado(cartao);
    setNovoLimite(cartao.limite.toFixed(2));
    setModalAberto(true);
  };

  const salvarLimite = () => {
    const valor = parseFloat(novoLimite);
    if (isNaN(valor) || valor < 0) return alert("Informe um valor válido!");

    setCartoes((prev) =>
      prev.map((c) =>
        c.id === cartaoSelecionado.id ? { ...c, limite: valor } : c
      )
    );
    setModalAberto(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6 text-gray-800 dark:text-gray-100 transition-colors">
        <h1 className="text-2xl font-bold mb-4">Cartões</h1>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">
            Cartões Ativos e Inativos
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                  <th className="py-2">Cliente</th>
                  <th className="py-2">Número</th>
                  <th className="py-2">Validade</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Limite (R$)</th>
                  <th className="py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {cartoes.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-3 flex items-center gap-2">
                      <User size={16} /> {c.cliente}
                    </td>
                    <td>
                      <CreditCard size={14} className="inline mr-1" />
                      {c.numero}
                    </td>
                    <td>
                      <Calendar size={14} className="inline mr-1" />
                      {c.validade}
                    </td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${c.status === "Ativo"
                            ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                            : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                          }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td>{c.limite.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    <td className="flex gap-3 items-center">
                      <button
                        onClick={() => handleToggleStatus(c.id)}
                        className={`flex items-center gap-1 font-medium transition hover:underline ${c.status === "Ativo"
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                          }`}
                      >
                        {c.status === "Ativo" ? (
                          <>
                            <Lock size={14} /> Bloquear
                          </>
                        ) : (
                          <>
                            <Unlock size={14} /> Desbloquear
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => abrirModal(c)}
                        className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        <Wallet size={14} /> Alterar Limite
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ======= Modal com efeito cinematográfico ======= */}
        <AnimatePresence>
          {modalAberto && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Fundo com escurecimento e leve zoom-out */}
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 0.98 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
              />

              {/* Caixa do modal */}
              <motion.div
                className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-sm z-10"
                initial={{ y: 60, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 60, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  onClick={() => setModalAberto(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={18} />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Alterar Limite
                </h2>

                <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
                  Cliente: <span className="font-medium">{cartaoSelecionado?.cliente}</span>
                </p>

                <input
                  type="number"
                  step="0.01"
                  value={novoLimite}
                  onChange={(e) => setNovoLimite(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex justify-end mt-6 gap-3">
                  <button
                    onClick={() => setModalAberto(false)}
                    className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={salvarLimite}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Salvar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}

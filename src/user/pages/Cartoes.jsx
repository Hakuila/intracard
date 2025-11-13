import MainLayout from "../layout/MainLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardUser() {
  const historico = [
    { mes: "Jul", gastos: 1200 },
    { mes: "Ago", gastos: 1500 },
    { mes: "Set", gastos: 900 },
    { mes: "Out", gastos: 1300 },
    { mes: "Nov", gastos: 1700 },
  ];

  const transacoesRecentes = [
    {
      id: 1,
      descricao: "Compra Supermercado",
      valor: -150.5,
      data: "10/11/2025",
      status: "Concluída",
    },
    {
      id: 2,
      descricao: "Depósito de Crédito",
      valor: 500,
      data: "09/11/2025",
      status: "Concluída",
    },
    {
      id: 3,
      descricao: "Assinatura Streaming",
      valor: -39.9,
      data: "08/11/2025",
      status: "Pendente",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* ====== Cards de Saldo ====== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">Saldo Disponível</h2>
            <p className="text-3xl font-bold text-green-500">R$ 2.350,00</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">Limite Total</h2>
            <p className="text-3xl font-bold text-blue-500">R$ 5.000,00</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">Gastos Recentes</h2>
            <p className="text-3xl font-bold text-red-500">R$ 1.720,00</p>
          </div>
        </section>

        {/* ====== Gráfico de Gastos ====== */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 dark:text-gray-200">
            Gastos dos Últimos Meses
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={historico}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="mes" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="gastos"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ====== Transações Recentes ====== */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 dark:text-gray-200">
            Transações Recentes
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                  <th className="py-2">Descrição</th>
                  <th className="py-2">Valor</th>
                  <th className="py-2">Data</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {transacoesRecentes.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-3 dark:text-gray-100">{t.descricao}</td>
                    <td
                      className={`${
                        t.valor >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      } font-medium`}
                    >
                      {t.valor >= 0 ? "+" : "-"} R$ {Math.abs(t.valor).toFixed(2)}
                    </td>
                    <td className="dark:text-gray-200">{t.data}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          t.status === "Concluída"
                            ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

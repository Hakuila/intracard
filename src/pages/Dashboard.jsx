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

export default function Dashboard() {
  const data = [
    { mes: "Jan", credito: 1200 },
    { mes: "Fev", credito: 1800 },
    { mes: "Mar", credito: 2200 },
    { mes: "Abr", credito: 1900 },
    { mes: "Mai", credito: 2400 },
    { mes: "Jun", credito: 2000 },
  ];

  const clientes = [
    { id: 1, nome: "Maria Oliveira", status: "Ativo", credito: 500 },
    { id: 2, nome: "João Souza", status: "Ativo", credito: 300 },
    { id: 3, nome: "Ana Costa", status: "Inativo", credito: 0 },
    { id: 4, nome: "Rafael Lima", status: "Ativo", credito: 700 },
    { id: 5, nome: "Fernanda Rocha", status: "Inativo", credito: 0 },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 text-gray-800 dark:text-gray-100 transition-colors">
        {/* ======= Cards ======= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-100">
              Saldo Total
            </h2>
            <p className="text-3xl font-bold text-blue-500">R$ 3.250,00</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-100">
              Créditos em Uso
            </h2>
            <p className="text-3xl font-bold text-yellow-500">R$ 1.120,00</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-100">
              Clientes Ativos
            </h2>
            <p className="text-3xl font-bold text-green-500">58</p>
          </div>
        </section>

        {/* ======= Gráfico ======= */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">
            Uso de Créditos (Últimos 6 Meses)
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ccc"
                  className="dark:stroke-gray-700"
                />
                <XAxis dataKey="mes" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    color: "#fff",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="credito"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ======= Lista de Clientes ======= */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">
            Lista de Clientes
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                  <th className="py-2">Nome</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Crédito (R$)</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-3 text-gray-800 dark:text-gray-100">
                      {c.nome}
                    </td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          c.status === "Ativo"
                            ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                            : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="text-gray-800 dark:text-gray-100">
                      {c.credito.toFixed(2)}
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

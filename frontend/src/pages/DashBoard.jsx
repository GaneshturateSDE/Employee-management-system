import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 text-center">
        <div className="bg-white p-4 h-30 rounded shadow">Employees: 20</div>
        <div className="bg-white p-4 h-30 rounded shadow">Leaves Today: 3</div>
        <div className="bg-white p-4 h-30 rounded shadow">Present Today: 17</div>
      </div>
    </Layout>
  );
}

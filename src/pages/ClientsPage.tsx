import { ClientService } from "../services/ClientService";
import { useState, useEffect } from "react";

export default function ClientsPage() {
  const [getClient, setClient] = useState<any[]>([]);

  const loadClients = async () => {
    const datos = await ClientService.obtClients();
    setClient(datos);
  };

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Tabla de clientes</h2>
      <br />
      <table className="table table-sm table-dark table-bordered">
        <thead className="">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        {getClient.map((cliente) => (
          <tbody>
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.name}</td>
              <td>{cliente.email}</td>
              <td>{cliente.phone}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

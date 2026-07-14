import { useHistory, useParams } from "react-router";
import { ClientService } from "../services/ClientService";
import { useState, useEffect } from "react";
import { IonButton } from "@ionic/react";

export default function ClientsPage() {
  const [client, setClient] = useState<any[]>([]);

  const loadClients = async () => {
    const datos = await ClientService.getClients();
    setClient(datos);
  };

  const eliminar = async(id:Number)=>{
    const ok = confirm("Deseas eliminar el registro?");
    if(ok){

    ClientService.deleteClient(id);
    loadClients();
    }
  }

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Tabla de clientes</h2>
      <br />
      <table className="table table-sm table-dark table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>

        {client.map((cliente) => (
          <tbody>
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.name}</td>
              <td>{cliente.email}</td>
              <td>{cliente.phone}</td>
              <td><IonButton routerLink={`/edit/${cliente.id}`} >Editar</IonButton></td>
              <td><IonButton onClick={()=>eliminar(cliente.id)}>Eliminar</IonButton></td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

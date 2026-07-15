import { useHistory, useParams } from "react-router";
import { ClientService } from "../services/ClientService";
import { useState, useEffect } from "react";
import {
  IonButton,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  useIonViewWillEnter,
} from "@ionic/react";

export default function ClientsPage() {

  const [client, setClient] = useState<any[]>([]);
  
  //----------------PAGINACION-----------------------

  const [currentPage, Setpage] = useState(1);

  const recordsPerPage = 5;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  
  const currentClients = client.slice(firstIndex, lastIndex);
  const totalPage = Math.ceil(client.length / recordsPerPage);
  
  const pageNumber = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumber.push(i);
    }

  //----------------PAGINACION-----------------------
  const loadClients = async () => {
    const datos = await ClientService.getClients();
    setClient(datos);
  };

  const eliminar = async (id: Number) => {
    const ok = confirm("Deseas eliminar el registro?");
    if (ok) {
     await ClientService.deleteClient(id);
     await loadClients();
    }
  };

  /*   useEffect(() => {
    loadClients();
  }, []); */
  useIonViewWillEnter(() => {
    loadClients();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi empresa</IonTitle>
          <IonButtons>
            <IonButton routerLink="/home">Home</IonButton>
            <IonButton routerLink="/clients">Clientes</IonButton>
            <IonButton routerLink="/add">Añadir Clientes</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
                <th>Facturation</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.name}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.phone}</td>
                  <td>{Number(cliente.facturation).toLocaleString('es-ES', {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 2
                  })}</td>
                  <td>
                    <IonButton routerLink={`/edit/${cliente.id}`}>
                      Editar
                    </IonButton>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminar(cliente.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center mt-3">
          {pageNumber.map((page) => (
            <button
              key={page}
              className={
                page === currentPage
                  ? "btn btn-primary mx-1"
                  : "btn btn-outline-primary mx-1"
              }
              onClick={() => Setpage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
}

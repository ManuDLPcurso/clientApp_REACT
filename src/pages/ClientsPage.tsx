import { useHistory, useParams } from "react-router";
import { ClientService } from "../services/ClientService";
import { useState, useEffect } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { AuthService } from "../services/AuthService";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Clientes.css";
import {
  IonButton,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  useIonViewWillEnter,
  IonToast,
} from "@ionic/react";

export default function ClientsPage() {
  const [client, setClient] = useState<any[]>([]);
  const [isLogged, setIsLogged] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useHistory();

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

  //----------------FIN PAGINACION---------------------
  //***************************************************
  //----------------LOGIN/LOGOUT-----------------------

  const logout = async () => {
    try {
      await AuthService.logout();
      setIsLogged(false);
      navigate.push("/login");
    } catch (error) {
      console.error(error);
      alert("Error cerrando sesión");
    }
  };

  const checkAuth = async () => {
    const logged = await AuthService.isAuthenticated();
    setIsLogged(logged);
  };

  //----------------FIN LOGIN/LOGOUT-------------------
  //***************************************************
  //----------------CAPACITOR-------------------

  const getLocation = async () => {
    const position = await Geolocation.getCurrentPosition();
    const lat = position.coords.latitude;
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  };

  //----------------FIN CAPACITOR-------------------
  //***************************************************
  //----------------FUNCIONES-------------------

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

  console.log("search >> ", search);

  const filteredClients = client.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );
  //---------------CICLO DE VIDA--------------------

  useIonViewWillEnter(() => {
    loadClients();
    checkAuth();
  }, []);

  //------------------------------------------------

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi empresa</IonTitle>
          <IonButtons>
            <IonButton routerLink="/home">Home</IonButton>
            <IonButton routerLink="/clients">Clientes</IonButton>
            <IonButton routerLink="/add">Añadir Clientes</IonButton>

            {!isLogged && (
              <IonButton className="btn btn-success" routerLink="/login">
                Login
              </IonButton>
            )}
            {isLogged && (
              <IonButton className="btn btn-danger" onClick={logout}>
                Logout
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container mt-4 table-responsive action-column">
          <input
            className="form-control"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <h2>Tabla de clientes</h2>

          <IonButton onClick={() => setShowToast(true)}>
            <i className="bi bi-chat-dots" style={{ marginRight: "8px" }}></i>
            Toast
          </IonButton>

          <div id="count-clients" className="alert alert-primary">
            Total clientes: {client.length}
          </div>

          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Manolito eres un fiera"
            duration={2000}
          />

          <IonButton onClick={getLocation}>
            <i className="bi bi-compass" style={{ marginRight: "8px" }}></i>GPS
          </IonButton>

          <div id="count-clients" className="alert alert-primary">
            Latitud:{} <br /> Longitud:{}
          </div>

          <br />

          <table className="table table-hover align clients-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Facturation</th>
                <th>Editar</th>
                {isLogged && <th>Eliminar</th>}
              </tr>
            </thead>
            <tbody>
              {(search === "" ? currentClients : filteredClients).map(
                (cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.name}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.phone}</td>
                    <td>
                      {Number(cliente.facturation).toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      <IonButton
                        className="buttonprueba"
                        routerLink={`/edit/${cliente.id}`}
                      >
                        Editar
                      </IonButton>
                    </td>
                    <td>
                      {isLogged && (
                        <button
                          className="btn btn-danger"
                          onClick={() => eliminar(cliente.id)}
                        >
                          Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                ),
              )}
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

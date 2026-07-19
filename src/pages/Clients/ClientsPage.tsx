/* import { useHistory, useParams } from "react-router";
import { ClientService } from "../../services/ClientService";
import { useState, useEffect } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { AuthService } from "../../services/AuthService";
import "bootstrap-icons/font/bootstrap-icons.css";
import Pagination from "./../../components/Pagination"
import SearchBar from "./../../components/SearchBar"
import { usePagination } from "./../../hooks/usePagination"

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
import { ClientInterface } from "../../interfaces/ClientInterface";

export default function ClientsPage() {
  const [client, setClient] = useState<any[]>([]);
  const [isLogged, setIsLogged] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useHistory();

  //----------------PAGINACION-----------------------



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

  const filteredClients = client.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const {
    currentData,
    pageNumber,
    currentPage,
    setCurrentPage,
    } = usePagination(filteredClients, 5);

  //const clientsToShow = search === "" ? currentClients : filteredClients.slice(firstIndex,lastIndex);
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
            <IonButton routerLink="/add">Añadir Cliente</IonButton>
            <IonButton routerLink="/warehouse">Almacenes</IonButton>
            <IonButton routerLink="/add-warehouse">Añadir Almacen</IonButton>

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

          <SearchBar 
          search = {search}
          setSearch={setSearch}
          placeholder="Buscar cliente"
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
                <th>Ciudad</th>
                <th>Editar</th>
                {isLogged && <th>Eliminar</th>}
              </tr>
            </thead>
            <tbody>
              {currentData.map(
                (cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.name}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.phone}</td>
                    <td>{cliente.city}</td>

                    <td>
                      <IonButton
                        className="buttonprueba"
                        routerLink={`/profile-client/${cliente.id}`}
                      >
                        Perfil
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
        <Pagination
          pageNumber={pageNumber}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />


        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
} */


//------Libs--------------------------------------------------
import { useState } from "react";
import { useHistory } from "react-router";

//------Components, Services, Hooks--------------------------------------------------
import { ClientService } from "../../services/ClientService";
import { ClientInterface } from "../../interfaces/ClientInterface";
import { usePagination } from "./../../hooks/usePagination"
import Pagination from "./../../components/Pagination"
import SearchBar from "./../../components/SearchBar"

//------Ionic--------------------------------------------------
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToast, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { addCircle, personOutline, trashOutline } from "ionicons/icons";


export default function ClientsPage(){
    const [clients, setClients] = useState<ClientInterface[]>([]);
    //const [isLogged,setIsLogged] = useState(false);//Permisos Login
    const [search,setSearch] = useState("");//SearchBar

    const navigate = useHistory();

//----------------FUNCIONES-------------------

    const loadClients = async() =>{
        const datos = await ClientService.getClients();
        setClients(datos);
    };//Cargar almacenes 

    const delClient = async (id:Number) => {
        const ok = confirm("¿Deseas eliminar este cliente?")
        if (ok){
            await ClientService.deleteClient(id);
            await loadClients();
        }
    };//Eliminar almacen

//----------------PAGINACION-------------------

    const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
    );//Filtrar almacenes por nombre

    const {
    currentData,
    pageNumber,
    currentPage,
    setCurrentPage,
    } = usePagination(filteredClients, 5);//Hook para recibir data

//----------------CICLO DE VIDA-------------------

    useIonViewWillEnter(() => {
        loadClients()
    },[]);

    return(
        <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi empresa</IonTitle>
          <IonButtons>
             <IonButton routerLink="/home">Home</IonButton>
            <IonButton routerLink="/clients">Clientes</IonButton>
            <IonButton routerLink="/add-client">Añadir Cliente</IonButton>
            <IonButton routerLink="/warehouse">Almacenes</IonButton>
            <IonButton routerLink="/add-warehouse">Añadir Almacen</IonButton>

          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container mt-4 table-responsive action-column">

          <SearchBar 
          search = {search}
          setSearch={setSearch}
          placeholder="Buscar cliente"
          />
          
          <h2>Tabla de clientes</h2>

          <IonButton routerLink= "/add-client/">
            Añadir cliente 
            <IonIcon
              icon={addCircle}
              slot="start"
              style={{ marginLeft: "0px" }}/>
          </IonButton>

          <br /><br />

          <table className="table table-hover align clients-table">
            <thead>

              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
                <th>Perfil</th>
                <th>Eliminar</th>
              </tr>

            </thead>

            <tbody>
              {currentData.map(
                (clients) => (
                  <tr key={clients.id}>
                    <td>{clients.id}</td>
                    <td>{clients.name}</td>
                    <td>{clients.email}</td>
                    <td>{clients.phone}</td>
                    <td>{clients.city}</td>
                    <td>
                      <IonButton routerLink={`/profile-client/${clients.id}`}>
                        Perfil
                        <IonIcon
                          icon={personOutline}
                          slot="start"
                          style={{ marginLeft: "0px" }}/>
                      </IonButton>
                    </td>
                    <td>
                      <IonButton
                          fill="clear"
                          color="danger"
                          
                          onClick={() => {
                            if(clients.id){
                            delClient(clients.id)}}}
                      >
                        <IonIcon
                          icon={trashOutline}
                          slot="icon-only"/>
                      </IonButton>
                    </td>
                  </tr>
                )
              )}
            </tbody>

          </table>
        </div>

        <Pagination
          pageNumber={pageNumber}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
    )







}


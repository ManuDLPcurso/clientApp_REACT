/* import { useState } from "react";
import { ClientService } from "../../services/ClientService";
import { useHistory } from "react-router-dom";

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ClientInterface } from "../../interfaces/ClientInterface";

export default function AddPage() {
  const [client, setClient] = useState<ClientInterface>({ 
    name: "",
    email: "", 
    phone: "", 
    city:"",
    created_at:"" });

  const navigate = useHistory();

  const save = async () => {
    await ClientService.addClient(client);
    navigate.push("/clients");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi empresa</IonTitle>
          <IonButtons>
            <IonButton routerLink="/home">Home</IonButton>
            <IonButton routerLink="/clients">Clientes</IonButton>
            <IonButton routerLink="/add">Añadir Clientes</IonButton>
            <IonButton routerLink="/warehouse">Home</IonButton>
            <IonButton routerLink="/edit-warehouse">Clientes</IonButton>
            <IonButton routerLink="/add-warehouse">Añadir Clientes</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container mt-4 card shadow">
          <br />
          <h2>Nuevo cliente</h2>

          <input
            className="form-control mb-3"
            placeholder="Nombre"
            onChange={(e) => setClient({ ...client, name: e.target.value })}
          />
          <input
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setClient({ ...client, email: e.target.value })}
          />
          <input
            className="form-control mb-3"
            placeholder="Phone"
            onChange={(e) => setClient({ ...client, phone: e.target.value })}
          />
           <input
            className="form-control mb-3"
            placeholder=""
            onChange={(e) => setClient({ ...client, city: e.target.value })}
          />
          
          <button className="btn btn-primary" onClick={save}>
            Guardar
          </button>
          <br />
        </div>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
} */

  import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { ClientService } from "../../services/ClientService";

export default function ClientsPage() {

    const [client, setClient] = useState({ 
      name: "",
      email: "", 
      phone: "", 
      city:"",
    });

    const navigate = useHistory();

    const add = async () => {
    await ClientService.addClient(client);
    navigate.push("/clients");
    };

    return (
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
        <div>

            <h2>Nuevo cliente</h2>

            <input
            className="form-control mb-3"
            placeholder="Nombre"
            onChange={(e) => setClient({ ...client, name: e.target.value })}
            />
            <input
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setClient({ ...client, email: e.target.value })}
            />
            <input
            className="form-control mb-3"
            placeholder="Teléfono"
            onChange={(e) => setClient({ ...client, phone: e.target.value })}
            />
            <input
            className="form-control mb-3"
            placeholder="Ciudad"
            onChange={(e) => setClient({ ...client, city: (e.target.value) })}
            />
            
            <button className="btn btn-primary" onClick={add}>
            Guardar
            </button>
            <br />
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


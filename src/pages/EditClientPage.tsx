import {
  IonButton,
  IonInput,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonPage,
  IonTitle,
  IonContent,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { ClientService } from "../services/ClientService";
import { useHistory, useParams } from "react-router";
import './EditClients.css'

export default function EditClientPage() {
  const navigate = useHistory();

  const [client, setClient] = useState({ name: "", email: "", phone: "", facturation:"" });

  const { id } = useParams<{ id: string }>();

  const loadClient = async () => {
    const dato = await ClientService.getClient(Number(id));
    setClient(dato);
  };

  const editClient = async () => {
    await ClientService.updateClient(Number(id), client);
    navigate.push("/clients");
  };

  /* useEffect(() => {
    loadClient();
  }, []); */
  useIonViewWillEnter(()=>{
    loadClient();
  },[])

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
        <div className="container mt-4 form-control edit-form" style={{ maxWidth: '500px' }}>
          <h2>Editar cliente</h2>  
          <IonInput
            className="form-control mb-3"
            placeholder="Nombre"
            value={client.name}
            onIonInput={(e) =>
              setClient({ ...client, name: e.detail.value ?? "" })
            }
          ></IonInput>
          <IonInput
            className="form-control mb-3"
            placeholder="Email"
            value={client.email}
            onIonInput={(e) =>
              setClient({ ...client, email: e.detail.value ?? "" })
            }
          ></IonInput>
          <IonInput
            className="form-control mb-3"
            placeholder="Phone"
            value={client.phone}
            onIonInput={(e) =>
              setClient({ ...client, phone: e.detail.value ?? "" })
            }
          ></IonInput>
          <IonInput
            className="form-control mb-3"
            placeholder="Factura"
            value={client.facturation}
            onIonInput={(e) =>
              setClient({ ...client, facturation: e.detail.value ?? "" })
            }
          ></IonInput>
          <IonButton className="edit-button" d-grid onClick={editClient}>Actualizar</IonButton>
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

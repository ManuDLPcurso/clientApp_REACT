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
import { ClientService } from "./../../services/ClientService"
import { useHistory, useParams } from "react-router";


export default function EditClientPage() {
  const navigate = useHistory();

  const [client, setClient] = useState({ 
      name: "",
      email: "", 
      phone: "", 
      city:"" 
  });

  const { id } = useParams<{ id: string }>();

  const loadClient = async () => {
    const dato = await ClientService.getClient(Number(id));
    setClient(dato);
  };

  const update = async () => {
    await ClientService.updateClient(Number(id), client);
    navigate.push("/clients");
  };

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
            <IonButton routerLink="/add-client">Añadir Cliente</IonButton>
            <IonButton routerLink="/warehouse">Almacenes</IonButton>
            <IonButton routerLink="/add-warehouse">Añadir Almacen</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>

          <h2>Editar cliente</h2>  

          <IonInput
            className="form-control mb-3"
            placeholder="Nombre"
            value={client.name}
            onIonInput={(e) => setClient({ ...client, name: e.detail.value ?? "" })
              
            }
          ></IonInput>
          <IonInput
            className="form-control mb-3"
            placeholder="Email"
            value={client.email}
            onIonInput={(e) => setClient({ ...client, email: e.detail.value ?? "" })
              
            }
          ></IonInput>
          <IonInput
            className="form-control mb-3"
            placeholder="Phone"
            value={client.phone}
            onIonInput={(e) => setClient({ ...client, phone: e.detail.value ?? "" })
            }
              
          ></IonInput>
          <IonInput
            className="form-control mb-3"
            placeholder="Ciudad"
            value={client.city}
            onIonInput={(e) => setClient({ ...client, city: e.detail.value ?? "" })
              
            }
          ></IonInput>
          <IonButton className="btn button-primary" onClick={update}>
            Actualizar
          </IonButton>
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

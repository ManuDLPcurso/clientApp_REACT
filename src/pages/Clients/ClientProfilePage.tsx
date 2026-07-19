import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router";
import { ClientInterface } from "../../interfaces/ClientInterface";
import { ClientService } from "../../services/ClientService";
import { formatDate } from "../../utils/formatDate"
import { create } from "ionicons/icons";


export default function ClientProfilePage(){

    const [client, setClient] = useState<ClientInterface>({
        name: "",
        email:"",
        phone:"",
        city:"",
        created_at:""
    });

    const { id } = useParams<{ id: string }>();

    const loadClient = async () => {
        const datos = await ClientService.getClient(Number(id));
        setClient(datos);
    };

    useIonViewWillEnter(() => {
        loadClient();
    }, []);

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
         <div className="container">
            <h2>{client.name}</h2>
                <div>
                    <h5>Información</h5>
                    <p><strong>ID:</strong> {client.id}</p>
                    <p><strong>Email:</strong> {client.email}</p>
                    <p><strong>Teléfono:</strong> {client.phone}</p>
                    <p><strong>Ciudad:</strong> {client.city}</p>
                    <p><strong>Creado el día:</strong> {formatDate(client.created_at)}</p>
                    <IonButton
                        className="buttonprueba"
                        routerLink={`/edit-client/${client.id}`}
                      >
                        Editar
                    </IonButton>
                </div>
        </div>
      </IonContent>
    </IonPage>

    )}
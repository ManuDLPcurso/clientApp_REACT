import { IonButton, IonInput } from "@ionic/react";
import { useEffect, useState } from "react";
import { ClientService } from "../services/ClientService";
import { useHistory, useParams } from "react-router";

export default function EditClientPage(){

    const navigate = useHistory();

    const [client, setClient]= useState({ name: "", email: "", phone: "" });
    
    const {id}=useParams<{id: string}>();

    const loadClient = async()=>{
        const dato = await ClientService.getClient (Number(id));
        setClient(dato);
    }

    const editClient= async()=>{
        await ClientService.updateClient(Number(id),client)
        navigate.push("/clients");
    }

    useEffect(() => {
        loadClient()
      }, []);

    return(
        <div>
            <IonInput></IonInput>
            <IonInput  placeholder="Nombre"
                value={client.name}
                onIonChange={ (e) => setClient( {...client, name: e.detail.value ?? "" } ) }>
            </IonInput>
            <IonInput placeholder="Email"
                value={client.email}
                onIonChange={ (e) => setClient( {...client, email: e.detail.value ?? "" } ) }>
            </IonInput>
            <IonInput placeholder="Phone"
                value={client.phone}
                onIonChange={ (e) => setClient( {...client, phone: e.detail.value ?? "" } ) }>
            </IonInput>
            <IonButton onClick={editClient}>Actualizar</IonButton>
        </div>

    );
}
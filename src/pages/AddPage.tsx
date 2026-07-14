import { useState } from "react";
import { ClientService } from "../services/ClientService";
import { useHistory } from 'react-router-dom';


export default function AddPage() {

  const [client, setClient] = useState({ name: "", email: "", phone: "" });

  const navigate = useHistory();

  const save = async() =>{ 
    await ClientService.addClient(client);  
    navigate.push("/clients");
  }
 
  return (
    <IonPage>      
      <IonHeader>        
        <IonToolbar>
          <IonTitle>Mi empresa</IonTitle>
            <IonButtons>
              <IonButton routerLink="/clients">Clientes</IonButton>
              <IonButton routerLink="/add">Añadir Clientes</IonButton>
              <IonButton routerLink="/edit">Editar Clientes</IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container mt-4">
      <h2>Nuevo cliente</h2>

      <input placeholder="Nombre"
        onChange={(e) => setClient({ ...client, name: e.target.value })}
      />
      <input placeholder="Email"
        onChange={(e) => setClient({ ...client, email: e.target.value })}
      />
      <input placeholder="Phone"
        onChange={(e) => setClient({ ...client, phone: e.target.value })}
      />
      <br /><br />
      <button className = "btn btn-success" onClick={save}>Guardar</button>

    </div>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
    
  );
}

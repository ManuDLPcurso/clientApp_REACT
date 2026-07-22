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
  IonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { ClientService } from "./../../services/ClientService"
import { useHistory, useLocation, useParams } from "react-router";
import { ClientInterface } from "../../interfaces/ClientInterface";


export default function EditClientPage() {

  const location = useLocation();
  const cliente:any =location.state;
  console.log(cliente)

  const [showToast, setShowToast] = useState(false);
  const [client, setClient] = useState({ 
      _id:"",
      name: "",
      email: "", 
      phone: 0, 
      city:"" 
  });

   const navigate = useHistory();
  


  //const { _id } = useParams<{ _id: string }>() 

   const loadClient = async () =>{
          const datos = await ClientService.getClients();
          setClient(datos);
          };

  const update = async () => {
    await ClientService.updateClient(client);
    setShowToast (true);
    navigate.push("/clients");
  };

  useIonViewWillEnter(()=>{
    if (cliente){
    setClient(cliente)}
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

          

           <IonInput readonly
            placeholder="Nombre"
            value={client._id}
            onIonInput={(e) => setClient({ ...client, _id: e.detail.value ?? "" })
              
            }
           ></IonInput> 

          <IonInput
            
            placeholder="Nombre"
            value={client.name}
            onIonInput={(e) => setClient({ ...client, name: e.detail.value ?? "" })
              
            }
          ></IonInput>
          <IonInput
            
            placeholder="Email"
            value={client.email}
            onIonInput={(e) => setClient({ ...client, email: e.detail.value ?? "" })
              
            }
          ></IonInput>
          <IonInput
            
            placeholder="Phone"
            value={client.phone}
            onIonInput={(e) => setClient({ ...client, phone: Number(e.detail.value ?? "" )})
            }
              
          ></IonInput>
          <IonInput
            
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
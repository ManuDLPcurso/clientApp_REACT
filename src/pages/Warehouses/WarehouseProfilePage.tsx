import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router";
import { WarehouseInterface } from "../../interfaces/WarehouseInterface";
import { WarehouseService } from "../../Services/WarehouseService";
import { formatDate } from "../../utils/formatDate";
import { create, earthOutline } from "ionicons/icons";


export default function WarehouseProfilePage(){

    const [warehouse, setWarehouse] = useState<WarehouseInterface>({
        name: "", 
        address: "", 
        city: "", 
        products:0,
        latitude: 0, 
        longitude:0,
        created_at:"",
    });

    const { id } = useParams<{ id: string }>();

    const loadWarehouse = async () => {
        const datos = await WarehouseService.getWarehouse(Number(id));
        setWarehouse(datos);
    };

    useIonViewWillEnter(() => {
        loadWarehouse();
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
            <h2>{warehouse.name}</h2>
                <div>
                    <h5>Información</h5>
                    <p><strong>Dirección:</strong> {warehouse.address}</p>
                    <p><strong>Ciudad:</strong> {warehouse.city}</p>
                    <p><strong>Nº de productos:</strong> {warehouse.products}</p>
                    <p><strong>Inaugurado el día:</strong> {formatDate(warehouse.created_at)}</p>
                    <p><strong>Latitud:</strong> {warehouse.latitude}</p>
                    <p><strong>Longitud:</strong> {warehouse.longitude}</p>
                    <a href={`https://www.google.com/maps?q=${warehouse.latitude},${warehouse.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IonIcon
                          icon={earthOutline}
                          slot="start"
                          style={{ marginRight: "8px" }}/>
                      Ver ubicación en Google Maps
                      <IonIcon
                          icon={earthOutline}
                          slot="start"
                          style={{ marginLeft: "8px" }}/>
                      
                    </a>
                      <br /><br />
                    <IonButton
                        className="buttonprueba"
                        routerLink={`/edit-warehouse/${warehouse.id}`}
                      >
                        Editar
                        <IonIcon
                          icon={create}
                          slot="start"
                          style={{ marginLeft: "0px" }}/>
                    </IonButton>
                    
                    
                      
                </div>
        </div>
      </IonContent>
    </IonPage>

    )

}
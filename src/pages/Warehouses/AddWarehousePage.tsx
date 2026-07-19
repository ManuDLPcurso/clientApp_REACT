import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { WarehouseService } from "../../services/WarehouseService";

export default function AddWarehousePage() {

    const [warehouse, setWarehouse] = useState({ 
    name: "", 
    address: "", 
    city: "", 
    products:0,
    latitude: 0, 
    longitude:0
    });

    const navigate = useHistory();

    const add = async () => {
    await WarehouseService.addWarehouse(warehouse);
    navigate.push("/warehouse");
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

            <h2>Nuevo almacén</h2>

            <input
            className="form-control mb-3"
            placeholder="Nombre"
            onChange={(e) => setWarehouse({ ...warehouse, name: e.target.value })}
            />
            <input
            className="form-control mb-3"
            placeholder="Ciudad"
            onChange={(e) => setWarehouse({ ...warehouse, city: e.target.value })}
            />
            <input
            className="form-control mb-3"
            placeholder="Dirección"
            onChange={(e) => setWarehouse({ ...warehouse, address: e.target.value })}
            />
            <input
            className="form-control mb-3"
            type="number"
            placeholder="Productos"
            onChange={(e) => setWarehouse({ ...warehouse, products: Number(e.target.value) })}
            />
            <input
            className="form-control mb-3"
            type="number"
            placeholder="Latitud"
            onChange={(e) => setWarehouse({ ...warehouse, latitude: Number(e.target.value) })}
            />
            <input
            className="form-control mb-3"
            type="number"
            placeholder="Longitud"
            onChange={(e) => setWarehouse({ ...warehouse, longitude: Number(e.target.value) })}
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

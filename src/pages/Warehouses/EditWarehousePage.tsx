import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { WarehouseService } from "../../services/WarehouseService";
import { WarehouseInterface } from "../../interfaces/WarehouseInterface";

export default function UpdateWarehousePage() {
    const navigate = useHistory();

    const [warehouse, setWarehouse] = useState<WarehouseInterface>({ 
        name: "", 
        address: "", 
        city: "", 
        products:0,
        latitude: 0, 
        longitude:0
    });

    const { id } = useParams<{ id: string }>() 

    const loadWarehouse = async () =>{
        const datos = await WarehouseService.getWarehouse(Number(id));
        setWarehouse(datos);
        };//Cargar almacenes 

    const update = async () => {
    await WarehouseService.updateWarehouse(Number(id), warehouse);
    navigate.push("/warehouse");
    };

    useIonViewWillEnter(()=>{
        loadWarehouse();
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

            <h2>Editar almacén</h2>

            <IonInput
            className="form-control mb-3"
            placeholder="Nombre"
            value={warehouse.name}
            onIonInput={(e) => setWarehouse({ ...warehouse, name: e.detail.value ?? ""})}
            />
            <IonInput
            className="form-control mb-3"
            placeholder="Ciudad"
            value={warehouse.city}
            onIonInput={(e) => setWarehouse({ ...warehouse, city: e.detail.value ?? ""})}
            />
            <IonInput
            className="form-control mb-3"
            placeholder="Dirección"
            value={warehouse.address}
            onIonInput={(e) => setWarehouse({ ...warehouse, address: e.detail.value ?? ""})}
            />
            <IonInput
            className="form-control mb-3"
            type="number"
            placeholder="Productos"
            value={warehouse.products}
            onIonInput={(e) => setWarehouse({ ...warehouse, products: Number(e.detail.value) ?? ""})}
            />
            <IonInput
            className="form-control mb-3"
            type="number"
            placeholder="Latitud"
            value={warehouse.latitude}
            onIonInput={(e) => setWarehouse({ ...warehouse, latitude: Number(e.detail.value) ?? ""})}
            />
            <IonInput
            className="form-control mb-3"
            type="number"
            placeholder="Longitud"
            value={warehouse.longitude}
            onIonInput={(e) => setWarehouse({ ...warehouse, longitude: Number(e.detail.value) ?? ""})}
            />
            
            <IonButton className="btn btn-primary" onClick={update}>
            Guardar
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

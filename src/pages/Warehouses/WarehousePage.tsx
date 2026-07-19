//------Libs--------------------------------------------------
import { useState } from "react";
import { useHistory } from "react-router";

//------Components, Services, Hooks--------------------------------------------------
import { WarehouseService } from "../../Services/WarehouseService";
import { WarehouseInterface } from "../../interfaces/WarehouseInterface";
import { usePagination } from "./../../hooks/usePagination"
import Pagination from "./../../components/Pagination"
import SearchBar from "./../../components/SearchBar"

//------Ionic--------------------------------------------------
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToast, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { addCircle, create, personOutline, storefrontOutline, trashOutline } from "ionicons/icons";



export default function WarehousePage(){
    const [warehouses, setWarehouses] = useState<WarehouseInterface[]>([]);
    //const [isLogged,setIsLogged] = useState(false);//Permisos Login
    const [search,setSearch] = useState("");//SearchBar

    const navigate = useHistory();

//----------------FUNCIONES-------------------

    const loadWarehouses = async() =>{
        const datos = await WarehouseService.getWarehouses();
        setWarehouses(datos);
    };//Cargar almacenes 

    const delWarehouse = async (id:Number) => {
        const ok = confirm("¿Deseas eliminar este almacen?")
        if (ok){
            await WarehouseService.deleteWarehouse(id);
            await loadWarehouses();
        }
    };//Eliminar almacen

//----------------PAGINACION-------------------

    const filteredWarehouses = warehouses.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
    );//Filtrar almacenes por nombre

    const {
    currentData,
    pageNumber,
    currentPage,
    setCurrentPage,
    } = usePagination(filteredWarehouses, 5);//Hook para recibir data

//----------------CICLO DE VIDA-------------------

    useIonViewWillEnter(() => {
        loadWarehouses()
    },[]);

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
        <div className="container mt-4 table-responsive action-column">

          <SearchBar 
          search = {search}
          setSearch={setSearch}
          placeholder="Buscar cliente"
          />
          
          <h2>Tabla de almacenes</h2>

          <IonButton routerLink= "/add-warehouse/">
            Añadir almacén 
            <IonIcon
              icon={addCircle}
              slot="start"
              style={{ marginLeft: "0px" }}/>
          </IonButton>

          <br /><br />

          <table className="table table-hover align clients-table">
            <thead>

              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Ciudad</th>
                <th>Direccion</th>
                <th>Nº Productos</th>
                <th>Perfil</th>
                <th>Eliminar</th>
              </tr>

            </thead>

            <tbody>
              {currentData.map(
                (warehouse) => (
                  <tr key={warehouse.id}>
                    <td>{warehouse.id}</td>
                    <td>{warehouse.name}</td>
                    <td>{warehouse.city}</td>
                    <td>{warehouse.address}</td>
                    <td>{warehouse.products}</td>
                    <td>
                      <IonButton routerLink={`/profile-warehouse/${warehouse.id}`}>
                        Perfil
                        <IonIcon
                          icon={storefrontOutline}
                          slot="start"
                          style={{ marginLeft: "0px" }}/>
                      </IonButton>
                    </td>
                    <td>
                      <IonButton
                          fill="clear"
                          color="danger"
                          
                          onClick={() => {
                            if(warehouse.id){
                            delWarehouse(warehouse.id)}}}
                      >
                        <IonIcon
                          icon={personOutline}
                          slot="icon-only"/>
                      </IonButton>
                    </td>
                  </tr>
                )
              )}
            </tbody>

          </table>
        </div>

        <Pagination
          pageNumber={pageNumber}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
    )







}
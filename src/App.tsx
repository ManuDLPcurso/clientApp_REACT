import { Redirect, Route } from "react-router-dom"
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

/*Importar Bootstrap*/
import "bootstrap/dist/css/bootstrap.min.css";
import ClientsPage from "./pages/Clients/ClientsPage";
import AddPage from "./pages/Clients/AddClientPage";
import EditClientPage from "./pages/Clients/EditClientPage";
import LoginPage from "./pages/Login/LoginPage";
import ProtectedRoute2 from "./components/ProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import WarehousePage from "./pages/Warehouses/WarehousePage";
import AddWarehousePage from "./pages/Warehouses/AddWarehousePage";
import EditWarehousePage from "./pages/Warehouses/EditWarehousePage";
import WarehouseProfilePage from "./pages/Warehouses/WarehouseProfilePage";
import ClientProfilePage from "./pages/Clients/ClientProfilePage";
import UpdateWarehousePage from "./pages/Warehouses/EditWarehousePage";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>

        <Route exact path="/clients">
          <ClientsPage />
        </Route>

        <Route exact path="/warehouse">
          <WarehousePage />
        </Route>

        <Route exact path="/add-warehouse">
          <AddWarehousePage />
        </Route>

        <Route exact path="/edit-warehouse/:id" component={UpdateWarehousePage}/>
          <EditWarehousePage />

        <Route exact path="/profile-warehouse/:id" component={WarehouseProfilePage}/>
          <WarehouseProfilePage />  

        <Route exact path="/profile-client/:id" component={ClientProfilePage}/>
          <ClientProfilePage />    

        <Route exact path="/add-client">
          <AddPage />
        </Route> 

        <Route exact path="/login" component={LoginPage}/>
          <LoginPage />

        <Route exact path="/edit-client/:id" component={EditClientPage}/>
          <EditClientPage />

        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { AuthService } from "../services/AuthService";
import './Clientes.css'

export default function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await AuthService.login(email, password);
      history.push("/clients");
    } catch {
      alert("Credenciales incorrectas");
    }
  };
  return (
    <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Mi empresa</IonTitle>
              <IonButtons>
                <IonButton routerLink="/home">Home</IonButton>
                <IonButton routerLink="/clients">Clientes</IonButton>
                <IonButton routerLink="/add">Añadir Clientes</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="container mt-4 card">
              <br />
              <h2>Login</h2>
              <br />
              <input
                className="form-control mb-3"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="form-control mb-3"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button className="btn btn-primary" onClick={login}>
                Login
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

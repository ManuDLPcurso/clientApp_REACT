import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonInput } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { login } from "../../services/AuthService";



export default function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* const login = async () => {
    try {
      await AuthService.login(email, password);
      history.push("/clients");
    } catch {
      alert("Credenciales incorrectas");
    }
    }; */

    async function loginPage(){
      const tokenhash = await login(email,password)
      console.log(tokenhash)
      localStorage.setItem("id",tokenhash.token);
    }
    




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
              <IonInput
                className="form-control mb-3"
                placeholder="Email"
                onIonInput={(e) => setEmail(e.detail.value ?? "")}
              />
              <IonInput
                className="form-control mb-3"
                placeholder="Password"
                type="password"
                onIonInput={(e) => setPassword(e.detail.value ?? "")}
              />
              <br />
               <button className="btn btn-primary" onClick={loginPage}>
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

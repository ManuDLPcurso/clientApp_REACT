import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';




const Home: React.FC = () => {
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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;

import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonToggle
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import './AccountView.scss';
  
  const Page: React.FC = () => {
    const { name } = useParams<{ name: string; }>();

    return (
      <IonContent className="page-account">

        <IonGrid class="block-notifications ion-padding-top">

          <IonRow className="ion-align-items-center">
            <IonCol>
              <IonText>Nouveau commentaire</IonText>
            </IonCol>
            <IonCol size="auto">
              <IonToggle color="primary" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</IonText>
            </IonCol>
          </IonRow>
          <hr />
          <IonRow className="ion-align-items-center">
            <IonCol>
              <IonText>Nouveau like</IonText>
            </IonCol>
            <IonCol size="auto">
              <IonToggle color="primary" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</IonText>
            </IonCol>
          </IonRow>
          <hr />
          <IonRow className="ion-align-items-center">
            <IonCol>
              <IonText>Post utile sur SOS</IonText>
            </IonCol>
            <IonCol size="auto">
              <IonToggle color="primary" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</IonText>
            </IonCol>
          </IonRow>
          <hr />
          <IonRow className="ion-align-items-center">
            <IonCol>
              <IonText>Erreur sur vidéo</IonText>
            </IonCol>
            <IonCol size="auto">
              <IonToggle color="primary" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</IonText>
            </IonCol>
          </IonRow>

        </IonGrid>
        
      </IonContent>
    );
  };
  
  export default Page;
  
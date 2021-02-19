import {IonList, IonContent, IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import React from 'react';
import { add } from 'ionicons/icons';
import { useParams } from 'react-router';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string; }>();

  return (
    <IonContent>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">SOS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
          {/*-- List of Text Items --*/}
      <IonList>
        <IonItem>
          <IonLabel>Pokémon Yellow</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Mega Man X</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>The Legend of Zelda</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Pac-Man</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Super Mario World</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export default Page;

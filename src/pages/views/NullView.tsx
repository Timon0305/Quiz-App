import {IonContent, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import React from 'react';

const Page: React.FC = () => {

  return (
  <IonContent>
    <IonHeader collapse="condense">
      <IonToolbar>
        <IonTitle size="large">404</IonTitle>
      </IonToolbar>
    </IonHeader>
  </IonContent>
  );
};

export default Page;

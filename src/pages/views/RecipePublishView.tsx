import {
  IonContent,
  IonCard,
  IonIcon,
  IonGrid,
  IonCol,
  IonRow,
  IonRouterLink,
  IonText,
  IonButton,
  IonItem,
  IonLabel,
  IonToggle,
  IonInput,
  IonTextarea
} from '@ionic/react';
import React, { useState } from 'react';
import {
  cameraOutline,
} from 'ionicons/icons';
import { useParams } from 'react-router';
import './PublishView.scss';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string; }>();

  const [text, setText] = useState<string>();
  const [number, setNumber] = useState<number>();

  return (
    <IonContent className="page-publish page-footer">

      <IonGrid>

        <IonRow>
          <IonCol>
            <IonButton color="medium" expand="block" fill="outline" size="small">Pâtisserie</IonButton>
          </IonCol>
          <IonCol>
            <IonButton color="medium" expand="block" fill="outline" size="small">Boulangerie</IonButton>
          </IonCol>
        </IonRow>

        <IonRow className="ion-align-items-center">
          <IonCol size="auto">
            <IonToggle color="primary" />
          </IonCol>
          <IonCol>
            <IonText className="text-md color-medium">Rendre la recette visible seulement par moi</IonText>
          </IonCol>
        </IonRow>

        <IonRow className="form ion-padding-top">
          <IonCol>
            <IonItem>
              <IonLabel position="floating" color="medium">
                Donnez un titre à votre recette <IonText className="text-xs">(30 caractères restants)</IonText>
              </IonLabel>
              <IonInput/>
            </IonItem>
            <br />
            <IonItem>
              <IonLabel position="floating" color="medium">
                Décrivez ici votre recette <IonText className="text-xs">(150 caractères restants)</IonText>
              </IonLabel>
              <IonTextarea/>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol class="items-overflow">
            <IonCard>
              <div className="block-import">
                <IonIcon color="medium" size="large" icon={cameraOutline}/>
                <IonText class="text-sm color-medium">Importer une photo</IonText>
              </div>
            </IonCard>
            <IonCard>
              <div className="block-import">
                <IonIcon color="medium" size="large" icon={cameraOutline}/>
                <IonText class="text-sm color-medium">Importer une photo</IonText>
              </div>
            </IonCard>
            <IonCard>
              <div className="block-import">
                <IonIcon color="medium" size="large" icon={cameraOutline}/>
                <IonText class="text-sm color-medium">Importer une photo</IonText>
              </div>
            </IonCard>
            <IonCard>
              <div className="block-import">
                <IonIcon color="medium" size="large" icon={cameraOutline}/>
                <IonText class="text-sm color-medium">Importer une photo</IonText>
              </div>
            </IonCard>
          </IonCol>
        </IonRow>

      </IonGrid>

      <div className="footer-sticky ion-text-center">
        <IonRouterLink href="">Partager</IonRouterLink>
      </div>

    </IonContent>
  );
};

export default Page;

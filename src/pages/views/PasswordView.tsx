import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonRouterLink,
  IonButton,
  IonToast,
  IonText,
  IonIcon
} from '@ionic/react';
import {
  informationCircleOutline
} from 'ionicons/icons';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import './AccountView.scss';
import { Auth } from 'aws-amplify';

  const Page: React.FC = () => {
    const { name } = useParams<{ name: string; }>();
    const [oldPass, setOldPass] = useState<string>("");
    const [newPass, setNewPass] = useState<string>("");
    const [newPassConfirm, setNewPassConfirm] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [showToast, setShowToast] = useState(false);


    function changePassword() {
      if (newPass != newPassConfirm) {
        setMessage("Le nouveau mot de passe et sa confirmation ne correspondent pas.");
        setColor("warning");
        setShowToast(true);
        return
      }
      Auth.currentAuthenticatedUser()
        .then(user => {
            return Auth.changePassword(user, oldPass, newPass);
        })
        .then(data => {setMessage("Votre mot de passe est modifié.");setColor("success");setShowToast(true);setOldPass("");setNewPassConfirm("");setNewPass("");})
        .catch(err => {setMessage("Une erreur s'est produite, veuillez vérifier votre mot de passe.");setColor("warning");setShowToast(true);});
    }

    return (
      <IonContent className="page-footer">
        <IonGrid>
          <IonRow className="form">
            <IonCol>
              <IonItem>
                <IonLabel position="floating" color="medium">Ancien mot de passe</IonLabel>
                <IonInput type="password" value={oldPass} onIonChange={e => setOldPass(e.detail.value!)}/>
              </IonItem>
              <IonItem>
                <IonLabel position="floating" color="medium">Saisissez votre nouveau mot de passe</IonLabel>
                <IonInput type="password" value={newPass} onIonChange={e => setNewPass(e.detail.value!)}/>
              </IonItem>
              <IonItem>
                <IonLabel position="floating" color="medium">Confirmez votre nouveau mot de passe</IonLabel>
                <IonInput type="password" value={newPassConfirm} onIonChange={e => setNewPassConfirm(e.detail.value!)}/>
              </IonItem>
            </IonCol>
          </IonRow>

          <div className="ion-padding">
            <IonIcon className="icon-text" icon={informationCircleOutline} />
            <IonText className="text-md">Votre mot de passe doit au minimum comporter 8 lettres et une majuscule.</IonText>
          </div>

        </IonGrid>

        <div className="footer-sticky footer-buttons active ion-text-center">
          <IonButton color="light" expand="full" onClick={e => changePassword()}>Valider</IonButton>
        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={message}
          position="top"
          color={color}
          duration={5000}
          buttons={[
            {
              icon: 'close',
              role: 'cancel',
              handler: () => {
              }
            }
          ]}
        />
      </IonContent>
    );
  };

  export default Page;

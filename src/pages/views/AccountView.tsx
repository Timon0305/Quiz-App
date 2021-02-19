import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonImg,
  IonText,
  IonList,
  IonItem,
  IonAvatar
} from '@ionic/react';
import {
  personOutline,
  lockClosedOutline,
  createOutline,
  starOutline,
  heartOutline,
  documentOutline,
  powerOutline,
  chevronForwardOutline
} from 'ionicons/icons';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import './AccountView.scss';
import { useStore } from 'react-redux';
import {Md5} from "md5-typescript";
/* AWS amplify */
import { AmplifySignOut, AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

  const Page: React.FC = () => {
    const { name } = useParams<{ name: string; }>();
    const state = useStore().getState();
    const gravatar = "https://gravatar.com/avatar/" + Md5.init(state.email);

    function logout() {

      Auth.currentAuthenticatedUser()
        .then(user => {
            Auth.signOut({"global": true})
        }).catch(err => {})
    }

    return (
      <IonContent className="page-account">

        <IonImg src="assets/tmp/account.jpg" />

        {/* <IonRow className="block-avatar ion-justify-content-center"> */}
          {/* <IonCol class="avatar ion-no-padding" size="auto"> */}

            {/* <IonAvatar>
              <IonImg src={gravatar} />
            </IonAvatar> */}
            {/* <div className="add-avatar">
              <div>
                <IonIcon icon={addOutline} />
              </div>
            </div> */}
          {/* </IonCol> */}
        {/* </IonRow> */}

        <div className="user-name ion-text-center">
          <IonText className="text-xxl">{state.name} {state.family_name}</IonText>
        </div>

        <IonGrid>
          <IonList className="account-links" lines="full">

            <IonItem href="/page/Infos" detail={false}>
              <IonRow>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={personOutline} />
                </IonCol>
                <IonCol>
                  <IonText className="text-md">
                    <b>Mes infos</b>
                  </IonText>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={chevronForwardOutline} />
                </IonCol>
              </IonRow>
            </IonItem>

            <IonItem href="/page/Password" detail={false}>
              <IonRow>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={lockClosedOutline} />
                </IonCol>
                <IonCol>
                  <IonText className="text-md">
                    <b>Modifier mon mot de passe</b>
                  </IonText>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={chevronForwardOutline} />
                </IonCol>
              </IonRow>
            </IonItem>

            <IonItem href="/page/Premium" detail={false}>
              <IonRow>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={starOutline} />
                </IonCol>
                <IonCol>
                  <IonText className="text-md">
                    <b>Premium</b>
                  </IonText>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={chevronForwardOutline} />
                </IonCol>
              </IonRow>
            </IonItem>

            {/* <IonItem>
              <IonRow>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={createOutline} />
                </IonCol>
                <IonCol>
                  <IonText className="text-md">
                    <b>Carnet de recettes</b>
                  </IonText>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={chevronForwardOutline} />
                </IonCol>
              </IonRow>
            </IonItem> */}

            {/* <IonItem>
              <IonRow>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={starOutline} />
                </IonCol>
                <IonCol>
                  <IonText className="text-md">
                    <b>Mon abonnement</b>
                  </IonText>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={chevronForwardOutline} />
                </IonCol>
              </IonRow>
            </IonItem> */}

            {/* <IonItem href="/page/Notifications" detail={false}>
              <IonRow>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={heartOutline} />
                </IonCol>
                <IonCol>
                  <IonText className="text-md">
                    <b>Gestion des notifications</b>
                  </IonText>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={chevronForwardOutline} />
                </IonCol>
              </IonRow>
            </IonItem> */}

            <IonItem href="/page/Cgurgpd" detail={false}>
              <IonRow>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={documentOutline} />
                </IonCol>
                <IonCol>
                  <IonText className="text-md">
                    <b>Conditions générales d'utilisation et RGPD</b>
                  </IonText>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={chevronForwardOutline} />
                </IonCol>
              </IonRow>
            </IonItem>

            <IonItem detail={false} onClick={e => {logout();}}>
              <IonRow>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={powerOutline} />
                </IonCol>
                <IonCol>
                  <IonText className="text-md">
                    <b>Se déconnecter</b>
                  </IonText>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={chevronForwardOutline} />
                </IonCol>
              </IonRow>
            </IonItem>
          </IonList>
        </IonGrid>

      </IonContent>
    );
  };

  export default Page;

import {
  IonContent
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
/* AWS amplify */
import { AmplifySignOut, AmplifyAuthenticator } from '@aws-amplify/ui-react';

    const Page: React.FC = () => {
      const { name } = useParams<{ name: string; }>();

      return (
        <IonContent class="page-help">
          <AmplifyAuthenticator>
            <AmplifySignOut/>
          </AmplifyAuthenticator>
        </IonContent>
      );
    };

    export default Page;

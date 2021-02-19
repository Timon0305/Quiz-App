import {
    IonContent,
    IonGrid,
    IonLabel,
    IonSegment,
    IonSegmentButton,
  } from '@ionic/react';
  import React, { useState } from 'react';
  import { useParams } from 'react-router';
  import './AboutView.scss';
  import Cgu from './Cgu';
  import Rgpd from './Rgpd';
    
    const Page: React.FC = () => {
      const { name } = useParams<{ name: string; }>();
  
      const [tab, setTab] = useState<string>("cgu");
      let tabElements =[];
      if (tab === 'cgu') {
        tabElements.push(<Cgu></Cgu>)
      }
      if (tab === 'rgpd') {
        tabElements.push(<Rgpd></Rgpd>)
      }
  
      return (
        <IonContent className="page-about">
  
          <IonGrid>
  
            <div className="ion-padding-horizontal">
              <IonSegment onIonChange={e => setTab(e.detail.value!)}  value={tab}>
                <IonSegmentButton value="cgu">
                  <IonLabel>CGU</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="rgpd">
                  <IonLabel>RGPD</IonLabel>
                </IonSegmentButton>
              </IonSegment>
  
              <div className="ion-padding-top">{tabElements}</div>
            </div>
  
          </IonGrid>
  
        </IonContent>
      );
    };
    
    export default Page;
    
  
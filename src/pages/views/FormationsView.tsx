import {
  IonContent,
  IonRow,
  IonCol,
  IonIcon,
  IonList,
  IonItem,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonText,
  IonGrid,
  IonRouterLink, IonLoading
} from '@ionic/react';
import {
  chevronDownCircle,
  timeOutline,
  chevronDownOutline,
} from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import axios from 'axios';
import VideoCarroussel from '../../components/VideoCarroussel'


const Page: React.FC = () => {
  const state = useStore().getState();

  let endpoint = state.endpoint;
  interface StringMap { [key: string]: []; }
  let chier:StringMap = {};
  let [promiseResolved, setPromiseResolved] = React.useState(false);
  let [vidByTheme, setVidByTheme] = React.useState(chier);
  let [countToDisplay, setCountToDisplay] = React.useState<number>(10);
  let [countTotal, setCountTotal] = React.useState<number>(1);


  endpoint += '/listVideoFree';

  useEffect(() => {
    if (promiseResolved) {
      return;
    }
    setPromiseResolved(true);
    axios({
        method: 'get',
        url: endpoint,
        headers: { 'x-api-key': state.apiKey }
    }).then(response => {
      let vidthemes:any = {};
      let urls:any = [];

      for (let vid of response.data) {
          if (urls[vid['thumb_url'] + vid.section]) {
            continue
          }
          urls[vid['thumb_url'] + vid.section] = true;
          if (vidthemes[vid.section] == undefined) {
            vidthemes[vid.section] = [];
          }
        vidthemes[vid.section].push(vid);
      }
      setVidByTheme(vidthemes);
      setCountTotal(response.data.length);

      return vidByTheme;
    })
  });

  let themes = [];
  if (promiseResolved) {
    let i = 0;
    for (let theme in vidByTheme) {
      if (i >= countToDisplay) {
        break;
      }
      const videlmt = vidByTheme[theme];
      themes.push(<VideoCarroussel videos={videlmt} key={theme} theme={theme}/>)
      i++
    }
  }

  return (
    <IonContent class="page-videos page-footer" scrollEvents={true} onIonScrollEnd={e => {setCountToDisplay(countToDisplay + 10)}}>

      <IonGrid>

        <IonRow class="block-intro ion-align-items-center">
          <IonCol size="auto">
            <IonIcon color="primary" icon={chevronDownCircle}/>
          </IonCol>
          <IonCol>
            <IonText className="text-md">
              Vous pouvez consulter plus de 200 vidéos d’apprentissage sur la boulangerie et patisserie.
            </IonText>
          </IonCol>
        </IonRow>

        <div className="video-resume">
          <h5>Découvrez votre vidéo gratuite</h5>
          <IonCard>
            <IonCardHeader>
              <video width="100%" controls>
                <source src="https://d350irnxbw74cr.cloudfront.net/test.mp4" type="video/mp4"/>
              </video>
            </IonCardHeader>
            <IonCardContent>
              La pâte à choux
              <IonRow className="ion-align-items-center video-time">
                <IonCol class="no-padding-left" size="auto">
                  <IonIcon color="medium" icon={timeOutline}/>
                </IonCol>
                <IonCol class="no-padding-left">
                  <IonText color="medium">1:02</IonText>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
        </div>

      </IonGrid>

      <IonRow>
        <IonCol class="ion-padding-horizontal"/>
      </IonRow>

      <IonList className="list-videos" lines="full">
        <IonLoading
          isOpen={!(countTotal > 1)}
          message={'Chargement en cours...'}
          spinner='crescent'
        />
        {themes}
      </IonList>

      <div className="footer-sticky active ion-text-center">
        <IonRouterLink color="light" href="/page/Premium">Devenir Premium</IonRouterLink>
      </div>

    </IonContent>
  );
};

export default Page;

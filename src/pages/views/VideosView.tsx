import {
  IonContent,
  IonRow,
  IonCol,
  IonChip,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonProgressBar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonText,
  IonGrid,
  IonLoading,
  IonItem,
  IonRouterLink,
} from '@ionic/react';
import {
  checkmarkCircle,
  cart,
  timeOutline,
} from 'ionicons/icons';
import React, { useEffect } from 'react';
import './VideosView.scss';
import axios from 'axios';
import { useStore } from 'react-redux'
import VideoCarroussel from '../../components/VideoCarroussel'

const Page: React.FC = () => {
  const state = useStore().getState();

  let endpoint = state.endpoint;
  const endpointView = endpoint + "/handlevideoview" + "?user_aws_id=" + state.aws_id;
  if (!state.premium.boulangerie && !state.premium.patisserie) {
    // L'utilisateur n'a pas d'accés donc on utilise l'api free
    endpoint += '/listVideoFree'
  } else {
    endpoint += '/handleVideoObject?boulangerie=' + state.premium.boulangerie + '&patisserie=' + state.premium.patisserie + "&user_aws_id=" + state.aws_id
  }
  interface StringMap { [key: string]: []; }
  let chier:StringMap = {};
  let [promiseResolved, setPromiseResolved] = React.useState(false);
  let [vidByTheme, setVidByTheme] = React.useState(chier);
  let [countToDisplay, setCountToDisplay] = React.useState<number>(10);
  let [countViewed, setCountViewed] = React.useState<number>(0);
  let [countTotal, setCountTotal] = React.useState<number>(1);
  let [resumeVid, setResumeVid] = React.useState<any>();

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
      let viewed = 0;
      let lastVid;
      let urls:any = [];
      let total = 0;
      for (let vid of response.data) {
        if (urls[vid['thumb_url'] + vid.section]) {
          continue
        }
        urls[vid['thumb_url'] + vid.section] = true;
        total++;
        if (vidthemes[vid.section] == undefined) {
          vidthemes[vid.section] = [];
        }
        if (vid["user_aws_id"]) {
          viewed++;
        }
        if (!lastVid || (!lastVid['on'] && vid['on']) || Date.parse(lastVid['on']) < Date.parse(vid['on'])) {
          lastVid = vid;
        }


        vidthemes[vid.section].push(vid);
      }
      setVidByTheme(vidthemes);
      setCountViewed(viewed);
      setCountTotal(total);
      setResumeVid(lastVid);

      return vidByTheme;
    })
  });

  const percentView = (countViewed / countTotal);
  let themes = [];
  let resume = <span/>
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
    if (resumeVid) {
        resume = <div className="video-resume">
        <h5>Reprendre</h5>
        <IonCard>
          <IonCardHeader>
            <video width="100%" poster={resumeVid.thumb_url} controls controlsList="nodownload">
              <source src={resumeVid.video_url} type="video/mp4"/>
            </video>
          </IonCardHeader>
          <IonCardContent>
            <b>{resumeVid.title}</b>
            <IonRow className="ion-align-items-center video-time">
              <IonCol class="no-padding-left" size="auto">
                <IonIcon color="medium" icon={timeOutline}/>
              </IonCol>
              <IonCol class="no-padding-left">
                <IonText className="text-md" color="medium">
                  {Math.floor(parseInt(resumeVid.duration) / 60)}:{String(parseInt(resumeVid.duration) % 60).padStart(2, '0')}
                </IonText>
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
      </div>
    }
  }

  function getChip(props:any) {
    if (props.hasAccess) {
      return <IonChip>
        <IonIcon color="success" icon={checkmarkCircle}/>
        <IonLabel>{props.text}</IonLabel>
      </IonChip>;
    }
    return <IonRouterLink  routerLink="/page/Premium"><IonChip>
    <IonIcon color="primary" icon={cart}/>
    <IonLabel>Passer au pack premium</IonLabel>
  </IonChip></IonRouterLink>;
  }
  const boulangerieChip = getChip({"hasAccess": state.premium.boulangerie, "text":"Boulangerie"});
  const patisserieChip = getChip({"hasAccess": state.premium.patisserie, "text":"Pâtisserie"});
  return (
    <IonContent class="page-videos" scrollEvents={true} onIonScrollEnd={e => {setCountToDisplay(countToDisplay + 10)}}>
      <IonGrid>
        <div className="block-chips">
          {boulangerieChip}
          {patisserieChip}
        </div>

        <IonRow className="total-progress">
          <IonCol>
            <IonList>
              <IonListHeader>
                <IonLabel className="text-sm">
                  <b>Vous avez consulté {Math.ceil(percentView * 100)}% du contenu vidéo</b>
                </IonLabel>
              </IonListHeader>
              <IonProgressBar color="success" value={percentView}/>
            </IonList>
          </IonCol>
        </IonRow>
        {resume}
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

    </IonContent>
  );
};

export default Page;

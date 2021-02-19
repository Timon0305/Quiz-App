import {
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonText,
    IonLoading,
    IonImg,
    setupConfig,
} from '@ionic/react';
import {
    timeOutline, returnUpBackOutline, play,
} from 'ionicons/icons';
import React, {useEffect} from 'react';
import {useParams} from 'react-router';
import {useStore} from 'react-redux';
import axios from 'axios';

setupConfig({
    swipeBackEnabled: false,// also prevent swiping back on either platform
    hardwareBackButton: false// this is what you need (android only)
});
const Page: React.FC = () => {
    const {id} = useParams<{ id: string; }>();
    const state = useStore().getState();

    interface StringMap {
        [key: string]: string;
    }

    interface StringStringMap {
        [key: number]: StringMap;
    }

    let chier: StringMap = {};
    let chierMax: StringStringMap = {};
    let [vid, setVid] = React.useState(chier);
    let [relatedVids, setRelatedVids] = React.useState(chierMax);
    let [promiseResolved, setPromiseResolved] = React.useState(false);

    let endpoint = state.endpoint;
    let endpointView = endpoint + "/handlevideoview";
    endpoint += '/handleVideoObject?id=' + id;

    useEffect(() => {
        if (promiseResolved) {
            return;
        }
        axios({
            method: 'get',
            url: endpoint,
            headers: {'x-api-key': state.apiKey}
        }).then(response => {
            setPromiseResolved(true);
            setVid(response.data[0]);
            response.data.shift();
            setRelatedVids(response.data)
        })
            .then(r => {
                axios({
                    method: 'post',
                    url: endpointView,
                    data: {
                        "video_id": id,
                        "user_aws_id": state.aws_id
                    },
                    headers: {'x-api-key': state.apiKey}
                }).catch(e => {
                })
            })
    });
    let video = <span>loading</span>;
    let related = [];
    let relvid: StringMap = {};
    let minutes = 0;
    let seconds = "00";
    const playerUrl = "/video/Video/";

    if (promiseResolved) {
        minutes = Math.floor(parseInt(vid.duration) / 60);
        seconds = String(parseInt(vid.duration) % 60).padStart(2, '0');
        video = <video width="100%" poster={vid.thumb_url} autoPlay={false} controls controlsList="nodownload">
            <source src={vid.video_url} type="video/mp4"/>
        </video>;
        for (let vididx in relatedVids) {
            relvid = relatedVids[vididx];
            let mins = Math.floor(parseInt(relvid.duration) / 60);
            let secs = String(parseInt(relvid.duration) % 60).padStart(2, '0');
            related.push(<IonCard href={playerUrl + relvid.id} key={relvid.id}>
                <IonRow>
                    <IonCol class="card-overlay ion-no-padding">
                        <IonImg src={relvid.thumb_url}/>
                        <IonRow>
                            <IonCol class="ion-no-padding">
                                <IonIcon icon={play}/>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
                <IonCardContent>
                    <b>{relvid.title}</b>
                    <IonRow className="ion-align-items-center video-time">
                        <IonCol class="no-padding-left" size="auto">
                            <IonIcon color="medium" icon={timeOutline}/>
                        </IonCol>
                        <IonCol class="no-padding-left">
                            <IonText className="text-md" color="medium">{mins}:{secs}</IonText>
                        </IonCol>
                    </IonRow>
                </IonCardContent>
            </IonCard>)
        }

    }

    return (
        <IonContent class="page-videos">
            <IonLoading
                isOpen={!promiseResolved}
                message={'Chargement en cours...'}
                spinner='crescent'
            />
            <div className="block-video">
                {video}
                <IonGrid>
                    <b>{vid.title}</b>
                    <IonRow className="ion-align-items-center video-time">
                        <IonCol class="no-padding-left" size="auto">
                            <IonIcon color="medium" icon={timeOutline}/>
                        </IonCol>
                        <IonCol class="no-padding-left">
                            <IonText className="text-md" color="medium">{minutes}:{seconds}</IonText>
                        </IonCol>
                    </IonRow>

                </IonGrid>
            </div>

            <div className="video-resume">
                <h5>Les dérivées</h5>
                <IonGrid class="items-overflow">
                    <IonCol>
                        {related}
                    </IonCol>
                </IonGrid>
            </div>
        </IonContent>
    );
};

export default Page;

import {
    IonContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonAvatar,
    IonRouterLink,
    IonText,
    IonBadge,
    IonToast,
} from '@ionic/react';
import {
    chevronForwardOutline,
    videocamOutline,
    helpCircleOutline
} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import './HomeView.scss';
import {useStore} from 'react-redux';
import axios from 'axios';


const Page: React.FC = () => {
    const {name} = useParams<{ name: string; }>();
    const state = useStore().getState();

    interface StringMap {
        [key: string]: [];
    }

    let chier: StringMap = {};
    let [promiseResolved, setPromiseResolved] = React.useState(false);
    let [vidByTheme, setVidByTheme] = React.useState(chier);
    let videoCount = 0;
    let vids = [];
    let videoListUrl;
    let endpoint = state.endpoint;
    const [showToast, setShowToast] = useState(false);

    if (!state.premium.boulangerie && !state.premium.patisserie) {
        // L'utilisateur n'a pas d'accés donc on utilise l'api free
        endpoint += '/listVideoFree';
        videoListUrl = "/Page/Formations"
    } else {
        endpoint += '/handleVideoObject?boulangerie=' + state.premium.boulangerie + '&patisserie=' + state.premium.patisserie + "&user_aws_id=" + state.aws_id
        videoListUrl = "/Page/Videos"
    }

    useEffect(() => {
        if (promiseResolved) {
            return;
        }
        axios({
            method: 'get',
            url: endpoint,
            headers: {'x-api-key': state.apiKey}
        }).then(response => {
            let vidthemes: any = {};
            let urls: any = [];

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
            setPromiseResolved(true);
            setVidByTheme(vidthemes);

            return vidByTheme;
        })
    });
    if (promiseResolved) {
        for (let theme in vidByTheme) {
            const videlmt: any = vidByTheme[theme];
            const vid = videlmt[0];
            videoCount += Object.keys(videlmt).length;
            if (vid) {
                const url = vid.thumb_url;
                const title = vid.title;
                vids.push(<IonCard key={theme} href={videoListUrl}>
                    <IonImg src={url}/>
                    <IonCardHeader>
                        <IonCardSubtitle>{theme} : {title}</IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>)
            }
        }
    }
    let welcomeMsg = <IonCol class="slider ion-text-center">
        <IonButton size="small" href="/page/Premium">Voir les packs Formaceo Premium</IonButton>
        <IonRow class="ion-justify-content-center">
            <IonCol size="9">
                <hr color="white"/>
            </IonCol>
        </IonRow>
        <IonRouterLink color="light" href="/page/Premium">
            Entrer un code de formation
            <IonIcon icon={chevronForwardOutline}/>
        </IonRouterLink>
    </IonCol>;

    if (state.premium.boulangerie || state.premium.patisserie) {
        welcomeMsg = <IonCol class="slider ion-text-center">
            <IonImg className="logo" src="assets/tmp/logo-only.svg"/>
            <IonText class="title-formaceo ion-text-uppercase" color="primary">Formaceo</IonText>
            <IonRow class="ion-justify-content-center">
                <IonCol size="auto">
                    <IonImg class="waving-hand" src="assets/tmp/waving_hand.svg"/>
                </IonCol>
                <IonCol size="auto">
                    <IonText class="text-welcome">Content de vous revoir {state.name} !</IonText>
                </IonCol>
            </IonRow>
        </IonCol>
    }

    return (
        <IonContent class="page-home">
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Soyez patient ! Contenu bientôt disponible"
                position="top"
                color="success"
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

            <IonRow>
                {welcomeMsg}
            </IonRow>

            <IonGrid>

                <IonRow class="ion-align-items-center">
                    <IonCol>
                        <h5>Module vidéos</h5>
                        <IonRow class="ion-align-items-center title-details">
                            <IonCol size="auto">
                                <IonIcon icon={videocamOutline}/>
                            </IonCol>
                            <IonCol class="no-padding-left">
                                <div className="text-sm">{videoCount} vidéos disponibles</div>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="auto">
                        <IonButton color="light" size="small" href={videoListUrl}>Tout voir</IonButton>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol class="items-overflow">
                        {vids}
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol class="ion-padding-horizontal"/>
                </IonRow>

                <IonRow class="ion-align-items-center" onClick={e => {
                    setShowToast(true)
                }}>
                    <IonCol size="auto">
                        <h5>Quiz de formations</h5>
                    </IonCol>
                    <IonCol>
                        <IonBadge className="outline medium ion-text-uppercase" color="medium">Bientôt
                            disponible</IonBadge>
                    </IonCol>
                </IonRow>

                <IonRow onClick={e => {
                    setShowToast(true)
                }}>
                    <IonCol class="items-overflow">
                        <IonCard>
                            <IonImg src="assets/tmp/quiz-environnement.jpg"/>
                            <IonCardHeader>
                                <IonCardSubtitle>Formaceo</IonCardSubtitle>
                                <IonCardSubtitle className="text-md">Environnement de travail</IonCardSubtitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonImg src="assets/tmp/quiz-levure.jpg"/>
                            <IonCardHeader>
                                <IonCardSubtitle>Formaceo</IonCardSubtitle>
                                <IonCardSubtitle className="text-md">La levure et la poudre à lever</IonCardSubtitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonImg src="assets/tmp/quiz-hygiene.jpg"/>
                            <IonCardHeader>
                                <IonCardSubtitle>Formaceo</IonCardSubtitle>
                                <IonCardSubtitle className="text-md">Hygiène élémentaire</IonCardSubtitle>
                            </IonCardHeader>
                        </IonCard>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol class="ion-padding-horizontal"/>
                </IonRow>

                <IonRow class="ion-align-items-center" onClick={e => {
                    setShowToast(true)
                }}>
                    <IonCol size="auto">
                        <h5>Recettes favorites</h5>
                    </IonCol>
                    <IonCol>
                        <IonBadge className="outline medium ion-text-uppercase" color="medium">Bientôt
                            disponible</IonBadge>
                    </IonCol>
                </IonRow>

                <IonRow onClick={e => {
                    setShowToast(true)
                }}>
                    <IonCol class="items-overflow">
                        <IonCard>
                            <IonImg src="assets/tmp/recettes-pate.jpg"/>
                            <IonCardHeader>
                                <IonCardSubtitle>Augustin Martinet</IonCardSubtitle>
                                <IonCardSubtitle className="text-md">Pâte à choux légère</IonCardSubtitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonImg src="assets/tmp/recettes-fraisier.jpg"/>
                            <IonCardHeader>
                                <IonCardSubtitle>Philippe Prévost</IonCardSubtitle>
                                <IonCardSubtitle className="text-md">Fraisier simple à faire</IonCardSubtitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonImg src="assets/tmp/recettes-bourdaloue.jpg"/>
                            <IonCardHeader>
                                <IonCardSubtitle>Charles Hoffmann-Martinot</IonCardSubtitle>
                                <IonCardSubtitle className="text-md">Bourdaloue pour 6</IonCardSubtitle>
                            </IonCardHeader>
                        </IonCard>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol class="ion-padding-horizontal"/>
                </IonRow>

                <IonRow class="ion-align-items-center" onClick={e => {
                    setShowToast(true)
                }}>
                    <IonCol size="auto">
                        <h5>Coup de main</h5>
                    </IonCol>
                    <IonCol>
                        <IonBadge className="outline medium ion-text-uppercase" color="medium">Bientôt
                            disponible</IonBadge>
                    </IonCol>
                </IonRow>

                <IonRow class="block-sos" onClick={e => {
                    setShowToast(true)
                }}>
                    <IonCol class="items-overflow">
                        <IonCard>
                            <IonImg src="assets/tmp/aide-croissants.jpg"/>
                            <IonCardHeader>
                                <IonCardSubtitle>Benjamin Gonzalez</IonCardSubtitle>
                                <IonCardSubtitle className="text-md">Croissants brulés</IonCardSubtitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonImg src="assets/tmp/aide-eclairs.jpg"/>
                            <IonCardHeader>
                                <IonCardSubtitle>Mehdi Lakhdari</IonCardSubtitle>
                                <IonCardSubtitle className="text-md">Problème fondant éclairs</IonCardSubtitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonImg src="assets/tmp/aide-cake.jpg"/>
                            <IonCardHeader>
                                <IonCardSubtitle>Jean-François Morillon</IonCardSubtitle>
                                <IonCardSubtitle className="text-md">Cake marbré friable</IonCardSubtitle>
                            </IonCardHeader>
                        </IonCard>
                    </IonCol>
                </IonRow>

            </IonGrid>

        </IonContent>
    );
};

export default Page;

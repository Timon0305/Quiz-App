import {
    IonContent,
    IonRow,
    IonCol,
    IonIcon,
    IonList,
    IonItem,
    IonButton,
    IonCardSubtitle,
    IonProgressBar,
    IonBadge,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonText,
    IonGrid,
    IonRouterLink, IonLoading
} from '@ionic/react';
import {
    cart, checkboxOutline,
    checkmarkCircleOutline, checkmarkOutline,
    chevronDownCircle, chevronDownOutline, closeCircleOutline,
} from 'ionicons/icons';
import React, {useEffect} from 'react';
import {useStore} from 'react-redux';
import axios from 'axios';
import QuizList from '../../../components/Quiz/QuizList'
import '../QuizView.scss';

const Page: React.FC = () => {
    const state = useStore().getState();

    let endpoint = state.endpoint;

    interface StringMap {
        [key: string]: [];
    }

    let chier: StringMap = {};
    let [promiseResolved, setPromiseResolved] = React.useState(false);
    let [vidByTheme, setVidByTheme] = React.useState(chier);
    let [countToDisplay, setCountToDisplay] = React.useState<number>(10);
    let [countTotal, setCountTotal] = React.useState<number>(1);
    let videoCount = 0;
    let replay = [];
    let discover = [];
    let startQuiz = 'Page/Quiz&test';

    endpoint += '/listVideoFree';

    useEffect(() => {
        if (promiseResolved) {
            return;
        }
        setPromiseResolved(true);
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
            themes.push(<QuizList videos={videlmt} key={theme} theme={theme}/>);
            i++
        }

        for (let theme in vidByTheme) {
            const videlmt: any = vidByTheme[theme];
            const vid = videlmt[0];
            videoCount += Object.keys(videlmt).length;
            if (vid) {
                const url = vid.thumb_url;
                replay.push(
                    <IonCard key={theme} className='pointer' href={startQuiz}>
                        <IonCardHeader className='p-0'>
                            <IonImg src={url}/>
                            <div className='content4'>
                                <div className='subContent4'>
                                    <IonIcon size='large'/>
                                </div>
                            </div>
                        </IonCardHeader>
                        <IonCardContent className='pt-3'>
                            <h6 className='text-bold'>La pate a choux</h6>
                            <IonRow class="ion-align-items-center title-details">
                                <IonCol class="no-padding-left pt-0">
                                    <span>4</span>
                                    &nbsp;
                                    <span className='vertical-middle'>
                                         <IonIcon className="checkbox-outline" color="success" icon={checkboxOutline}/> &nbsp;
                                    </span>
                                    <span>2</span>
                                    &nbsp;
                                    <span className='vertical-middle'>
                                         <IonIcon className="checkbox-outline" color="danger" icon={closeCircleOutline}/> &nbsp;
                                    </span>
                                </IonCol>
                            </IonRow>
                        </IonCardContent>
                    </IonCard>)
            }

            if (vid) {
                const url = vid.thumb_url;
                discover.push(
                    <IonCard key={theme} className='pointer'>
                        <IonCardHeader className='p-0'>
                            <IonImg src={url}/>
                            <div className='content4'>
                                <div className='subContent4'>
                                    <IonIcon size='large'/>
                                </div>
                            </div>
                        </IonCardHeader>
                        <IonCardContent className='pt-3'>
                            <h6 className='text-bold'>La pate a choux</h6>
                            <IonRow class="ion-align-items-center title-details">
                                <IonCol class="no-padding-left pt-0">
                                    <div className="text-sm text-gray">{videoCount} questions</div>
                                </IonCol>
                            </IonRow>
                        </IonCardContent>
                    </IonCard>)
            }
        }
    }

    return (
        <IonContent class="page-quiz page-footer" scrollEvents={true} onIonScrollEnd={e => {
            setCountToDisplay(countToDisplay + 10)
        }}>

            <IonGrid>

                <IonRow class="block-intro ion-align-items-center mt-3">
                    <IonCol size="4">
                        <IonBadge color="medium" className='light-gray width-100 p-3 badge-round'>
                            <span className='pr-5'>
                                <IonIcon className="checkmark-circle-outline" color="success" icon={checkmarkCircleOutline}/>
                            </span>
                            <span className='font-14 text-gray'>Patisserie</span>
                        </IonBadge>
                    </IonCol>
                    <IonCol size='8'>
                        <IonBadge color="medium" className='light-gray width-100 p-3 badge-round'>
                            <span className='pr-5'>
                                <IonIcon className="cart" color="primary" icon={cart}/>
                            </span>
                            <span className='font-14 text-gray'>Passer au pack premium</span>
                        </IonBadge>
                    </IonCol>
                </IonRow>

                <div className="video-resume">
                    <div className='ml-3 mr-3'>
                        <h6 className='text-bold'>Vous avez joué à 22% des Quiz</h6>
                        <IonProgressBar className='progress-height' color='success' value={0.22}/>
                    </div>
                </div>
                <br/><br/>
                <div className='video-resume'>
                    <h5 className='text-bold'>
                        Rejouer
                    </h5>
                    <IonRow>
                        <IonCol class="items-overflow">
                            {replay}
                        </IonCol>
                    </IonRow>
                </div>

                <div className='video-resume'>
                    <h5 className='text-bold'>
                        Decouvrir
                    </h5>
                    <IonRow>
                        <IonCol class="items-overflow">
                            {discover}
                        </IonCol>
                    </IonRow>
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

        </IonContent>
    );
};

export default Page;

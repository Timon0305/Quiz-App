import {
    IonContent,
    IonRow,
    IonCol,
    IonIcon,
    IonList,
    IonItem,
    IonButton,
    IonCardSubtitle,
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
    chevronDownOutline, starOutline, helpCircleOutline,
} from 'ionicons/icons';
import React, {useEffect} from 'react';
import {useStore} from 'react-redux';
import axios from 'axios';
import QuizList from '../../components/Quiz/QuizList'
import './QuizView.scss';

const Page: React.FC = () => {
    const state = useStore().getState();

    let endpoint = state.endpoint;
    let quizData = state.quiz;

    interface StringMap {
        [key: string]: [];
    }

    let chier: StringMap = {};
    let [promiseResolved, setPromiseResolved] = React.useState(false);
    let [vidByTheme, setVidByTheme] = React.useState(chier);
    let [countToDisplay, setCountToDisplay] = React.useState<number>(10);
    let [countTotal, setCountTotal] = React.useState<number>(1);
    let videoCount = 0;
    let vids = [];
    let demo = [];
    let quizUrl = "/Page/Quiz&demo=1";

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
    }, []);

    let themes = [];
    if (promiseResolved) {
        let i = 0;
        for (let item in quizData) {
            if (!quizData[item].image) {
                quizData[item].image = '/assets/tmp/tartare.jpg'
            }
            if (i >= countToDisplay) break;
            i++;
        }
        themes.push(<QuizList quiz = {quizData} key={'1'}/>);

        for (let item in vidByTheme) {
            const demoQuiz: any = vidByTheme[item];
            const dId = demoQuiz[0];
            if (dId) {
                const url = dId.thumb_url;
                demo.push(
                    <IonCard className='pointer' key={item}>
                        <IonImg src={url}/>
                        <div className='content'>
                            <div className='subContent'>
                                <IonIcon size='large'/>
                            </div>
                        </div>
                    </IonCard>
                )
            }
        }

        for (let theme in vidByTheme) {
            const videlmt: any = vidByTheme[theme];
            const vid = videlmt[0];
            videoCount += Object.keys(videlmt).length;
            if (vid) {
                const url = vid.thumb_url;
                vids.push(
                    <IonCard key={theme}>
                        <IonCardHeader className='p-0'>
                            <IonImg src={url}/>
                            <div className='content2'>
                                <div className='subContent2'>
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

                <IonRow class="block-intro ion-align-items-center">
                    <IonCol size="auto">
                        <IonIcon color="primary" icon={chevronDownCircle}/>
                    </IonCol>
                    <IonCol>
                        <IonText className="text-md text-roboto">
                            Vous pouvez ici testez vos connaissances, lancez-vous avec le quiz proposé !
                        </IonText>
                    </IonCol>
                </IonRow>

                <div className="video-resume">
                    <h5 className='text-bold'>Découvrez votre vidéo gratuite</h5>
                    <IonCard>
                        <IonCardHeader>
                            <IonRow>
                                <IonCol>
                                    {demo[0]}
                                </IonCol>
                            </IonRow>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonRow class="ion-align-items-center">
                                <IonCol>
                                    <h4 className='text-bold font-20'>La pate a choux</h4>
                                    <IonRow class="ion-align-items-center title-details">
                                        <IonCol class="no-padding-left pt-0">
                                            <div className="text-sm text-gray">{videoCount} questions</div>
                                        </IonCol>
                                    </IonRow>
                                </IonCol>
                                <IonCol size="auto">
                                    <IonButton size="default" href={quizUrl}>Jouer</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonCardContent>
                    </IonCard>
                </div>

                <div className='video-resume'>
                    <h5 className='text-bold'>
                        Découvrez votre vidéo gratuite
                        <span className="text-sm text-gray ml-3">{videoCount} quiz</span>
                    </h5>
                    <IonRow>
                        <IonCol class="items-overflow">
                            {vids}
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

            <div className="footer-sticky active ion-text-center">
                <IonRouterLink color="light" href="/page/Premium">Devenir Premium</IonRouterLink>
            </div>

        </IonContent>
    );
};

export default Page;

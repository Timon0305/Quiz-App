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
    let quizData = state.quiz;

    let [promiseResolved, setPromiseResolved] = React.useState(false);
    let [countToDisplay, setCountToDisplay] = React.useState<number>(10);
    let [dashboard, setDashboard] = React.useState<any>();
    let [countTotal, setCountTotal] = React.useState<number>(1);
    let [quizCount, setQuizCount] = React.useState(0);
    let quizParentList = [];
    let themes = [];
    let quizUrl = "/Page/Quiz&demo=1";

    useEffect(() => {
        setPromiseResolved(true);
        setQuizCount(quizData.length);

        for (let item of quizData) {
            if (!item.image) {
                item.image = '/assets/tmp/sos.jpg'
            }
        }
        setDashboard(quizData[0]);
        setCountTotal(quizData.length);
    }, []);


    if (promiseResolved) {
        // Quiz List
        for (let theme in quizData) {
            const childData = quizData[theme];
            if (!childData.image) {
                childData.image = '/assets/tmp/sos.jpg'
            }
            quizParentList.push(
                <IonCard key={theme} className='pointer' onClick={() => setDashboard(childData)}>
                    <IonCardHeader className='p-0'>
                        <IonImg src={childData.image}/>
                        <div className='content2'>
                            <div className='subContent2'>
                                <IonIcon size='large'/>
                            </div>
                        </div>
                    </IonCardHeader>
                    <IonCardContent className='pt-3'>
                        <h6 className='text-bold'>{childData.title}</h6>
                        <IonRow class="ion-align-items-center title-details">
                            <IonCol class="no-padding-left pt-0">
                                <div className="text-sm text-gray">{childData['child_count']} questions</div>
                            </IonCol>
                        </IonRow>
                    </IonCardContent>
                </IonCard>
            )
        }

        // Quiz Sub List
        let i = 0;
        for (let item in dashboard.children) {
            let subList = dashboard.children[item];
            if (!subList.image) {
                subList.image = '/assets/tmp/tartare.jpg'
            }
            if (i >= countToDisplay) break;
            i++;
        }
        themes.push(
            <QuizList quiz = {dashboard.children} key={'1'}/>
        );
    }

    return (
        <IonContent class="page-quiz page-footer" scrollEvents={true} onIonScrollEnd={e => {
            setCountToDisplay(countToDisplay + 10)}}>
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
                                    <IonCard className='pointer'>
                                        <IonImg src={quizData[0]['image']}/>
                                        <div className='content'>
                                            <div className='subContent'>
                                                <IonIcon size='large'/>
                                            </div>
                                        </div>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonRow class="ion-align-items-center">
                                <IonCol>
                                    <h4 className='text-bold font-20'>La pate a choux</h4>
                                    <IonRow class="ion-align-items-center title-details">
                                        <IonCol class="no-padding-left pt-0">
                                            <div className="text-sm text-gray">{quizCount} questions</div>
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
                        <span className="text-sm text-gray ml-3">{quizCount} quiz</span>
                    </h5>
                    <IonRow>
                        <IonCol class="items-overflow">
                            {quizParentList}
                        </IonCol>
                    </IonRow>
                </div>

            </IonGrid>

            <IonRow>
                <IonCol class="ion-padding-horizontal"/>
            </IonRow>

            <IonList className="list-videos pointer" lines="full">
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

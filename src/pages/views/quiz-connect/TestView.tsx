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
    IonToast, IonItem, IonLabel, IonCheckbox, IonSlide,
} from '@ionic/react';
import {
    chevronForwardOutline,
    videocamOutline,
    helpCircleOutline, wine, warning, walk, heart, heartSharp, happy, happyOutline, chevronDownCircle
} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import './QuizConnect.scss';
import {useStore} from 'react-redux';
import axios from 'axios';
import {QuizResult1} from './QuizResult1';

const secondList = [
    {val: 'Brune', isChecked: false},
    {val: 'Rouge', isChecked: false},
    {val: 'Noire', isChecked: false}
];

const thirdList = [
    {val: 'Brune', isChecked: false},
    {val: 'Rouge', isChecked: false},
    {val: 'Noire', isChecked: false}
];

const Page: React.FC = () => {
    const {name} = useParams<{ name: string; }>();
    const state = useStore().getState();
    const [showToast, setShowToast] = useState(false);
    const [isFirstCheck, setIsFirstCheck] = useState(false);
    const [isSecondCheck, setIsSecondCheck] = useState(false);
    const [screen, setScreen] = useState(1);

    function queryFirst(e: any) {
        let toggledTrue = false;
        for (let item of secondList) {
            if (item.val === e) {
                item.isChecked = !item.isChecked;
                toggledTrue = item.isChecked;
                setIsFirstCheck(item.isChecked);
                break;
            }
        }
        if (toggledTrue) {
            for (let item of secondList) {
                if (item.val === e) {
                    // do nothing
                } else {
                    item.isChecked = false;
                }
            }
        }
    }


    function querySecond(e: any) {
        let toggledTrue = false;
        for (let item of thirdList) {
            if (item.val === e) {
                item.isChecked = !item.isChecked;
                toggledTrue = item.isChecked;
                setIsSecondCheck(item.isChecked);
                break;
            }
        }
        if (toggledTrue) {
            for (let item of thirdList) {
                if (item.val === e) {
                    // do nothing
                } else {
                    item.isChecked = false;
                }
            }
        }
    }


    let welcomeMsg =
        <IonCol class="slider ion-text-center"/>;

    // @ts-ignore
    let secondScreen =
        <IonCol class='test-back'>
            <IonCard className='test-card'>
                <IonCardHeader className="ion-activated p-0">
                    <IonRow class="ion-align-items-center">
                        <IonCol>
                            <IonRow class="ion-align-items-center title-details">
                                <IonCol size="auto">
                                    <span className='pr-2 vertical-middle'>
                                        <IonIcon icon={helpCircleOutline}/>
                                    </span>
                                    <span className='text-gray font-11 text-bold'>Question 1/2</span>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol size="auto">
                            <IonIcon size="small" color='warning' icon={happyOutline}/>
                            <IonIcon size="small" color='danger' icon={heartSharp}/>
                        </IonCol>
                    </IonRow>
                </IonCardHeader>

                <IonCardContent className='test-card-content ion-text-center'>
                    <IonText className='text-bold'>Quel est le nom officiel de la plante de vanille la plus répandue en
                        gastronomie ? </IonText>
                </IonCardContent>
            </IonCard>

            <IonGrid className='test-checkgroup'>
                {secondList.map(({val, isChecked}, i) => (
                    <div key={i}>
                        <br/>
                        <IonRow class="ml-3 block-intro ion-align-items-center" key={i}>
                            <IonCol size="auto">
                                <IonCheckbox checked={isChecked}
                                             color="success"
                                             class="checkbox-square"
                                             onIonChange={() => queryFirst(val)}
                                />
                            </IonCol>
                            <IonCol>
                                <IonText className="text-md text-roboto font-16 text-bold">
                                    {val}
                                </IonText>
                            </IonCol>
                        </IonRow>
                        <br/>
                    </div>
                ))}
            </IonGrid>
            {isFirstCheck ?
                <div className="footer-sticky active ion-text-center pointer">
                    <IonText color="light" onClick={() => setScreen(2)}>Valider</IonText>
                </div> :
                <div className="footer-sticky ion-text-center pointer">
                    <IonText color="primary">Valider</IonText>
                </div>
            }
        </IonCol>;

    let thirdScreen =
        <IonCol class='test-back'>
            <IonCard className='test-card'>
                <IonCardHeader className="ion-activated p-0">
                    <IonRow class="ion-align-items-center">
                        <IonCol>
                            <IonRow class="ion-align-items-center title-details">
                                <IonCol size="auto">
                                    <span className='pr-2 vertical-middle'>
                                        <IonIcon icon={helpCircleOutline}/>
                                    </span>
                                    <span className='text-gray font-11 text-bold'>Question 2/2</span>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol size="auto">
                            <IonIcon size="small" color='warning' icon={happyOutline}/>
                            <IonIcon size="small" color='danger' icon={heartSharp}/>
                        </IonCol>
                    </IonRow>
                </IonCardHeader>

                <IonCardContent className='test-card-content ion-text-center'>
                    <IonText className='text-bold'>Quelle gousse de vanille est la plus rare ?  </IonText>
                </IonCardContent>
            </IonCard>

            <IonGrid className='test-checkgroup'>
                {thirdList.map(({val, isChecked}, i) => (
                    <div key={i}>
                        <br/>
                        <IonRow class="ml-3 block-intro ion-align-items-center" key={i}>
                            <IonCol size="auto">
                                <IonCheckbox checked={isChecked}
                                             color="success"
                                             class="checkbox-square"
                                             onIonChange={() => querySecond(val)}
                                />
                            </IonCol>
                            <IonCol>
                                <IonText id={val} className="text-md text-roboto font-16 text-bold">
                                    {val}
                                </IonText>
                            </IonCol>
                        </IonRow>
                        <br/>
                    </div>
                ))}
            </IonGrid>
            {isSecondCheck ?
                <div className="footer-sticky active ion-text-center pointer">
                    <IonText color="light" onClick={() => setScreen(3)}>Terminer le quiz</IonText>
                </div> :
                <div className="footer-sticky ion-text-center pointer">
                    <IonText color="primary">Terminer le quiz</IonText>
                </div>
            }
        </IonCol>;
    return (
        <IonContent class="page-test">
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

            {screen === 1 ?
                <IonRow>
                    {secondScreen}
                </IonRow> :
                screen === 2 ?
                    <IonRow>
                        {thirdScreen}
                    </IonRow>
                    :
                    <IonRow>
                        {QuizResult1}
                    </IonRow>
            }
        </IonContent>
    );
};

export default Page;

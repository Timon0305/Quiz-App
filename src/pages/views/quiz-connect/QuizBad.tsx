import {
    IonCard,
    IonCardContent,
    IonCol,
    IonGrid,
    IonRow,
    IonText
} from "@ionic/react";
import React from "react";

export const QuizBad = <IonCol class='test-back'>
    <IonCard className='test-card'>
        <IonCardContent className='test-card-result ion-text-center'>
            <IonText className='text-bold font-20'>Trop juste !</IonText>
        </IonCardContent>
    </IonCard>

    <IonGrid className='test-checkgroup'>
        <div className="video-resume">
            <div className='ion-text-center mb-51 mt-20'>
                <p className=''>
                    <span className='pr-3 font-30'>😞</span>
                    <span className='pr-3 font-30'>🤍</span>
                    <span className='pr-3 font-30'>🤍</span>
                </p>
                <IonText className='font-14 text-bold'>
                    Perdu !
                </IonText>
                <br/><br/>
                <IonText className='font-14 text-bold'>
                    Le quiz n’est pas réussi et validé,  Retente ta chance !
                </IonText>
            </div>
        </div>
    </IonGrid>
    <div className="footer-sticky ion-text-center pointer">
        <IonRow>
            <IonCol size='6'>
                <IonText className='text-gray font-16' color="ion-text-center">Rejouer</IonText>
            </IonCol>
            <IonCol size='6'>
                <IonText color="primary ion-text-center" className='font-16'>Retour aux quiz</IonText>
            </IonCol>
        </IonRow>
    </div>
</IonCol>;

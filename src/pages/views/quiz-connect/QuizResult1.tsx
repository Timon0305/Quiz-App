import {
    IonCard,
    IonCardContent,
    IonCol,
    IonGrid,
    IonProgressBar,
    IonRow,
    IonText
} from "@ionic/react";
import React from "react";
import * as unicodeEmoji from 'unicode-emoji';

unicodeEmoji.getEmojis();
export const QuizResult1 = <IonCol class='test-back'>
    <IonCard className='test-card'>
        <IonCardContent className='test-card-result ion-text-center'>
            <IonText className='text-bold font-20'>Ressaisi-toi !</IonText>
        </IonCardContent>
    </IonCard>

    <IonGrid className='test-checkgroup'>
        <div className="video-resume">
            <div className='ml-3 mr-3 mt-3'>
                <p className='font-14'>Tu as réussi 0-15% de l’examen</p>
                <IonProgressBar className='progress-height' color='danger' value={0.15}/>
            </div>
            <div className='ion-text-center mb-51 mt-20'>
                <p className='font-45'>
                    😖
                </p>
                <IonText className='font-14 text-bold'>
                    Tu as peu ou mal travaillé, il n’est pas trop tard !
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

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

export const QuizResult2 = <IonCol class='test-back'>
    <IonCard className='test-card'>
        <IonCardContent className='test-card-result ion-text-center'>
            <IonText className='text-bold font-20'>Pas assez !</IonText>
        </IonCardContent>
    </IonCard>

    <IonGrid className='test-checkgroup'>
        <div className="video-resume">
            <div className='ml-3 mr-3 mt-3'>
                <p className='font-14'>Tu as réussi 15-30% de l’examen</p>
                <IonProgressBar className='progress-height' color='danger' value={0.3}/>
            </div>
            <div className='ion-text-center mb-51 mt-20'>
                <p className='font-45'>
                    😞
                </p>
                <IonText className='font-14 text-bold'>
                    Il va falloir redoubler d’effort !
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

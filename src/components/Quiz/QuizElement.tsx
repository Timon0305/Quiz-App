import React from 'react';
import { IonRow, IonCol, IonImg, IonText, IonProgressBar, IonIcon, IonCard, IonCardContent } from '@ionic/react';
import { play, timeOutline } from 'ionicons/icons';

interface ContainerProps {
    cateQuiz: {
        id: string;
        title: string;
        thumb_url: string;
        image: string;
        duration: number;
    };
}

const ExploreContainer: React.FC<ContainerProps> = ({ cateQuiz }) => {

    let url = undefined;
    let icon =
        <IonCol class="ion-no-padding">
            <IonImg src="assets/tmp/lock.svg" />
        </IonCol>;
    // console.log(cateQuiz)
    // if (cateQuiz.image) {
    //     icon =
    //         <IonCol class="ion-no-padding">
    //             <IonIcon icon={play}/>
    //         </IonCol>
    // }
    return (
        <IonCard href={url}>
            <IonRow>
                <IonCol class="card-overlay ion-no-padding">
                    {/*<IonImg src={cateQuiz.thumb_url} />*/}
                    <IonRow>
                        {icon}
                    </IonRow>
                </IonCol>
            </IonRow>
            <IonCardContent>
                <IonText className="text-md">
                    <b>{cateQuiz.title}</b>
                </IonText>
                <IonRow className="ion-align-items-center video-time">
                    <IonCol class="no-padding-left" size="auto">
                        <IonIcon color="medium" icon={timeOutline}/>
                    </IonCol>
                    <IonCol class="no-padding-left">
                        <IonText className="text-md" color="medium"></IonText>
                    </IonCol>
                </IonRow>
            </IonCardContent>
        </IonCard>

    );
};

export default ExploreContainer;

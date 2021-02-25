import React, {useState} from 'react';
import {IonRow, IonCol, IonImg, IonText, IonProgressBar, IonIcon, IonCard, IonCardContent} from '@ionic/react';
import {play, timeOutline} from 'ionicons/icons';
import {useStore} from "react-redux";

interface ContainerProps {
    cateQuiz: any;
    pid: number
}

const ExploreContainer: React.FC<ContainerProps> = ({cateQuiz, pid}) => {
    let childrenElement: any = [];
    const state = useStore().getState();
    let url = undefined;
    let icon =
        <IonCol class="ion-no-padding">
            <IonImg src="assets/tmp/lock.svg"/>
        </IonCol>;
    for (let i = 0; i <= cateQuiz.length - 1; i++) {
        childrenElement.push(
            <IonCard href={url} key={i}>
                <IonRow>
                    <IonCol class="card-overlay ion-no-padding">
                        <IonImg src={cateQuiz[i].image? state.publicUrl + cateQuiz[i].image : '/assets/tmp/recettes-bourdaloue.jpg'}/>
                        <IonRow>
                            {icon}
                        </IonRow>
                    </IonCol>
                </IonRow>
                <IonCardContent>
                    <IonText className="text-md">
                        <b>{cateQuiz[i].title}</b>
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

    }

    // console.log(cateQuiz)
    // if (cateQuiz.image) {
    //     icon =
    //         <IonCol class="ion-no-padding">
    //             <IonIcon icon={play}/>
    //         </IonCol>
    // }

    return (
        <>
            {childrenElement}
        </>

    );
};

export default ExploreContainer;

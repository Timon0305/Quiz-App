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
    let lockIcon =
        <IonCol class="ion-no-padding">
            <IonImg src="assets/tmp/lock.svg"/>
        </IonCol>;
    let unLockIcon =
        <IonCol class="ion-no-padding help_image">
            <IonImg src="assets/tmp/help.svg"/>
        </IonCol>;
    for (let i = 0; i <= cateQuiz.length - 1; i++) {
        childrenElement.push(
            <IonCard href={url} key={i}>
                <IonRow>
                    <IonCol class="card-overlay ion-no-padding">
                        <IonImg
                            src={cateQuiz[i].image ? state.publicUrl + cateQuiz[i].image : '/assets/tmp/recettes-bourdaloue.jpg'}/>
                        <IonRow>
                            {cateQuiz[i].child_count > 0 ? unLockIcon : lockIcon}
                        </IonRow>
                    </IonCol>
                </IonRow>
                <IonCardContent>
                    <IonText className="text-md">
                        <b>{cateQuiz[i].title}</b>
                    </IonText>
                    <IonRow className="ion-align-items-center video-time">
                        <IonCol class="no-padding-left" size="auto">
                            {/*<IonIcon color="medium" icon={timeOutline}/>*/}
                        </IonCol>
                        <IonCol class="no-padding-left">
                            <IonText className="text-md" color="medium">{cateQuiz[i].desc}</IonText>
                        </IonCol>
                    </IonRow>
                </IonCardContent>
            </IonCard>
        );

    }

    return (
        <>
            {childrenElement}
        </>

    );
};

export default ExploreContainer;

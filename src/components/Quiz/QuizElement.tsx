import React from 'react';
import { IonRow, IonCol, IonImg, IonText, IonProgressBar, IonIcon, IonCard, IonCardContent } from '@ionic/react';
import { play, timeOutline } from 'ionicons/icons';

interface ContainerProps {
    video: {
        id: string;
        title: string;
        thumb_url: string;
        video_url: string;
        duration: number;
    };
}

const ExploreContainer: React.FC<ContainerProps> = ({ video }) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = String(video.duration % 60).padStart(2, '0');
    const playerUrl = "/video/Video/";

    let url = undefined;
    let icon = <IonCol class="ion-no-padding">
        <IonImg src="assets/tmp/lock.svg" />
    </IonCol>;

    if (video.video_url) {
        url = playerUrl + video.id;
        icon = <IonCol class="ion-no-padding">
            <IonIcon icon={play}/>
        </IonCol>
    }
    return (
        <IonCard href={url}>
            <IonRow>
                <IonCol class="card-overlay ion-no-padding">
                    <IonImg src={video.thumb_url} />
                    <IonRow>
                        {icon}
                    </IonRow>
                </IonCol>
            </IonRow>
            <IonCardContent>
                <IonText className="text-md">
                    <b>{video.title}</b>
                </IonText>
                <IonRow className="ion-align-items-center video-time">
                    <IonCol class="no-padding-left" size="auto">
                        <IonIcon color="medium" icon={timeOutline}/>
                    </IonCol>
                    <IonCol class="no-padding-left">
                        <IonText className="text-md" color="medium">{minutes}:{seconds}</IonText>
                    </IonCol>
                </IonRow>
            </IonCardContent>
        </IonCard>

    );
};

export default ExploreContainer;

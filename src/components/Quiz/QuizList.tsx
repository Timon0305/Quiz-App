import React from 'react';
import { IonItem, IonRow, IonCol, IonImg, IonText, IonProgressBar, IonIcon, IonCard, IonCardContent } from '@ionic/react';
import { chevronDownOutline, play, timeOutline } from 'ionicons/icons';
import QuizElement from './QuizElement';
import './QuizList.scss'

interface ContainerProps {
    videos: [];
    theme: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ videos, theme }) => {
    const nb = Object.keys(videos).length;
    let vidElements =[];
    let thumb = "";
    let percent = 0;
    let viewed = 0;
    let isRestricted = true;
    for (let vid in videos) {
        const videlmt = videos[vid];
        if (isRestricted && videlmt["video_url"]) {
            isRestricted = false;
        }
        if (thumb == "") {
            thumb = videlmt["thumb_url"]
        }
        if (videlmt["user_aws_id"]) {
            viewed++
        }
        vidElements.push(<QuizElement video={videlmt} key={vid} />)
    }
    if (vidElements.length > 0) {
        percent = viewed / vidElements.length
    }
    let progressBar = <span/>;
    if (!isRestricted) {
        progressBar = <IonCol>
            <IonRow className="ion-align-items-center">
                <IonCol size="auto">
                    <IonText className="text-xs color-medium">{Math.ceil(percent * 100)}%</IonText>
                </IonCol>
                <IonCol>
                    <IonProgressBar color="success" value={percent}/>
                </IonCol>
            </IonRow>
        </IonCol>
    }
    return (
        <IonItem className='quiz-list'>
            <details>
                <summary>
                    <IonRow className="ion-align-items-center">
                        <IonCol className="no-padding-left m-5 p-0" size="auto">
                            <IonImg className="video-img quiz-img" src={thumb}/>
                            <div className='content3'>
                                <div className='subContent3'>
                                    <IonIcon size='small'/>
                                </div>
                            </div>
                        </IonCol>
                        <IonCol>
                            <IonRow className="video-details ion-align-items-center">
                                <IonCol size="auto">
                                    <IonText className="video-title text-md">
                                        <b>{theme}</b>
                                    </IonText>
                                </IonCol>
                                {progressBar}
                            </IonRow>
                            <IonText className="total-videos text-xs color-medium">{nb} vidéos</IonText>
                        </IonCol>
                        <IonCol size="auto">
                            <IonIcon className="icon-arrow" color="primary" icon={chevronDownOutline}/>
                        </IonCol>
                    </IonRow>
                </summary>
                <IonRow class="items-overflow">
                    <IonCol>
                        {vidElements}
                    </IonCol>
                </IonRow>
            </details>
        </IonItem>
    );
};

export default ExploreContainer;

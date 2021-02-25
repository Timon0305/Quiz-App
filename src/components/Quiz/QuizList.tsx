import React from 'react';
import { IonItem, IonRow, IonCol, IonImg, IonText, IonProgressBar, IonIcon, IonCard, IonCardContent } from '@ionic/react';
import { chevronDownOutline, play, timeOutline } from 'ionicons/icons';
import QuizElement from './QuizElement';
import './QuizList.scss'

interface ContainerProps {
    quiz: any;
}

const ExploreContainer: React.FC<ContainerProps> = ({ quiz }) => {
    let parentQuiz = [];
    for (let quizId in quiz) {
        let quizElements: any = [];
        let quizElement = quiz[quizId];
        let elementChildren = quiz[quizId].children;

        quizElements.push(
            <QuizElement cateQuiz={elementChildren} key={quizId} pid={quiz[quizId].id} />
        );

        parentQuiz.push(
            <IonItem className='quiz-list' key={quizId}>
                <details>
                    <summary>
                        <IonRow className="ion-align-items-center">
                            <IonCol className="no-padding-left m-5 p-0" size="auto">
                                <IonImg className="video-img quiz-img" src={quizElement['image']} />
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
                                            <b>{quizElement['title']}</b>
                                        </IonText>
                                    </IonCol>
                                </IonRow>
                                <IonText className="total-videos text-xs color-medium">{quizElement['child_count']} questions</IonText>
                            </IonCol>
                            <IonCol size="auto">
                                <IonIcon className="icon-arrow" color="primary" icon={chevronDownOutline}/>
                            </IonCol>
                        </IonRow>
                    </summary>
                    <IonRow class="items-overflow">
                        <IonCol>
                            {quizElements}
                        </IonCol>
                    </IonRow>
                </details>
            </IonItem>
        )
    }

    return (
        <>
            {parentQuiz}
        </>
    );
};

export default ExploreContainer;

import {
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonRefresher,
    IonRefresherContent,
    IonIcon,
    IonImg,
    IonGrid,
    IonCol,
    IonRow,
    IonRouterLink,
    IonAvatar,
    IonBadge,
    IonText,
    IonPopover,
    IonList,
    IonItem,
} from '@ionic/react';
import React, {useState} from 'react';
import {
    eyeOutline,
    documentOutline,
    createOutline,
    trashOutline,
    ellipsisVerticalOutline,
    heart,
    chatbubbleEllipses,
    ribbonOutline,
    chevronDownCircle
} from 'ionicons/icons';
import {RefresherEventDetail} from '@ionic/core';
import {useParams} from 'react-router';
import './SocialView.scss';

const Page: React.FC = () => {
    const {name} = useParams<{ name: string; }>();

    const [showPopover, setShowPopover] = useState<{ open: boolean, event: Event | undefined }>({
        open: false,
        event: undefined,
    });

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        console.log('Begin async operation');

        setTimeout(() => {
            console.log('Async operation has ended');
            event.detail.complete();
        }, 2000);
    }

    return (
        <IonContent className="page-social page-footer">

            <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                <IonRefresherContent/>
            </IonRefresher>

            <IonGrid>
                <IonRow class="block-intro ion-align-items-center">
                    <IonCol size="auto">
                        <IonIcon color="primary" icon={chevronDownCircle}/>
                    </IonCol>
                    <IonCol>
                        <IonText className="text-md">
                            Vous pouvez consulter plus de 200 vidéos d’apprentissage sur la boulangerie et patisserie.
                        </IonText>
                    </IonCol>
                </IonRow>
            </IonGrid>

            <IonCard>
                <IonCardHeader>

                    <IonRow className="ion-justify-content-between">
                        <IonCol className="ion-no-padding">

                            <IonBadge className="outline" color="light">
                                <IonIcon icon={eyeOutline}/>
                                <IonText>Visible par tous</IonText>
                            </IonBadge>

                            <IonRow className="ion-align-items-center">
                                <IonCol className="no-padding-left" size="auto">
                                    <IonAvatar>
                                        <IonImg src="assets/tmp/avatar.jpg"/>
                                    </IonAvatar>
                                </IonCol>
                                <IonCol>
                                    <IonText className="text-lg">Mehdi Lakhdari</IonText>
                                    <br/>
                                    <IonText className="text-sm" color="medium">15 Déc. à 16:10</IonText>
                                </IonCol>
                            </IonRow>

                        </IonCol>
                        <IonCol size="auto">

                            <IonIcon
                                size="large"
                                color="primary"
                                icon={ellipsisVerticalOutline}
                                onClick={(e) => setShowPopover({open: true, event: e.nativeEvent})}
                            >
                            </IonIcon>
                            <IonPopover
                                isOpen={showPopover.open}
                                event={showPopover.event}
                                onDidDismiss={e => setShowPopover({open: false, event: undefined})}
                            >
                                <IonList>
                                    <IonItem button>
                                        <IonIcon className="ion-padding-end" icon={documentOutline}/>
                                        <IonText className="text-md">Exporter en PDF</IonText>
                                    </IonItem>
                                    <IonItem button>
                                        <IonIcon className="ion-padding-end" icon={createOutline}/>
                                        <IonText className="text-md">Modifier</IonText>
                                    </IonItem>
                                    <IonItem button lines="none">
                                        <IonIcon className="ion-padding-end" color="danger"
                                                 icon={trashOutline}></IonIcon>
                                        <IonText className="text-md" color="danger">Supprimer</IonText>
                                    </IonItem>
                                </IonList>
                            </IonPopover>

                        </IonCol>
                    </IonRow>

                    <IonText color="tertiary">
                        <b>Ma recette de tartare</b>
                    </IonText>
                    <br/>
                    <IonText>
                        Voici mon tartare saumon avocat, qu’en pensez-vous ?
                        Voici le secret : un zeste de citron pour relever le gout
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
                    </IonText>

                </IonCardHeader>

                <IonImg src="assets/tmp/tartare.jpg"/>

                <IonCardContent>

                    <IonRow className="social-reactions">
                        <IonCol className="ion-no-padding" size="auto">
                            <div className="social-like">
                                <IonIcon icon={heart}/>
                                <IonText color="primary">J'aime</IonText>
                            </div>
                        </IonCol>
                        <IonCol className="ion-no-padding ion-padding-start" size="auto">
                            <div className="social-comment">
                                <IonIcon icon={chatbubbleEllipses} color="primary"/>
                                <IonText color="primary">Commenter</IonText>
                            </div>
                        </IonCol>
                    </IonRow>

                    <div className="social-summary">
                        <IonAvatar>
                            <IonImg src="assets/tmp/avatar2.jpg"/>
                        </IonAvatar>
                        <IonAvatar>
                            <IonImg src="assets/tmp/avatar3.jpg"/>
                        </IonAvatar>
                        <IonAvatar>
                            <IonImg src="assets/tmp/avatar4.jpg"/>
                        </IonAvatar>

                        <IonText className="color-medium text-sm">
                            <b>Vous</b> et 5 personnes ont aimé • 13 commentaires
                        </IonText>
                    </div>

                    <div className="social-comments">
                        <div className="block-comment">
                            <IonBadge className="small outline round" color="light">
                                <IonIcon icon={ribbonOutline}/>
                                <IonText className="ion-text-uppercase">Top commentaire</IonText>
                            </IonBadge>
                            <IonRow className="user-comment ion-align-items-center">
                                <IonCol className="no-padding-left" size="auto">
                                    <IonAvatar>
                                        <IonImg src="assets/tmp/avatar2.jpg"/>
                                    </IonAvatar>
                                </IonCol>
                                <IonCol>
                                    <IonText className="text-lg">Matthieu Poirot</IonText>
                                    <IonText className="text-sm"> - Toulouse</IonText>
                                </IonCol>
                            </IonRow>
                            <div className="comment">
                                <IonText className="text-md">Superbe réalisation Mehdi, merci pour ta participation très
                                    qualitative.</IonText>
                            </div>
                        </div>
                        <IonText className="comment-like color-medium text-sm">J'aime le commentaire</IonText>
                    </div>

                </IonCardContent>

            </IonCard>

            <IonCard>
                <IonCardHeader>

                    <IonRow className="ion-justify-content-between">
                        <IonCol className="ion-no-padding">

                            <IonRow className="ion-align-items-center">
                                <IonCol className="no-padding-left" size="auto">

                                    <IonAvatar>
                                        <IonImg src="assets/tmp/avatar.jpg"/>
                                    </IonAvatar>

                                </IonCol>
                                <IonCol>

                                    <IonText className="text-lg">Mehdi Lakhdari</IonText>
                                    <br/>
                                    <IonText className="text-sm" color="medium">15 Déc. à 16:10</IonText>

                                </IonCol>
                            </IonRow>

                        </IonCol>
                    </IonRow>

                    <IonText color="tertiary">
                        <b>Ma recette de tartare</b>
                    </IonText>
                    <br/>
                    <IonText>
                        Voici mon tartare saumon avocat, qu’en pensez-vous ?
                        Voici le secret : un zeste de citron pour relever le gout
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
                    </IonText>

                </IonCardHeader>

                <IonImg src="assets/tmp/tartare.jpg"/>

                <IonCardContent>

                    <IonRow className="social-reactions">
                        <IonCol className="ion-no-padding" size="auto">
                            <div className="social-like">
                                <IonIcon icon={heart}/>
                                <IonText color="primary">J'aime</IonText>
                            </div>
                        </IonCol>
                        <IonCol className="ion-no-padding ion-padding-start" size="auto">
                            <div className="social-comment">
                                <IonIcon icon={chatbubbleEllipses} color="primary"/>
                                <IonText color="primary">Commenter</IonText>
                            </div>
                        </IonCol>
                    </IonRow>

                    <div className="social-summary">
                        <IonAvatar>
                            <IonImg src="assets/tmp/avatar2.jpg"/>
                        </IonAvatar>
                        <IonAvatar>
                            <IonImg src="assets/tmp/avatar3.jpg"/>
                        </IonAvatar>
                        <IonAvatar>
                            <IonImg src="assets/tmp/avatar4.jpg"/>
                        </IonAvatar>

                        <IonText className="color-medium text-sm">
                            <b>Vous</b> et 5 personnes ont aimé • 13 commentaires
                        </IonText>
                    </div>

                    <div className="social-comments">
                        <div className="block-comment">
                            <IonRow className="user-comment ion-align-items-center">
                                <IonCol className="no-padding-left" size="auto">
                                    <IonAvatar>
                                        <IonImg src="assets/tmp/avatar2.jpg"/>
                                    </IonAvatar>
                                </IonCol>
                                <IonCol>
                                    <IonText className="text-lg">Matthieu Poirot</IonText>
                                    <IonText className="text-sm"> - Toulouse</IonText>
                                </IonCol>
                            </IonRow>
                            <div className="comment">
                                <IonText className="text-md">Superbe réalisation Mehdi, merci pour ta participation très
                                    qualitative.</IonText>
                            </div>
                        </div>
                        <IonText className="comment-like color-medium text-sm">J'aime le commentaire</IonText>
                    </div>

                </IonCardContent>
            </IonCard>

            <div className="footer-sticky active ion-text-center">
                <IonRouterLink color="light" href="/page/RecipePublish">Partager une recette</IonRouterLink>
            </div>

        </IonContent>
    );
};

export default Page;

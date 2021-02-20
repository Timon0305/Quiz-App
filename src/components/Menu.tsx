import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonButton,
    IonText,
} from '@ionic/react';
import React from 'react';
import {useLocation} from 'react-router-dom';
import {
    starOutline,
    homeOutline,
    videocamOutline,
    medalOutline,
    constructOutline,
    createOutline,
    helpCircleOutline,
    chatboxEllipsesOutline,
    readerOutline,
    personCircleOutline,
    personAddOutline,
    bookOutline
} from 'ionicons/icons';
import './Menu.css';
import './Menu.scss';

import {useStore} from 'react-redux'

interface TrainingPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

interface HelpPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

interface FormaceoPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}


// const helpPages: HelpPage[] = [
//   {
//     title: 'Coup de main',
//     url: '/page/SOS',
//     iosIcon: chatboxEllipsesOutline,
//     mdIcon: chatboxEllipsesOutline
//   },
//   {
//     title: 'Suivi personnalisé',
//     url: '/page/Help',
//     iosIcon: readerOutline,
//     mdIcon: readerOutline
//   }
// ];

const formaceoPages: FormaceoPage[] = [
    {
        title: 'Mon compte',
        url: '/page/Account',
        iosIcon: personCircleOutline,
        mdIcon: personCircleOutline
    },
    // {
    //   title: 'Parrainage',
    //   url: '/page/Sponsorship',
    //   iosIcon: personAddOutline,
    //   mdIcon: personAddOutline
    // },
    {
        title: 'À propos de Formaceo',
        url: '/page/About',
        iosIcon: bookOutline,
        mdIcon: bookOutline
    }
];

const Menu: React.FC = () => {
    const location = useLocation();

    const state = useStore().getState();
    let [videoListUrl, setVideoListUrl] = React.useState("/Page/Formations");
    let [quizListUrl, setQuizListUrl] = React.useState("/Page/Quiz");

    const trainingPages: TrainingPage[] = [
        {
            title: 'Accueil',
            url: '/page/Home',
            iosIcon: homeOutline,
            mdIcon: homeOutline
        },
        {
            title: 'Tutoriels vidéos',
            url: videoListUrl,
            iosIcon: videocamOutline,
            mdIcon: videocamOutline
        },
        {
            title: 'Quiz de formations',
            url: quizListUrl,
            iosIcon: constructOutline,
            mdIcon: constructOutline
        }
        // {
        //   title: 'Recettes favorites',
        //   url: '/page/Recipes',
        //   iosIcon: medalOutline,
        //   mdIcon: medalOutline
        // },
        // {
        //   title: 'Carnet de recette',
        //   url: '/page/',
        //   iosIcon: createOutline,
        //   mdIcon: createOutline
        // },
        // {
        //   title: 'Quiz de formations',
        //   url: '/page/Jeux',
        //   iosIcon: helpCircleOutline,
        //   mdIcon: helpCircleOutline
        // }
    ];

    let button = <IonButton class="btn-premium" expand="block" fill="outline" href="/page/Premium">
        <IonIcon icon={starOutline}/>
        <IonText class="ion-margin-start">Passer Premium</IonText>
    </IonButton>;
    if (state.premium.boulangerie || state.premium.patisserie) {
        button = <span/>;
        if (videoListUrl != "/Page/Videos") {
            setVideoListUrl("/Page/Videos")
        }
    }
    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                {button}

                <IonList id="inbox-list" lines="full">

                    <IonListHeader>
                        <IonLabel class="ion-text-uppercase">Ma formation</IonLabel>
                    </IonListHeader>
                    {trainingPages.map((trainingPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === trainingPage.url ? 'selected' : ''}
                                         routerLink={trainingPage.url} routerDirection="none" lines="none"
                                         detail={false}>
                                    <IonIcon slot="start" ios={trainingPage.iosIcon} md={trainingPage.mdIcon}/>
                                    <IonLabel>{trainingPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}

                    {/* <IonListHeader>
            <IonLabel class="ion-text-uppercase">Aide</IonLabel>
          </IonListHeader>
          {helpPages.map((helpPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === helpPage.url ? 'selected' : ''} routerLink={helpPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={helpPage.iosIcon} md={helpPage.mdIcon} />
                  <IonLabel>{helpPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })} */}

                    <IonListHeader>
                        <IonLabel class="ion-text-uppercase">Formaceo et moi</IonLabel>
                    </IonListHeader>
                    {formaceoPages.map((formaceoPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === formaceoPage.url ? 'selected' : ''}
                                         routerLink={formaceoPage.url} routerDirection="none" lines="none"
                                         detail={false}>
                                    <IonIcon slot="start" ios={formaceoPage.iosIcon} md={formaceoPage.mdIcon}/>
                                    <IonLabel>{formaceoPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}

                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;

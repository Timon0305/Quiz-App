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
import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {
    starOutline,
    homeOutline,
    videocamOutline,
    constructOutline,
    personCircleOutline,
    bookOutline, trendingUpOutline
} from 'ionicons/icons';
import axios from 'axios';
import './Menu.css';
import './Menu.scss';
import {useDispatch, useStore} from 'react-redux'


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

const Menu: React.FC = () =>  {
    const location = useLocation();
    const state = useStore().getState();
    const quizApi = state.quizApi;
    let [videoListUrl, setVideoListUrl] = React.useState("/Page/Formations");
    let [trainingPages, setTrainingPages] = React.useState<TrainingPage[]>([
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
        }]);
    let navigators: TrainingPage[] = [];

    useEffect(() => {
        for (let item of trainingPages) {
            navigators.push(item)
        }
        axios({
            method: 'get',
            url: quizApi + '0'
        }).then((resp: any) => {
            let quizData = resp.data;
            for (let i = 0; i < quizData.length; i++) {
                if (i === 0) quizData[0].url = "/page/quiz&id=" + quizData[0].id; else quizData[1].url = "/page/quiz&id=" + quizData[1].id;
                if (i === 0) quizData[0].iosIcon = constructOutline; else quizData[1].iosIcon = trendingUpOutline;
                if (i === 0) quizData[0].mdIcon = constructOutline; else quizData[1].mdIcon = trendingUpOutline;
                navigators.push(quizData[i])
            }
            setTrainingPages(navigators);
        })
    }, []);

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
                            <IonMenuToggle key={index} autoHide={false} >
                                <IonItem className={location.pathname === trainingPage.url ? 'selected' : ''}
                                         routerLink={trainingPage.url} routerDirection="none" lines="none"
                                         detail={false}>
                                    <IonIcon slot="start" ios={trainingPage.iosIcon} md={trainingPage.mdIcon}/>
                                    <IonLabel>{trainingPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}

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

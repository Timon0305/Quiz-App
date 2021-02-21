import {
    IonButtons,
    IonHeader,
    IonButton,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton
} from '@ionic/react';
import {notificationsOutline} from "ionicons/icons";
import React from 'react';
import {useParams} from 'react-router';
import './Header.scss';
import './Page.scss';
import shortid from "shortid";
import NullView from './views/NullView'
import HomeView from './views/HomeView'
import PremiumView from './views/PremiumView'
import FormationsView from './views/FormationsView'
import VideosView from './views/VideosView'
import VideoView from './views/VideoView'
import RecipesView from './views/RecipesView'
import RecipePublishView from './views/RecipePublishView'
import AccountView from './views/AccountView'
import InfosView from './views/InfosView'
import PasswordView from './views/PasswordView'
import NotificationsView from './views/NotificationsView'
import CgurgpdView from './views/CgurgpdView'
import SOSView from './views/SOSView'
import HelpView from './views/HelpView'
import AboutView from './views/AboutView'
import QuizView from './views/QuizView'
import QuizConnect from './views/quiz-connect/QuizConnect';
import TestView from './views/quiz-connect/TestView';

const Page: React.FC = () => {

    const {name} = useParams<{ name: string; }>();

    const componentLoader = (name: string) => {
        switch (name) {
            case 'Home':
                return <HomeView key={shortid.generate()}/>;
            case 'Premium':
                return <PremiumView key={shortid.generate()}/>;
            case 'Formations':
                return <FormationsView key={shortid.generate()}/>;
            case 'Quiz':
                return <QuizView key={shortid.generate()}/>;
            case 'Quiz&demo=1':
                return <QuizConnect key={shortid.generate()} />;
            case 'Quiz&test':
                return <TestView key={shortid.generate()} />;
            case 'Videos':
                return <VideosView key={shortid.generate()}/>;
            case 'Video':
                return <VideoView key={shortid.generate()}/>;
            case 'Recipes':
                return <RecipesView key={shortid.generate()}/>;
            case 'RecipePublish':
                return <RecipePublishView key={shortid.generate()}/>;
            case 'Account':
                return <AccountView key={shortid.generate()}/>;
            case 'Infos':
                return <InfosView key={shortid.generate()}/>;
            case 'Password':
                return <PasswordView key={shortid.generate()}/>;
            case 'Notifications':
                return <NotificationsView key={shortid.generate()}/>;
            case 'Cgurgpd':
                return <CgurgpdView key={shortid.generate()}/>;
            case 'SOS':
                return <SOSView key={shortid.generate()}/>;
            case 'Help':
                return <HelpView key={shortid.generate()}/>;
            case 'About':
                return <AboutView key={shortid.generate()}/>;
            default:
                return <NullView key={shortid.generate()}/>;
        }
    };
    const ContentComponent = componentLoader(name);
    const getTitle = (name: string) => {
        switch (name) {
            case 'Home':
                return "Accueil";
            case 'Premium':
                return "Devenir premium";
            case 'Formations':
                return "Tutoriels vidéos";
            case 'Quiz':
                return "Quz de formations";
            case 'Quiz&demo=1':
                return "Quz de formations";
            case 'Quiz&test':
                return "Quz de formations";
            case 'Videos':
                return "Tutoriels vidéos";
            case 'Video':
                return "Tutoriel vidéo";
            case 'Recipes':
                return "Recettes";
            case 'RecipePublish':
                return "Publication de recette";
            case 'Account':
                return "Mon compte";
            case 'Infos':
                return "Mes informations";
            case 'Password':
                return "Changer mon mot de passe";
            case 'Notifications':
                return "Notifications";
            case 'Cgurgpd':
                return "CGU et RGPD";
            case 'SOS':
                return "Communauté";
            case 'Help':
                return "Aide";
            case 'About':
                return "À propos de Formaceo";
            default:
                return name;
        }
    };
    const title = getTitle(name);
    const getNav = (name: string) => {
        switch (name) {
            case 'Video':
                return <IonBackButton defaultHref="/page/Videos"/>;
            case 'Infos':
            case 'Password':
            case 'Cgurgpd':
                return <IonBackButton defaultHref="/page/Account"/>;
            case 'RecipePublish':
                return <IonBackButton defaultHref="/page/Recipes"/>;
            case 'Premium':
            case 'Notifications':
                return <IonBackButton defaultHref="/page/Home"/>;
            default:
                return <IonMenuButton/>;
        }
    };
    const nav = getNav(name);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>

                    <IonButtons slot="start">
                        {nav}
                    </IonButtons>

                    <IonTitle>
                        <div className="ion-text-center text-bold">{title}</div>
                    </IonTitle>

                    <IonButtons slot="primary">
                        <IonButton>
                            <IonIcon slot="icon-only" color='light' icon={notificationsOutline}/>
                        </IonButton>
                    </IonButtons>

                </IonToolbar>
            </IonHeader>
            {ContentComponent}
        </IonPage>
    );
};

export default Page;

import {
  IonContent,
  IonGrid,
  IonLabel,
  IonRouterLink,
  IonSegment,
  IonSegmentButton,
  IonImg
} from '@ionic/react';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import './AboutView.scss';
import AboutPastry from './AboutPastry';
import AboutBakery from './AboutBakery';

  const Page: React.FC = () => {
    const { name } = useParams<{ name: string; }>();

    const [tab, setTab] = useState<string>("pastry");
    let tabElements =[];
    if (tab === 'pastry') {
      tabElements.push(<AboutPastry/>)
    }
    if (tab === 'bakery') {
      tabElements.push(<AboutBakery/>)
    }

    return (
      <IonContent className="page-about page-footer">

        <IonImg src="assets/tmp/about.jpg" />

        <IonGrid>

          <ul>
            <li>Formacéo est l’école spécialisée dans la formations aux métiers de la Boulangerie et de la Pâtisserie  grâce à nos ouvrages et notre application gratuite.</li>
            <li>Tous nos ouvrages sont dispensées par nos formateurs-enseignants qui possèdent une  expérience (pédagogie et compétence) de + 10 ans en Centre de Formation des Apprentis.</li>
            <li>Nos ouvrages pédagogique s’appuie sur le référentiel du CAP.</li>
            <li>Nos ouvrages ainsi que notre application gratuite mis à disposition par Formacéo vous mettent dans les meilleures  conditions pour la réussite de votre Certificat d’Aptitude Professionnel en candidat libre.</li>
            <li>
              <b>Notre service s’adressent aux :</b><br />
              Personnes en reconversion professionnelles<br />
              Particuliers<br />
              Etudiants<br />
              Apprenants<br />
              Personne en situation d’handicap...
            </li>
            <li className="no-bullet">
              <br />
              <b>Les outils mis en place par Formaceo :</b>
            </li>
            <li>
              3 ouvrages par formation, écris par nos formateurs, sont la référence pédagogique des  enseignants des CFA, lycées professionnels et lycées hôteliers.<br />
              Un code à usage unique et personnel afin de se connecter à l’application gratuite délivré dès l’achat des livres sur notre site.
            </li>
            <li>
              271 tutoriels vidéo reprenant toutes les techniques de bases et les montages à  maîtriser pour une présentation à l’examen, réalisés par nos formateurs.<br />
              Un carnet de recettes numérique.
            </li>
          </ul>

          <div className="ion-padding-horizontal">
            <IonSegment onIonChange={e => setTab(e.detail.value!)}  value={tab}>
              <IonSegmentButton value="pastry">
                <IonLabel>Cap Pâtisserie</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="bakery">
                <IonLabel>Cap Boulangerie</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <div className="ion-padding-top">{tabElements}</div>
          </div>

        </IonGrid>

        <div className="footer-sticky ion-text-center">
          <IonRouterLink href="http://www.formaceo.com" target="_blank">Visiter formaceo.com</IonRouterLink>
        </div>

      </IonContent>
    );
  };

  export default Page;


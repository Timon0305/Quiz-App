import {
    IonContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonCard,
    IonImg,
    IonBadge,
    IonCardContent,
    IonText,
    IonModal,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonToast,
    IonPopover,
} from '@ionic/react';
import {
    mail,
    call,
    informationCircleOutline
} from 'ionicons/icons';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import './PremiumView.scss';
import axios from 'axios';
import {useStore} from 'react-redux';

const Page: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const state = useStore().getState();
    const [message, setMessage] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [showToast, setShowToast] = useState(false);
    const [send, setSend] = useState(false);
    const [pending, setPending] = useState(false);
    const [code, setCode] = useState("");
    let endpoint = state.endpoint + "/handleCode";
    const store = useStore();

    const [showPopover, setShowPopover] = useState(false);

    useEffect(() => {
        if (!send || pending) {
            return
        }
        setPending(true);
        axios({
            method: 'post',
            url: endpoint,
            data: {"code": code, "aws_user_id": state.aws_id},
            headers: {'x-api-key': state.apiKey}
        }).then(response => {
            if (response.data.boulangerie) {
                setMessage("Super ! contenu débloqué.");
                setColor("success");
                setShowToast(true);
                setShowModal(false);
                const setData = (userData: any) => ({
                    type: 'SET_USER',
                    id: 0,
                    'user': userData
                });
                state.premium = response.data;
                store.dispatch(setData(state));
            } else {
                setMessage("Votre code est invalide ou est déjà utilisé");
                setColor("warning");
                setShowToast(true)
            }
            setSend(false);
            setPending(false)
        }).catch(() => {
        })
    });

    return (
        <IonContent class="page-premium page-footer">
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={message}
                position="top"
                color={color}
                duration={5000}
                buttons={[
                    {
                        icon: 'close',
                        role: 'cancel',
                        handler: () => {
                        }
                    }
                ]}
            />
            <IonModal isOpen={showModal}>
                <IonList className="form ion-padding">
                    <IonItem>
                        <IonText color="dark">Saisissez votre code Formaceo</IonText>
                        <br/>
                        <IonLabel position="floating" color="medium">CODE</IonLabel>
                        <IonInput type="text" onIonChange={e => setCode(e.detail.value!)}/>
                    </IonItem>
                    <br/><br/><br/>
                    <IonIcon className="icon-text" icon={informationCircleOutline}/>
                    <IonText className="text-md">Code délivré par Formaceo à usage unique et strictement personnel* vous
                        permettant d’accéder à tout le contenu de votre formation</IonText>
                    <br/><br/>
                    <IonText className="text-sm">*En cas de transmission de vos identifiants de connexion à un tiers,
                        vous ne respectez plus les CGV et CGU de formaceo qui se réserve le droit de mettre fin à
                        l’accès à la plateforme comme mentionné et signé dans votre contrat.</IonText>
                </IonList>
                <div className="footer-sticky footer-buttons active ion-text-center">
                    <IonRow>
                        <IonCol className="ion-no-padding">
                            <IonButton color="light" expand="full"
                                       onClick={() => setShowModal(false)}>Annuler</IonButton>
                        </IonCol>
                        <IonCol className="ion-no-padding">
                            <IonButton color="primary" expand="full" onClick={() => setSend(true)}>Valider le
                                code</IonButton>
                        </IonCol>
                    </IonRow>
                </div>
            </IonModal>

            <IonPopover
                cssClass="popover-large"
                isOpen={showPopover}
                onDidDismiss={() => setShowPopover(false)}
            >
                <IonList>
                    <IonItem detail={false} href="tel:0769500952">
                        <IonIcon className="ion-padding-end" icon={call} color="primary"/>
                        <IonText color="primary">Appeler Formaceo</IonText>
                    </IonItem>
                    <IonItem lines="none" detail={false} href="mailto:contact@formaceo.com">
                        <IonIcon className="ion-padding-end" icon={mail} color="primary"/>
                        <IonText color="primary">Envoyer un E-mail</IonText>
                    </IonItem>
                </IonList>
            </IonPopover>

            <IonGrid>

                {/* <IonRow class="premium-intro ion-align-items-center">
            <IonCol size="auto">
              <IonIcon color="primary" icon={chevronDownCircle}></IonIcon>
            </IonCol>
            <IonCol>
              Choisissez votre abonnement, et débloquez tout les fonctionnalités de l’appli.
            </IonCol>
          </IonRow> */}

                <IonRow class="premium-title ion-padding-start">
                    <IonCol size="auto">
                        <h5>Formaceo Premium</h5>
                    </IonCol>
                    <IonCol size="auto">
                        <IonBadge color="success">Recommandé</IonBadge>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonText className="ion-padding-start text-sm" color="medium">Formez-vous au CAP boulangerie et
                            patisserie avec Formaceo Premium</IonText>
                    </IonCol>
                </IonRow>

                <IonCard>
                    <IonCardContent>
                        <IonRow class="ion-justify-content-center">
                            <IonCol size="6">
                                <IonCard>
                                    <IonRow>
                                        <IonCol class="card-overlay ion-no-padding">
                                            <IonImg src="assets/tmp/patisserie.jpg"/>
                                            <IonRow>
                                                <IonCol class="ion-no-padding">
                                                    <IonText>Pâtisserie</IonText>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                    <IonCardContent>
                                        <ul>
                                            <li>• 90h de prog. pratique</li>
                                            <li>• 100h de prog. technologie</li>
                                            <li>• 185 quiz de formations</li>
                                        </ul>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol size="6">
                                <IonCard>
                                    <IonRow>
                                        <IonCol class="card-overlay ion-no-padding">
                                            <IonImg src="assets/tmp/boulangerie.jpg"/>
                                            <IonRow>
                                                <IonCol class="ion-no-padding">
                                                    <IonText>Boulangerie</IonText>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                    <IonCardContent>
                                        <ul>
                                            <li>• 80h de prog. pratique</li>
                                            <li>• 50h de prog. technologie</li>
                                            <li>• 195 quiz de formations</li>
                                        </ul>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonCard>
                                    <IonCardContent>
                                        <IonRow class="ion-justify-content-center ion-align-items-center">
                                            <IonCol size="auto" className="ion-text-right">
                                                <IonImg className="books" src="assets/tmp/livres-patisserie.jpg"/>
                                            </IonCol>
                                            <IonCol size="auto">
                                                <IonText class="text-sm">1 BD techno</IonText>
                                                &nbsp;
                                                <IonText class="text-xs color-medium">248 pages</IonText>
                                                <br/>
                                                <IonText class="text-sm">1 livre de recettes</IonText>
                                                &nbsp;
                                                <IonText class="text-xs color-medium">432 pages</IonText>
                                                <br/>
                                                <IonText class="text-sm">1 livre de synthèse</IonText>
                                                &nbsp;
                                                <IonText class="text-xs color-medium">192 pages</IonText>
                                            </IonCol>
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                                <IonCard>
                                    <IonCardContent>
                                        <IonRow class="ion-justify-content-center ion-align-items-center">
                                            <IonCol size="auto" className="ion-text-right">
                                                <IonImg className="books" src="assets/tmp/livres-boulangerie.jpg"/>
                                            </IonCol>
                                            <IonCol size="auto">
                                                <IonText class="text-sm">1 BD techno</IonText>
                                                &nbsp;
                                                <IonText class="text-xs color-medium">242 pages</IonText>
                                                <br/>
                                                <IonText class="text-sm">1 livre de recettes</IonText>
                                                &nbsp;
                                                <IonText class="text-xs color-medium">256 pages</IonText>
                                                <br/>
                                                <IonText class="text-sm">1 livre de synthèse</IonText>
                                                &nbsp;
                                                <IonText class="text-xs color-medium">174 pages</IonText>
                                            </IonCol>
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow class="ion-justify-content-between ion-align-items-center">
                            <IonCol size="auto">
                                <b>36 mois de formation</b>
                                <br/>
                                <IonText class="color-medium">En accès illimité</IonText>
                            </IonCol>
                            <IonCol size="auto">
                                <IonButton
                                    size="small"
                                    onClick={() => setShowPopover(true)}
                                >
                                    <IonIcon icon={mail}/>
                                    <IonIcon icon={call}/>
                                    Contactez nous
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonCardContent>
                </IonCard>

                <IonRow>
                    <IonCol class="ion-padding-horizontal"/>
                </IonRow>

                <IonRow class="premium-title ion-padding-start">
                    <IonCol size="auto">
                        <h5>Pack Patisserie</h5>
                    </IonCol>
                </IonRow>

                <IonCard>
                    <IonCardContent>
                        <IonRow class="ion-justify-content-center">
                            <IonCol size="6">
                                <IonCard>
                                    <IonRow>
                                        <IonCol class="card-overlay ion-no-padding">
                                            <IonImg src="assets/tmp/patisserie.jpg"/>
                                            <IonRow>
                                                <IonCol class="ion-no-padding">
                                                    <IonText>Pâtisserie</IonText>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                    <IonCardContent>
                                        <ul>
                                            <li>• 148h de prog. pratique</li>
                                            <li>• 100h de prog. technologie</li>
                                            <li>• 150 quiz de formations</li>
                                        </ul>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonCard>
                                    <IonCardContent>
                                        <IonRow class="ion-justify-content-center ion-align-items-center">
                                            <IonCol size="auto" className="ion-text-right">
                                                <IonImg className="books" src="assets/tmp/livres-patisserie.jpg"/>
                                            </IonCol>
                                            <IonCol size="auto">
                                                <IonText class="text-sm">1 BD techno</IonText>
                                                &nbsp;
                                                <IonText class="text-xs color-medium">248 pages</IonText>
                                                <br/>
                                                <IonText class="text-sm">1 livre de recettes</IonText>
                                                &nbsp;
                                                <IonText class="text-xs color-medium">432 pages</IonText>
                                                <br/>
                                                <IonText class="text-sm">1 livre de synthèse</IonText>
                                                &nbsp;
                                                <IonText class="text-xs color-medium">192 pages</IonText>
                                            </IonCol>
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow class="ion-justify-content-between ion-align-items-center">
                            <IonCol size="auto">
                                <b>24 mois de formation</b>
                                <br/>
                                <IonText class="color-medium">En accès illimité</IonText>
                            </IonCol>
                            <IonCol size="auto">
                                <IonButton
                                    fill="outline"
                                    size="small"
                                    onClick={() => setShowPopover(true)}
                                >
                                    <IonIcon icon={mail}/>
                                    <IonIcon icon={call}/>
                                    Contactez nous
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonCardContent>
                </IonCard>

                <IonRow>
                    <IonCol class="ion-padding-horizontal"></IonCol>
                </IonRow>

                <IonRow class="premium-title ion-padding-start">
                    <IonCol size="auto">
                        <h5>Pack Boulangerie</h5>
                    </IonCol>
                </IonRow>

                <IonCard>
                    <IonCardContent>
                        <IonRow class="ion-justify-content-center">
                            <IonCol size="6">
                                <IonCard>
                                    <IonRow>
                                        <IonCol class="card-overlay ion-no-padding">
                                            <IonImg src="assets/tmp/boulangerie.jpg"/>
                                            <IonRow>
                                                <IonCol class="ion-no-padding">
                                                    <IonText>Boulangerie</IonText>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                    <IonCardContent>
                                        <ul>
                                            <li>• 100h de prog. pratique</li>
                                            <li>• 50h de prog. technologie</li>
                                            <li>• 200 quiz de formations</li>
                                        </ul>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonCard>
                                    <IonCardContent>
                                        <IonRow class="ion-justify-content-center ion-align-items-center">
                                            <IonCol size="auto" className="ion-text-right">
                                                <IonImg className="books" src="assets/tmp/livres-boulangerie.jpg"/>
                                            </IonCol>
                                            <IonCol size="auto">
                                                <IonText class="text-sm">1 BD techno</IonText>
                                                &nbsp;
                                                <IonText class="text-xs color-medium">242 pages</IonText>
                                                <br/>
                                                <IonText class="text-sm">1 livre de recettes</IonText>
                                                &nbsp;
                                                <IonText class="text-xs color-medium">256 pages</IonText>
                                                <br/>
                                                <IonText class="text-sm">1 livre de synthèse</IonText>
                                                &nbsp;
                                                <IonText class="text-xs color-medium">174 pages</IonText>
                                            </IonCol>
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow class="ion-justify-content-between ion-align-items-center">
                            <IonCol size="auto">
                                <b>24 mois de formation</b>
                                <br/>
                                <IonText class="color-medium">En accès illimité</IonText>
                            </IonCol>
                            <IonCol size="auto">
                                <IonButton
                                    fill="outline"
                                    size="small"
                                    onClick={() => setShowPopover(true)}
                                >
                                    <IonIcon icon={mail}/>
                                    <IonIcon icon={call}/>
                                    Contactez nous
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonCardContent>
                </IonCard>

            </IonGrid>

            <div className="footer-sticky footer-buttons active ion-text-center">
                <IonButton color="primary" expand="full" onClick={() => setShowModal(true)}>Entrer un code de
                    formation</IonButton>
            </div>

        </IonContent>
    );
};

export default Page;

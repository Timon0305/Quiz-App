import {
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonToast,
    IonLoading,
    IonButton
} from '@ionic/react';
import React, {useState} from 'react';
import {useParams} from 'react-router';
import './AccountView.scss';
import {useStore} from 'react-redux';
import {Auth} from 'aws-amplify';
import axios from 'axios';

const Page: React.FC = () => {
    const {name} = useParams<{ name: string; }>();
    const state = useStore().getState();

    const [gender, setGender] = useState<string>(state.gender);
    const [firstName, setFirstName] = useState<string>(state.name);
    const [familyName, setFamilyName] = useState<string>(state.family_name);
    const [nickname, setNickname] = useState<string>(state.nickname);
    const [phone, setPhone] = useState<string>(state.phone_number.replace("+33", ""));
    const [mail, setMail] = useState<string>(state.email);
    const [message, setMessage] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const [changed, setChanged] = useState(false);

    function updateUser() {
        setLoading(true);
        Auth.currentAuthenticatedUser()
            .then(user => {
                let phoneNumber = phone;
                if (phoneNumber.length <= 10) {
                    phoneNumber = "+33" + phoneNumber;
                }
                return Auth.updateUserAttributes(user, {
                    'email': mail,
                    'gender': gender,
                    'name': firstName,
                    'family_name': familyName,
                    'nickname': nickname,
                    'phone_number': phoneNumber,
                });
            })
            .then(data => {
                setMessage("Vos informations sont mises à jour.");
                setColor("success");
                setShowToast(true);
                setLoading(false);
                axios({
                    method: 'post',
                    url: state.endpoint + "/handleuser",
                    headers: {'x-api-key': state.api_key},
                    data: {
                        "aws_id": state.aws_id,
                        "nickname": nickname,
                        "phone": phone,
                        "mail": mail,
                        "gender": gender,
                        "first_name": firstName,
                        "last_name": familyName,
                    }
                }).then(response => {

                }).catch(err => {
                });
            })
            .catch(err => {
                setMessage("Une erreur s'est produite, veuillez vérifier vos informations.");
                setColor("warning");
                setShowToast(true);
                setLoading(false);
            });
    }

    let button = <span/>
    if (changed) {
        button = <div className="footer-sticky footer-buttons active ion-text-center">
            <IonButton color="light" expand="full" onClick={e => updateUser()}>Valider mes modifications</IonButton>
        </div>
    }

    return (
        <IonContent className="page-footer">
            <IonGrid>
                <IonRow className="form">
                    <IonCol>
                        <IonItem>
                            <IonLabel color="medium">Civilité</IonLabel>
                            <IonSelect value={gender} onIonChange={e => setGender(e.detail.value!)}>
                                <IonSelectOption value="monsieur">Monsieur</IonSelectOption>
                                <IonSelectOption value="madame">Madame</IonSelectOption>
                                <IonSelectOption value="mademoiselle">Mademoiselle</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating" color="medium">Prénom</IonLabel>
                            <IonInput type="text" value={firstName} onIonChange={e => {
                                setFirstName(e.detail.value!);
                                setChanged(true)
                            }}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating" color="medium">Nom</IonLabel>
                            <IonInput type="text" value={familyName} onIonChange={e => {
                                setFamilyName(e.detail.value!);
                                setChanged(true)
                            }}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating" color="medium">Pseudo</IonLabel>
                            <IonInput type="text" value={nickname} onIonChange={e => {
                                setNickname(e.detail.value!);
                                setChanged(true)
                            }}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating" color="medium">E-mail</IonLabel>
                            <IonInput type="email" value={mail} onIonChange={e => {
                                setMail(e.detail.value!);
                                setChanged(true)
                            }}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating" color="medium">N° téléphone mobile</IonLabel>
                            <IonInput type="tel" value={phone} onIonChange={e => {
                                setPhone(e.detail.value!);
                                setChanged(true)
                            }}/>
                        </IonItem>
                    </IonCol>
                </IonRow>

            </IonGrid>

            {button}
            <IonLoading
                isOpen={loading}
                message={'Chargement en cours...'}
                spinner='crescent'
            />
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

        </IonContent>
    );
};

export default Page;

import { IonButton, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonText, IonToast, IonRouterLink } from '@ionic/react';
import React, { useState } from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './Login.scss';

/* AWS amplify */
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifyForgotPassword, AmplifyConfirmSignUp, AmplifyFormSection, AmplifyButton, AmplifyLabel, AmplifyFormField } from '@aws-amplify/ui-react';
import { Auth, I18n } from "aws-amplify";
import { Translations } from "@aws-amplify/ui-components";
import { phoneLandscape } from 'ionicons/icons';

const Page: React.FC = () => {
  // Liste des trads : https://github.com/aws-amplify/amplify-js/blob/main/packages/amplify-ui-components/src/common/Translations.ts
  /**
   *     CONFIRM_SIGN_UP_CODE_LABEL = "Confirmation Code",
    CONFIRM_SIGN_UP_CODE_PLACEHOLDER = "Enter your code",
    CONFIRM_SIGN_UP_HEADER_TEXT = "Confirm Sign up",
    CONFIRM_SIGN_UP_LOST_CODE = "Lost your code?",
    CONFIRM_SIGN_UP_RESEND_CODE = "Resend Code",
   */
  I18n.putVocabulariesForLanguage("fr", {
    [Translations.FORGOT_PASSWORD_TEXT]: "Mot de passe oublié ?",
    [Translations.RESET_PASSWORD_TEXT]: "Réinitialisation",
    [Translations.NO_ACCOUNT_TEXT]: "Pas encore inscrit ?",
    [Translations.CREATE_ACCOUNT_TEXT]: "Je m'inscris",
    [Translations.BACK_TO_SIGN_IN]: "Retour à la connexion",
    [Translations.CODE_LABEL]: "Code de vérification",
    [Translations.CODE_PLACEHOLDER]: "Votre code",
    [Translations.NEW_PASSWORD_LABEL]: "Nouveau mot de passe",
    [Translations.NEW_PASSWORD_PLACEHOLDER]: "Minimum 8 caractères",
    [Translations.USERNAME_LABEL]: "Email",
    [Translations.USERNAME_PLACEHOLDER]: " ",
    [Translations.CONFIRM_SIGN_UP_CODE_LABEL]: "Code de confirmation recu par mail",
    [Translations.CONFIRM_SIGN_UP_CODE_PLACEHOLDER]: "Entrez votre code",
    [Translations.CONFIRM_SIGN_UP_LOST_CODE]: "Code non recu ?",
    [Translations.CONFIRM_SIGN_UP_RESEND_CODE]: "Renvoyer le code",
    [Translations.SEND_CODE]: "Envoi du code",
    [Translations.PASSWORD_LABEL]: "Mot de passe",
    [Translations.PASSWORD_PLACEHOLDER]: " ",
    'Account recovery requires verified contact information':
"La récupération du compte nécessite des informations de contact vérifiées",

    'User does not exist.': "L'utilisateur n'existe pas",
    'User already exists.': "L'utilisateur existe déjà",
    'Incorrect username or password.': "identifiant ou mot de passe incorrect",
    'Invalid password format': "format de mot de passe invalide",
    'Username cannot be empty': "Nom d'utilisateur requis",
    "Custom auth lambda trigger is not configured for the user pool." : "Une erreur est survenue, merci de vérifier vos identifiants",
    "Password cannot be empty" : "Le mot de passe doit être renseigné",
    "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6": "Votre mot de passe doit faire au moins 8 caractères",
    "Attribute value for gender must not be null": "Merci de renseigner la civilité",
    "Attribute value for nickname must not be null" : "Merci de choisir un pseudo",
    'Invalid phone number format':
"Format de numéro de téléphone invalide. Veuillez utiliser un format de numéro de téléphone du +12345678900",
'Username': 'E-mail'
  });
  I18n.setLanguage('fr');

  const MyTheme = {
    signInButtonIcon: { 'display': 'none' },
    googleSignInButton: { 'backgroundColor': 'red', 'borderColor': 'red' }
}
const [pass, setPass] = useState<string>("");
const [passConfirm, setPassConfirm] = useState<string>("");
const [phoneNumber, setPhoneNumber] = useState<string>("");
const [name, setName] = useState<string>("");
const [familyName, setFamilyName] = useState<string>("");
const [email, setEmail] = useState<string>("");
const [gender, setGender] = useState<string>("");
const [message, setMessage] = useState<string>("");
const [color, setColor] = useState<string>("");
const [showToast, setShowToast] = useState(false);

function handleSubmit(event:any)
{
    signUp();
}
async function signUp() {
  try {
      setShowToast(false);
      if (email == "" || pass == "" || name == "" || familyName == "" || phoneNumber == "") {
        setColor("warning");
        setMessage("Tous les champs sont obligatoires")
        setShowToast(true);
        return;
      }
      if (phoneNumber.length != 10 || !phoneNumber.match(/^-?\d+$/)) {
        setColor("warning");
        setMessage("Votre numéro de téléphone est invalide : vous devez entrer un numéro de mobile à 10 chiffres.")
        setShowToast(true);
        return;
      }
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) == false)
      {
        setColor("warning");
        setMessage("Votre mail est invalide.")
        setShowToast(true);
        return;
      }
      if (pass.length < 8 || pass.toLowerCase() === pass) {
        setColor("warning");
        setMessage("Votre mot de passe est invalide. Il doit contenir 8 caractères au minimum dont 1 majuscule")
        setShowToast(true);
        return;
      }
      if (pass !== passConfirm) {
        setColor("warning");
        setMessage("Votre mot de passe et sa confirmation ne correspondent pas")
        setShowToast(true);
        return;
      }
      const username:any = email;
      const password:any = pass;
      const phoneNum:string = "+33" + phoneNumber;
      const { user } = await Auth.signUp({
          username,
          password,
          attributes: {
              email:email,          // optional
              phone_number:phoneNum,   // optional - E.164 number convention
              name:name,
              family_name:familyName,
              gender:gender
          }
      });
      await Auth.signIn({
        username,
        password
    });
      window.location.href = "/"
  } catch (error) {
      setColor("warning");
      setMessage("Une erreur technique a eu lieu lors de la validation de votre compte")
      setShowToast(true);
      return;
  }
}
  return (
    <div className="page-login">
      <div className="ion-text-center">
        <IonImg className="logo" src="assets/tmp/logo.svg" />
        <IonText className="slogan text-md">Votre partenaire E-learning</IonText>
      </div>
      <AmplifyAuthenticator>
      <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={message}
          position="middle"
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
        <AmplifySignIn 
        headerText="Connectez-vous" 
        submitButtonText="Connexion" 
        slot="sign-in"></AmplifySignIn>
        <AmplifyForgotPassword 
        headerText="Mot de passe oublié ?"
        usernameAlias="email"
        slot="forgot-password"
        submitButtonText="Valider"
        formFields={[
            {
              type: "email",
              label: "Adresse E-mail",
              placeholder: "",
              required: true,
            },]}></AmplifyForgotPassword>
        <IonGrid slot="sign-up">
          <div className="block-register">
            <div className="register-mandatory ion-text-center">
              <IonText className="text-sm">Tous les champs sont obligatoires</IonText>
            </div>
            <IonItem>
              <IonLabel color="medium">Civilité</IonLabel>
              <IonSelect value={gender} onIonChange={e => setGender(e.detail.value!)}>
                <IonSelectOption value="monsieur">Monsieur</IonSelectOption>
                <IonSelectOption value="madame">Madame</IonSelectOption>
                {/* <IonSelectOption value="mademoiselle">Mademoiselle</IonSelectOption> */}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="floating" color="medium">Prénom :</IonLabel>
              <IonInput type="text" value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating" color="medium">Nom :</IonLabel>
              <IonInput type="text" value={familyName} onIonChange={e => setFamilyName(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating" color="medium">E-mail :</IonLabel>
              <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating" color="medium">N° tel mobile :</IonLabel>
              <IonInput type="tel" value={phoneNumber} onIonChange={e => setPhoneNumber(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating" color="medium">Mot de passe :</IonLabel>
              <IonInput className="register-password" type="password" value={pass} onIonChange={e => setPass(e.detail.value!)} placeholder="Minimum 8 lettres avec une majuscule"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating" color="medium">Confirmation du mot de passe :</IonLabel>
              <IonInput className="register-password" type="password" value={passConfirm} onIonChange={e => setPassConfirm(e.detail.value!)}></IonInput>
            </IonItem>
            <div className="ion-padding-vertical"></div>
            <IonButton expand="full" onClick={e => handleSubmit(e)}>Inscription</IonButton>
            <div className="ion-margin-top ion-text-center">
              <IonRouterLink class="text-md" href="/">Retour</IonRouterLink>
            </div>
          </div>           
        </IonGrid> 
      </AmplifyAuthenticator>
    </div>
  );
};

export default Page;

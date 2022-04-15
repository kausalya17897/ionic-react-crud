import { Redirect, Route } from "react-router-dom";
import React, { useState } from "react";
import {
  IonApp,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import TableContainer from "./components/TableContainer";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<any>();
  const [contact, setContact] = useState<any>();

  const addcontact = () => {
    console.log("adding...", name, email, phone);

    const newContact = {
      name,
      email,
      phone,
    };
    fetch(`https://paripornaform.herokuapp.com/employee`, {
      method: "POST",
      body: JSON.stringify(newContact),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then(() => {
        fetch(`https://paripornaform.herokuapp.com/employee`)
          .then((data) => data.json())
          .then((a) => setContact(a.data));
      })
      .catch((err) => console.log(err));
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contact Manger</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  type="text"
                  value={name}
                  onIonChange={(e) => setName(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Phone</IonLabel>
                <IonInput
                  type="text"
                  onIonChange={(e) => setPhone(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-left">
              <IonButton onClick={addcontact}>
                <IonIcon slot="start" icon={addOutline} />
                ADD CONTACT
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <TableContainer />
    </IonApp>
  );
};
export default App;

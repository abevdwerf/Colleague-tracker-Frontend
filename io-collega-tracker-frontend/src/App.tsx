import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { settings, person, search } from 'ionicons/icons';
import { PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import GoogleLogin from './pages/GoogleLogin';
import LoginSuccess from './pages/LoginSuccess';
import MailConfirm from './pages/MailConfirm';
import VerifyWait from './pages/VerifyWait';
import MacPage from './pages/MacPage';
import './App.css';
import { createGesture, Gesture } from '@ionic/react';

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
import LocationSetting from './pages/Profile';
import MainPage from './pages/MainPage';
import Settings from './pages/Settings';
import AddMac from './pages/AddMac';
import EditMac from './pages/EditMac';
import NotificationCard from './components/NotificationCard';
import ReactDOM from 'react-dom/client';

setupIonicReact();

let gesture: any;

function Swipe(detail: any) {
  // if (detail.velocityY > 0) {
  //   (document.getElementById("notifdiv") as HTMLDivElement).classList.toggle("show");
  // }
  if (detail.velocityX != 0) {
    if (detail.velocityX < 0) {
      //Swipe Left
      console.log("left");
      (document.getElementById("notifdiv") as HTMLDivElement).classList.toggle("swipeLeft");
    }
    
    if (detail.velocityX > 0){
      //Swipe Right
      console.log("right");
      (document.getElementById("notifdiv") as HTMLDivElement).classList.toggle("swipeRight");
    }
    gesture.enable(false);
    setTimeout(gesture.enable(true), 750);
  }
}

function hideNotification() {
  (document.getElementById("notifdiv") as HTMLDivElement).classList.toggle("show");
  if ((document.getElementById("notifdiv") as HTMLDivElement).classList.contains("swipeLeft")) {
    (document.getElementById("notifdiv") as HTMLDivElement).classList.toggle("swipeLeft");
  }
  if ((document.getElementById("notifdiv") as HTMLDivElement).classList.contains("swipeRight")) {
    (document.getElementById("notifdiv") as HTMLDivElement).classList.toggle("swipeRight");
  }
}

const listenForNotifications = () => {

  function showNotification(header: string | undefined, text: string | undefined) {
    let div = document.getElementById("notifdiv") as HTMLDivElement
    div.innerHTML = "";
    const root = ReactDOM.createRoot(div);
    if (header === undefined) {
      header = ""
    }
    if (text === undefined) {
      text = ""
    }
    root.render(<NotificationCard header={header} text={text}></NotificationCard>)
    div.classList.toggle("show");

    gesture = createGesture({
      el: document.getElementById("notifdiv") as HTMLDivElement,
      gestureName: "swipeX",
      //direction: "y",
      onMove: (detail) => Swipe(detail)
    })
    gesture.enable(true);
  }

  PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
    showNotification(notification.title, notification.body)
    setTimeout(hideNotification, 7000)
  })
};

listenForNotifications();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet animated={false}>
          <Route exact path="/googlelogin">
            <GoogleLogin />
          </Route>
          <Route exact path="/mailconfirm">
            <MailConfirm />
          </Route>
          <Route exact path="/verifyWait">
            <VerifyWait />
          </Route>
          <Route exact path="/loginsuccess">
            <LoginSuccess />
          </Route>
          <Route exact path="/profile">
            <LocationSetting />
          </Route>
          <Route exact path="/mainpage">
            <MainPage />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/macpage">
            <MacPage />
          </Route>
          <Route exact path="/addmac">
            <AddMac />
          </Route>
          <Route exact path="/editmac">
            <EditMac />
          </Route>
          <Route exact path="/">
            <Redirect to="/googlelogin" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" id="tab-bar">
          <IonTabButton tab="tab1" href="/mainpage">
            <IonIcon icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/profile">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/settings">
            <IonIcon icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
    <div id="notifdiv" />
  </IonApp>
);

export default App;

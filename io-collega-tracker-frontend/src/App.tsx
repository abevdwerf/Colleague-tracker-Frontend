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
import { ellipse, square, medkit, triangle, location, planet, settings, home, person } from 'ionicons/icons';
import GoogleLogin from './pages/GoogleLogin';
import LoginSuccess from './pages/LoginSuccess';
import MailConfirm from './pages/MailConfirm';
import VerifyWait from './pages/VerifyWait';

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
import AllColleagues from './pages/AllColleagues';
import Settings from './pages/Settings';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
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
          <Route exact path="/allcolleagues">
            <AllColleagues />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/">
            <Redirect to="/googlelogin" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" id="tab-bar">
          <IonTabButton tab="tab1" href="/mainpage">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
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
  </IonApp>
);

export default App;

import { IonContent, IonPage, IonSearchbar, IonHeader, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherEventDetail, IonButtons, IonButton, IonIcon } from '@ionic/react';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ColleagueCard from '../components/ColleagueCard';
import './MainPage.css';
import ReactDOM from 'react-dom/client';
import { checkmarkSharp, close, filter, reload } from 'ionicons/icons';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import Filter from '../components/ColleagueFilter';

const register = () => {
  PushNotifications.register();
  // On success, we should be able to receive notifications
  PushNotifications.addListener('registration',
    (token: Token) => {
      console.log(JSON.stringify(token.value))

      let config = {
        headers: {
          idToken: localStorage.getItem("token"),
          "Content-Type": "text/plain"
        },
        params: {
          fcmToken: token.value
        }
      }

      axios.post(process.env.REACT_APP_ROOT_API + `/notification/fcm/set`, null, config)
        .then(res => {
          console.log(res)
        });
    }
  );

  // Some issue with our setup and push will not work
  PushNotifications.addListener('registrationError',
    (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    }
  );
};
register();

const MainPage: React.FC = () => {
  let colleaguelist = [] as any;
  let inclusion = [] as any;
  const [Users, setUsers] = useState([]);
  const [CancelButton, setCancelButton] = useState(false);
  const searchInput = useRef(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [allColleaguesModalOpen, setAllColleaguesModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters: string[] = ["All", "Office", "Home"];

  useEffect(() => {
    FilterColleagues();
  }, [activeFilter])

  const GetColleagues = () => {

    let config = {
      headers: {
        idToken: localStorage.getItem("token"),
      }
    }

    useEffect(() => {
      axios.get(process.env.REACT_APP_ROOT_API + `/status/get-all-colleagues`, config)
        .then(res => {
          if (res.status === 200) {
            setUsers(res.data);
          }
        })
        .catch(err => {
          console.log(err)
          if (err.response.status === 401) {
            window.location.href = "/googlelogin";
          }
        })
    }, []);

    return Users;

  }

  let APIcall = GetColleagues();
  for (let i = 0; i < APIcall.length; i++) {
    ListAllColleagues(i);
  }

  function ListAllColleagues(i: number) {
    if (APIcall[i]["status"]["status"] === "Unknown" && APIcall[i]["status"]["detectedAtOffice"] === false && APIcall[i]["status"]["active"] === false) {
      colleaguelist.push(<ColleagueCard first_name={APIcall[i]['firstName']} last_name={APIcall[i]['lastName']} location="Unknown" id={Users[i]['id']} beginTime={APIcall[i]['status']['beginTime']} expirationTime={APIcall[i]['status']['expirationTime']} key={i} />);
    }
    else if (APIcall[i]["status"]["status"] === "Unknown" && APIcall[i]["status"]["detectedAtOffice"] === false && APIcall[i]["status"]["active"] === true) {
      colleaguelist.push(<ColleagueCard first_name={APIcall[i]['firstName']} last_name={APIcall[i]['lastName']} location="Unknown" id={Users[i]['id']} beginTime={APIcall[i]['status']['beginTime']} expirationTime={APIcall[i]['status']['expirationTime']} key={i} />);
    }
    else if (APIcall[i]["status"]["status"] === "Unknown" && APIcall[i]["status"]["detectedAtOffice"] === true && APIcall[i]["status"]["active"] === false) {
      colleaguelist.push(<ColleagueCard first_name={APIcall[i]['firstName']} last_name={APIcall[i]['lastName']} location="Office" id={Users[i]['id']} beginTime={APIcall[i]['status']['beginTime']} expirationTime={APIcall[i]['status']['expirationTime']} key={i} />);
    }
    else if (APIcall[i]["status"]["status"] !== "Unknown" && APIcall[i]["status"]["detectedAtOffice"] === true && APIcall[i]["status"]["active"] === true) {
      colleaguelist.push(<ColleagueCard first_name={APIcall[i]['firstName']} last_name={APIcall[i]['lastName']} location={APIcall[i]['status']['status']} id={Users[i]['id']} beginTime={APIcall[i]['status']['beginTime']} expirationTime={APIcall[i]['status']['expirationTime']} key={i} />);
    }
    else if (APIcall[i]["status"]["status"] !== "Unknown" && APIcall[i]["status"]["detectedAtOffice"] === true && APIcall[i]["status"]["active"] === false) {
      colleaguelist.push(<ColleagueCard first_name={APIcall[i]['firstName']} last_name={APIcall[i]['lastName']} location="Unknown" id={Users[i]['id']} beginTime={APIcall[i]['status']['beginTime']} expirationTime={APIcall[i]['status']['expirationTime']} key={i} />);
    }
    else if (APIcall[i]["status"]["status"] !== "Unknown" && APIcall[i]["status"]["detectedAtOffice"] === false && APIcall[i]["status"]["active"] === true) {
      colleaguelist.push(<ColleagueCard first_name={APIcall[i]['firstName']} last_name={APIcall[i]['lastName']} location={APIcall[i]['status']['status']} id={Users[i]['id']} beginTime={APIcall[i]['status']['beginTime']} expirationTime={APIcall[i]['status']['expirationTime']} key={i} />);
    }
    else if (APIcall[i]["status"]["status"] !== "Unknown" && APIcall[i]["status"]["detectedAtOffice"] === false && APIcall[i]["status"]["active"] === false) {
      colleaguelist.push(<ColleagueCard first_name={APIcall[i]['firstName']} last_name={APIcall[i]['lastName']} location="Unknown" id={Users[i]['id']} beginTime={APIcall[i]['status']['beginTime']} expirationTime={APIcall[i]['status']['expirationTime']} key={i} />);
    }
    colleaguelist.push(<br key={i + "br"} />);
  }

  async function FilterColleagues() {
    var input = (document.getElementById('searchbox') as HTMLInputElement).value.toLowerCase();
    var APICall = Users;
    var names: Array<string> = [];

    for (let i = 0; i < APIcall.length; i++) {
      let fullname = APICall[i]['firstName'] + " " + APICall[i]['lastName']
      names.push(fullname.toString().toLowerCase());
    }

    const filtered = names.filter(name => name.includes(input));
    inclusion = [];

    for (let i = 0; i < APICall.length; i++) {
      if (filtered.includes((APICall[i]['firstName'] + " " + APICall[i]['lastName']).toLowerCase())) {
        inclusion.push(i);
      }
    }

    colleaguelist = [];

    console.log(APIcall)
    console.log(activeFilter)

    if (activeFilter === "All") {
      for (let i = 0; i < APIcall.length; i++) {
        if (inclusion.includes(i)) {
          ListAllColleagues(i);
        }
      }
    }
    else {
      for (let i = 0; i < Users.length; i++) {
        if (inclusion.includes(i)) {
          if (APIcall[i]['status']['status'] == activeFilter) {
            if (APIcall[i]["status"]["status"] !== "Unknown" && APIcall[i]["status"]["detectedAtOffice"] === true && APIcall[i]["status"]["active"] === true) {
              colleaguelist.push(<ColleagueCard first_name={APIcall[i]['firstName']} last_name={APIcall[i]['lastName']} location={APIcall[i]['status']['status']} id={Users[i]['id']} beginTime={APIcall[i]['status']['beginTime']} expirationTime={APIcall[i]['status']['expirationTime']} key={i} />);
              colleaguelist.push(<br key={i + "br"} />);
            }
            else if (APIcall[i]["status"]["status"] !== "Unknown" && APIcall[i]["status"]["detectedAtOffice"] === false && APIcall[i]["status"]["active"] === true) {
              colleaguelist.push(<ColleagueCard first_name={APIcall[i]['firstName']} last_name={APIcall[i]['lastName']} location={APIcall[i]['status']['status']} id={Users[i]['id']} beginTime={APIcall[i]['status']['beginTime']} expirationTime={APIcall[i]['status']['expirationTime']} key={i} />);
              colleaguelist.push(<br key={i + "br"} />);
            }
          }
          if (activeFilter == "Office" && APIcall[i]["status"]["status"] == "Unknown" && APIcall[i]["status"]["detectedAtOffice"] == true && APIcall[i]["status"]["active"] == false) {
            colleaguelist.push(<ColleagueCard first_name={APIcall[i]['firstName']} last_name={APIcall[i]['lastName']} location="Office" id={Users[i]['id']} beginTime={APIcall[i]['status']['beginTime']} expirationTime={APIcall[i]['status']['expirationTime']} key={i} />);
            colleaguelist.push(<br key={i + "br"} />);
          }
        }
      }
    }

    (document.getElementById("list") as HTMLDivElement).innerHTML = "";
    let result;
    if (colleaguelist.length > 1) {
      result = React.createElement('div', {}, colleaguelist);
      const root = ReactDOM.createRoot(document.getElementById("list") as HTMLDivElement).render(result);
    }
  }

  function reloader() {
    window.location.reload();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar id="searchbox" color="light" placeholder="Search Colleagues..." showCancelButton="never" onIonChange={FilterColleagues} ref={searchInput}>
          </IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={reloader}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <br />
        <div className='filterbuttonscontainer'>
          {filters.map((filter, index) => {
            return (
              <Filter
                key={index}
                title={filter}
                isActive={filter === activeFilter}
                onClick={(e: React.MouseEvent) => {
                  const el = e.target as HTMLElement;
                  if (el.textContent?.toLowerCase() !== activeFilter) {
                    setActiveFilter(filter);
                  }
                }}
              />
            );
          })}
        </div>
        <div id="contentcontainer">
          <br />
          <div id="list">
            {colleaguelist}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;


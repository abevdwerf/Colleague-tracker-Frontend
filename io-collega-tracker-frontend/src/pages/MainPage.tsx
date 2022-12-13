import { IonContent, IonPage, IonSearchbar, IonHeader, IonTitle, IonIcon, IonButtons, IonButton, IonToolbar, IonModal, IonChip } from '@ionic/react';
import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import ColleagueCard from '../components/ColleagueCard';
import './MainPage.css';
import ReactDOM from 'react-dom/client';
import { checkbox, checkmark, checkmarkSharp, close, filter, location, search } from 'ionicons/icons';
import { PushNotifications, Token } from '@capacitor/push-notifications';

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
  const [Users, setUsers] = useState([]);
  const [CancelButton, setCancelButton] = useState(false);
  const searchInput = useRef(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [allColleaguesModalOpen, setAllColleaguesModalOpen] = useState(false);
  
  const ListColleagues = () => {

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
            window.location.href= "/googlelogin";
          }
        })
    }, []);

    return Users;

  }

  let APIcall = ListColleagues();
  for (let i = 0; i < APIcall.length; i++) {
    if (APIcall[i]["status"]["status"] === "Unknown" && APIcall[i]["status"]["detectedAtOffice"] === false && APIcall[i]["status"]["active"] === false) {
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
  //ListFavoriteColleagues()

  function refreshPage() {
    window.location.reload();
  }

  function ToggleFilters() {
    const filterdiv = document.getElementById("filterdiv");
    const filterbtn = document.getElementById("filterbtn");

    if (filterdiv?.hidden) {
      filterdiv.hidden = false;
      (filterbtn as HTMLButtonElement).innerHTML = "Hide Filters";
    }
    else {
      (filterdiv as HTMLDivElement).hidden = true;
      (filterbtn as HTMLButtonElement).innerHTML = "Show Filters";
    }
  }

  function SearchColleagues() {
    var input = (document.getElementById('searchbox') as HTMLInputElement).value.toLowerCase();
    var APICall = Users;
    var names: Array<string> = [];

    for (let i = 0; i < APIcall.length; i++) {
      let fullname = APICall[i]['firstName'] + " " + APICall[i]['lastName']
      names.push(fullname.toString().toLowerCase());
    }

    const filtered = names.filter(name => name.includes(input));
    colleaguelist = [];

    for (let i = 0; i < APICall.length; i++) {
      if (filtered.includes((APICall[i]['firstName'] + " " + APICall[i]['lastName']).toLowerCase())) {
        if (APIcall[i]["status"]["status"] === "Unknown" && APIcall[i]["status"]["detectedAtOffice"] === false && APIcall[i]["status"]["active"] === false) {
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
    }
    (document.getElementById("list") as HTMLDivElement).innerHTML = "";

    let result;
    if (colleaguelist.length < 1 && input != "") {
      const label = React.createElement('label', { className: 'message' }, 'No match found.');
      result = React.createElement('div', {}, label);
    }
    else {
      result = React.createElement('div', {}, colleaguelist);
    }

    var div = (document.getElementById("list") as HTMLDivElement);
    let root;
    root = ReactDOM.createRoot(div);
    root.render(result);
  }

  function FilterColleagues() {
    // getvalue
    var option = (document.getElementById('select') as HTMLSelectElement).value;

    colleaguelist = [];

    for (let i = 0; i < Users.length; i++) {
      if (Users[i]['status'] == option) {
        if (APIcall[i]["status"]["status"] === "Unknown" && APIcall[i]["status"]["detectedAtOffice"] === false && APIcall[i]["status"]["active"] === false) {
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
    }
    (document.getElementById("list") as HTMLDivElement).innerHTML = "";

    let result;
    if (colleaguelist.length < 1) {
      const label = React.createElement('label', { className: 'message' }, 'No match found.');
      result = React.createElement('div', {}, label);
    }
    else {
      result = React.createElement('div', {}, colleaguelist);
    }

    var div = (document.getElementById("list") as HTMLDivElement);
    let root;
    root = ReactDOM.createRoot(div);
    root.render(result);
  }

  function HandleOnFocus() {
    setCancelButton(true);
    const contentcontainer = document.getElementById("contentcontainer");
    const colleaguelistdiv = document.getElementById("list");

    contentcontainer!.hidden = true;
    colleaguelistdiv!.hidden = false;
  }

  function HandleOnCancel() {
    setCancelButton(false);
    const contentcontainer = document.getElementById("contentcontainer");
    const colleaguelistdiv = document.getElementById("list");
    contentcontainer!.hidden = false;
    colleaguelistdiv!.hidden = true;
  }

  function filterHome() {
    const filterhome = document.getElementById("filterhome");

    filterhome?.classList.remove("activefilter");
  }

  function filterOffice() {
    const filterhome = document.getElementById("filteroffice");
    const icon = document.getElementById("checkicon");

    filterhome?.classList.remove("activefilter");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {(() => {
              if (CancelButton) {
                return (
                  <>
                    <IonSearchbar id="searchbox" color="light" placeholder="Search Colleagues..." showCancelButton="always" onIonChange={SearchColleagues} onIonFocus={HandleOnFocus} onIonCancel={HandleOnCancel} ref={searchInput}>
                    </IonSearchbar>
                    {/* <IonButtons slot="end">
                        <IonButton onClick={() => setIsOpen(true)}>
                          <IonIcon color="light" size="large" icon={filter}></IonIcon>
                        </IonButton>
                    </IonButtons> */}
                  </>
                );
              }
              else {
                return (
                  <>
                    <IonSearchbar id="searchbox" color="light" placeholder="Search Colleagues..." showCancelButton="never" onIonFocus={HandleOnFocus} >
                    </IonSearchbar>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setFilterModalOpen(true)}>
                          <IonIcon color="light" size="large" icon={filter}></IonIcon>
                        </IonButton>
                    </IonButtons>
                  </>
                );
              }
            })()}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          {/* <h1>Welcome, {localStorage.getItem("first_name")}</h1> */}
          <div id="contentcontainer">
            <div className="containeractionbuttons">
              <button onClick={() => setAllColleaguesModalOpen(true)} className='btn' id="allcolleaguesbtn">ALL COLLEAGUES</button> 
            </div>
            <br />
            <h5 className='titlefavorite'>Favorites</h5>
              {/* favorite colleagues */}
          </div>
          
          {/* filter */}
          {/* <button onClick={refreshPage} className='btn'>Refresh Colleagues</button> <br />
          <button className='btn filterbtn' id="filterbtn" onClick={ToggleFilters}>Show Filters</button> <br /> <br />
          <div className='filterdiv' id="filterdiv" hidden>
            <div className='searchdiv'>
              <label>Location: </label>
              <select onChange={FilterColleagues} defaultValue="init" id="select">
                <option disabled value="init">Select an option...</option>
                <option value="Office">Office</option>
                <option value="Home">Home</option>
              </select>
              <button className='btn' onClick={refreshPage}>Reset All Filters</button>
            </div>
          </div> <br /> */}

          <div className='colleagues' id="list" hidden>
            {colleaguelist}
          </div>

        <IonModal isOpen={filterModalOpen}>
          <IonHeader>
            <IonToolbar color="translucent">
              <IonTitle>Filters</IonTitle>
              <IonButtons slot="start">
                <IonButton onClick={() => setFilterModalOpen(false)}><IonIcon size="large" icon={close}></IonIcon></IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <div className="actionbuttonscontainer">
              <button onClick={refreshPage} className='btn' id="resetfilterbtn">RESET FILTERS</button> 
            </div>
            <br />
            <hr />
            <br />
            <div className='filterbuttonscontainer'>
              <IonChip onClick={filterHome} className="activefilter" id="filterhome">Home <IonIcon hidden id="checkicon" size='medium' icon={checkmarkSharp}></IonIcon></IonChip>
              <IonChip onClick={filterOffice} className="activefilter" id="filteroffice">Office <IonIcon id="checkicon" size='medium' icon={checkmarkSharp}></IonIcon></IonChip>
            </div>
          </IonContent>
        </IonModal>
        
        <IonModal isOpen={allColleaguesModalOpen}>
          <IonHeader>
            <IonToolbar color="translucent">
              <IonTitle>All colleagues (10)</IonTitle>
              <IonButtons slot="start">
                <IonButton onClick={() => setAllColleaguesModalOpen(false)}><IonIcon size="large" icon={close}></IonIcon></IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;
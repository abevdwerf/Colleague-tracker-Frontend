import { IonContent, IonPage, } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ColleagueCard from '../components/ColleagueCard';
import './MainPage.css';
import ReactDOM from 'react-dom/client';
import { PushNotifications, Token,} from '@capacitor/push-notifications';

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
  let colleagues = [];
  const [Users, setUsers] = useState([]);

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

  function FilterColleagues() {
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

  return (
    <IonPage>
      <IonContent fullscreen>
        <h1>Welcome, {localStorage.getItem("first_name")}</h1>
        <button onClick={refreshPage} className='btn'>Refresh Colleagues</button> <br />
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
        </div> <br />
        <input type="text" id="searchbox" className='searchbox' placeholder='Search Colleagues...' onChange={SearchColleagues}></input> <br /> <br />
        <div className='colleagues' id="list">
          {colleaguelist}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;

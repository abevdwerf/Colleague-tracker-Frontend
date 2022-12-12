import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { cloneElement, useEffect, useState } from 'react';
import axios from 'axios';
import ColleagueCard from '../components/ColleagueCard';
import ExploreContainer from '../components/ExploreContainer';
import './MainPage.css';
import ReactDOM from 'react-dom/client';
import { location } from 'ionicons/icons';

const MainPage: React.FC = () => {

  // let colleaguelist:any;
  // let colleagues:any;


  // function ListFavoriteColleagues() {
  //     console.log("getting colleagues")
  //     colleaguelist = [];
  //     colleagues = [];

  //     let config = {
  //         headers: {
  //           idToken: localStorage.getItem("token"),
  //         }
  //       }


  //     axios.get(process.env.REACT_APP_ROOT_API + `/status/get-all-colleagues`, config)
  //     .then(res => {
  //         if (res.status === 200) {
  //             console.log(res.data)
  //             for (let index = 0; index < res.data.length; index++) {
  //                 colleagues.push(res.data[index])

  //             }
  //             console.log(colleagues.length)
  //             for (let i = 0; i < colleagues.length; i++) {
  //                 //console.log(colleagues)
  //                 colleaguelist.push(<ColleagueCard name={colleagues[i].firstName} location={colleagues[i].status} status="Test" />);
  //                 colleaguelist.push(<br />);
  //             }
  //         }
  //     })
  //     .catch(err => {
  //         console.log(err)
  //     })


  //    //console.log(colleagues)
  //     //console.log(colleaguelist)

  //     // for (let i = 0; i < 5; i++) {
  //     //     colleaguelist.push(<ColleagueCard name="a" location='Office' status='Available' />);
  //     //     colleaguelist.push(<br />);
  //     // }
  // }

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
        })
    }, []);

    return Users;

  }

  let APIcall = ListColleagues();
  for (let i = 0; i < APIcall.length; i++) {
    //   colleaguelist.push(<ColleagueCard name={APIcall[i].firstName} location={APIcall[i].status} status={"Test"} />);
    colleaguelist.push(<ColleagueCard first_name={APIcall[i]['firstName']} last_name={APIcall[i]['lastName']} location={APIcall[i]['status']} id={Users[i]['id']} key={i} />);
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
    var input = (document.getElementById('searchbox') as HTMLInputElement).value;
    var APICall = Users;
    var names: Array<string> = [];

    for (let i = 0; i < APIcall.length; i++) {
      let fullname = APICall[i]['firstName'] + " " + APICall[i]['lastName']
      names.push(fullname.toString());
    }

    const filtered = names.filter(name => name.includes(input));
    colleaguelist = [];

    for (let i = 0; i < APICall.length; i++) {
      if (filtered.includes(APICall[i]['firstName'] + " " + APICall[i]['lastName'])) {
        colleaguelist.push(<ColleagueCard first_name={APIcall[i]['firstName']} last_name={APIcall[i]['lastName']} location={APIcall[i]['status']} id={Users[i]['id']} key={i} />);
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
        colleaguelist.push(<ColleagueCard first_name={Users[i]['firstName']} last_name={Users[i]['lastName']} location={Users[i]['status']} id={Users[i]['id']} key={i} />);
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
        <div className='content'>
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;

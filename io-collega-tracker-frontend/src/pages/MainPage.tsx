import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { cloneElement, useEffect, useState } from 'react';
import axios from 'axios';
import ColleagueCard from '../components/ColleagueCard';
import ExploreContainer from '../components/ExploreContainer';
import './MainPage.css';

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
    const ListFavoriteColleagues = () => {

        let config = {
            headers: {
              idToken: localStorage.getItem("token"),
            }
          }
      
          const [Users, setUsers] = useState([])
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
      
       let APIcall = ListFavoriteColleagues();0
      for (let i = 0; i < APIcall.length; i++) {
        //   colleaguelist.push(<ColleagueCard name={APIcall[i].firstName} location={APIcall[i].status} status={"Test"} />);
        colleaguelist.push(<ColleagueCard first_name={APIcall[i]['firstName']} last_name={APIcall[i]['lastName']} location={APIcall[i]['status']} />);
          colleaguelist.push(<br />);
      }
    //ListFavoriteColleagues()

    function refreshPage() {
        window.location.reload();
      }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className='content'>
                    <h1>Welcome, {localStorage.getItem("first_name")}</h1>
                    <button onClick={refreshPage} className='btn'>Refresh Colleagues</button> <br /> <br />
                    {/* <div className='searchdiv'>
                        <input type="text" className='searchbox' placeholder='Search Favorite Colleagues...'></input> <input type='button' className='searchbtn' value='Search'/>
                    </div> <br /> */}
                    <div className='colleagues'>
                        {colleaguelist}
                    </div> 
                </div>
            </IonContent>
        </IonPage>
    );
};

export default MainPage;

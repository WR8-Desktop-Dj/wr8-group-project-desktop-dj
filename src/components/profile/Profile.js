import profile from './defaultprofile.webp'
import Header from '../header/Header'
import { connect } from 'react-redux'
import Rooms from "../rooms/Rooms";
import { useState, useEffect } from 'react'
import axios from 'axios'


const Profile = (props) => {
  const { localUser } = props
  const { profile_pic: profilePic, display_name: name, user_id: userId } = localUser
  const [myRooms, setMyRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    axios
      .get(`/api/myrooms/${userId}`)
      .then((res) => {
        setMyRooms(res.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  }, [localUser])

  // console.log(props)
  return (
    <div>
      <Header />
      <h3> Welcome {name} </h3>
      <img src={profilePic ? profilePic : profile} alt='Default Profile Picture' />
      <h1>My Rooms</h1>
      <>
        {myRooms.map((e) => (
          <Rooms
            key={e.room_id}
            roomId={e.room_id}
            name={e.room_name}
            roomPic={e.room_pic}
          />
        ))}
      </>
    </div>
  )
}

const mapStateToProps = (reduxState) => {
  return {
    localUser: reduxState.userReducer.localUser
  };
};

export default connect(mapStateToProps, {})(Profile);
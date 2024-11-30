import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import React, { useContext, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { videoContext } from '../contexts/videoCallContext';

const VideoCallPage = () => {
//    const {roomID}=useParams();
//    console.log(roomID);
const location=useLocation();
const {videoDeclineMsg}=useContext(videoContext);
  

//    useEffect(()=>{
    const queryParams=new URLSearchParams(location.search);
    let roomID=queryParams.get('roomID');
    console.log("queryParams" , roomID);
//    },[location]);

//    console.log("roomid", roomID);

//    const roomID = getUrlParams().get('roomID') || randomID(5);
      let myMeeting = async (element) => {
        
     // generate Kit Token
      const appID = 1094993212;
      const serverSecret = "cd37ecc8467d476616f86bb82527c373";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  localStorage.getItem('userID'),  localStorage.getItem('name'));

    
     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Copy link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });

    
  };





  return (
    <div className='relative w-screen h-screen'>
        {
            videoDeclineMsg&&(<div className='absolute right-0 z-50 w-2/12 p-2 h-12 rounded-lg bg-purple-300 text-white font-bold text-center'>
                {videoDeclineMsg}
            </div>)
        }
    
    <div
      
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    >
        
    </div>
    </div>
  )
}

export default VideoCallPage;

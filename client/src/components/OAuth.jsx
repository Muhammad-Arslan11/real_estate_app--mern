import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import {app} from '../firebase/firebase';
import { signInSuccess } from '../store/userSlice';

function OAuth() {

  const handleGoogleClick = async ()=>{
    try {
       const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);

     const res = await fetch("/api/auth/google", {
            method: 'POST',
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({name:result.user.displayName, email:result.user.email, photo:result.user.photoURL}),
          });
          const data = await res.json();
          dispatch(signInSuccess(data));
          navigate('/dashboard');
    
    } catch (error) {
      console.log("error from Oauth: ",error);
    }
   
  }
  return (
     <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  )
}

export default OAuth
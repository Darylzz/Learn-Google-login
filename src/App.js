import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [profile, setProfile] = useState([]);

  const clientId = "119091945038-36ql69g9s796qui4jfp48pno4psgjhe4.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = res => {
    console.log("success", res);
    setProfile(res.profileObj);
  };

  const onFailure = res => {
    console.log("failed", res);
  };

  const logout = () => {
    setProfile(null);
  };

  return (
    <div className="App">
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.imageUrl} alt="User image" />
          <h3>User Login</h3>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <br />
          <br />
          <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={logout} />
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignIn={true}
        />
      )}
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Amplify from 'aws-amplify';
import awsconfig from "../src/aws-exports";
import { Auth as Guard } from "aws-amplify";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [data, setData] = useState("");
  const [ldata, setLdata] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  Amplify.configure(awsconfig);

  useEffect(() => {
    // window.addEventListener("beforeinstallprompt", (event) => {
    //   // Prevent Chrome 76 and later from showing the mini-infobar
    //   event.preventDefault();

    //   // Stash the event so it can be triggered later
    //   deferredPrompt = event;

    //   // Update UI notify the user they can add to home screen
    //   showInstallPromotion();
    // });
    // function showInstallPromotion() {
    //   // Display the UI for the user to add the app to the home screen
    //   const installPrompt = document.getElementById("install-prompt");
    //   installPrompt.style.display = "block";

    //   // Handle the click event on the install button
    //   const installButton = document.getElementById("install-button");
    //   installButton.addEventListener("click", () => {
    //     // Show the install prompt
    //     deferredPrompt.prompt();

    //     // Wait for the user to respond to the prompt
    //     deferredPrompt.userChoice.then((choiceResult) => {
    //       if (choiceResult.outcome === "accepted") {
    //         console.log("User accepted the install prompt");
    //       } else {
    //         console.log("User dismissed the install prompt");
    //       }

    //       // Clear the deferred prompt variable
    //       deferredPrompt = null;
    //     });

    //     // Hide the UI for the user to add the app to the home screen
    //     installPrompt.style.display = "none";
    //   });
    // }

    setLdata(localStorage.getItem("datas"));
    let url = `https://23fuu3bhr6.execute-api.eu-north-1.amazonaws.com/Prod/vendor/cards`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("ptoken"),
      },
      body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {setData(data.items);console.log(data,"API DATA")})
    .catch(error => console.error(error,"error"));
  }, []);

  const handleSubmit = () => {
    localStorage.setItem("datas", data);
    Guard.signIn(email, password).then((res)=>{
    localStorage.setItem(
        "ptoken",
        res?.signInUserSession?.idToken.jwtToken
      );

      console.log(res?.signInUserSession?.idToken.jwtToken)
    })
  };

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          {/* <input type="text" value={data} onChange={(e)=>{setData(e.target.value)}}/>
      <button onClick={handleSubmit}>SUBMIT</button> */}

          {/* your saved data is  <p>{ldata && ldata}</p> */}

          <input
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={handleSubmit}>SUBMIT</button>
          {data&& data.map((i)=>(
           i.cn
  
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

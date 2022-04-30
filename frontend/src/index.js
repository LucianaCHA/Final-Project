import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/store";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
	<body>
	   <div class="contenedor">
         	<Provider store={store} class="contenedor">
    		<React.StrictMode>
			<Auth0Provider
				domain="dev-8dlcilpo.us.auth0.com"
				clientId="dNHRYGKTvuFiLFozoy5y7vUawIXvbpZc"
				redirectUri={window.location.origin}>
			
			<App />
			</Auth0Provider>
		</React.StrictMode>
     	</Provider>,
		</div>

	
    </body>,

	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

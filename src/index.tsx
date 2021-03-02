import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import * as serviceWorker from './serviceWorker';

/* AWS Amplify */
import awsconfig from './aws-exports';
import Amplify from 'aws-amplify';
import { Auth, Hub } from 'aws-amplify';

import { Provider, useStore } from 'react-redux'
import { createStore } from 'redux'
import axios from 'axios';
import { refresh } from 'ionicons/icons';

Amplify.configure(awsconfig);

function display()
{

    Auth.currentUserInfo()
    .then(data => {
        if (data) {
            let user = data.attributes;
            user.premium = {
                "boulangerie": false,
                "patisserie": false,
            };
            user.aws_id = data.username;
            user.endpoint = "https://mtsqmmjcs3.execute-api.eu-central-1.amazonaws.com/dev";
            user.apiKey = "4hCTz2V9DW1W8rpeIk9r4v8lGKrQXOC4GdwZpXUi";
            user.quizApi = 'http://15.188.52.134/api/recursive?parent_id=';
            user.publicUrl = 'http://15.188.52.134/';
            const setUser = (state = {}, action: any) => {
                state = action.user;
                return state;
            };
            const store = createStore(setUser);
            const setData = (userData: any) => ({
                type: 'SET_USER',
                id: 0,
                'user': userData});
            store.dispatch(setData(user));
            axios({
                method: 'get',
                url: user.endpoint + "/handleCode?aws_user_id=" + user.aws_id,
                headers: { 'x-api-key': user.apiKey }
            }).then(response => {
              if (response.data.boulangerie) {
                  const setData = (userData: any) => ({
                    type: 'SET_USER',
                    id: 0,
                    'user': userData});
                    user.premium = response.data;
                    store.dispatch(setData(user));
                    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
              }
            }).catch(err => {});
            ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
        } else {
            ReactDOM.render(<Login />, document.getElementById('root'))
        }
    })
    .catch(err => ReactDOM.render(<Login />, document.getElementById('root')));
}
// Listening for auth event and reload view acording to event : On log in, show app, On logout, show login page
Hub.listen('auth', (data) => {
    if (data.payload.data) {
        if (data.payload.event === "signIn") {
            axios({
                method: 'post',
                url: "https://mtsqmmjcs3.execute-api.eu-central-1.amazonaws.com/dev/handleuser",
                headers: { 'x-api-key': "4hCTz2V9DW1W8rpeIk9r4v8lGKrQXOC4GdwZpXUi" },
                data: {
                    "aws_id": data.payload.data.username,
                    "nickname": data.payload.data.attributes.nickname,
                    "phone": data.payload.data.attributes.phone_number,
                    "mail": data.payload.data.attributes.email,
                    "gender": 'monsieur',
                    "first_name": data.payload.data.attributes.name,
                    "last_name": data.payload.data.attributes.family_name,
                }
            }).then(response => {

            }).catch(err => {});
            // ReactDOM.render(<App />, document.getElementById('root'));
        }/** else if (data.payload.event === "signOut") {
            ReactDOM.render(<Login />, document.getElementById('root'))
        }**/
        display();
    }
});

display();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

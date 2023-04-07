## Description

This is a short NodeJS & Firebase API Rest CRUD

## Run locally

You'll need to create a credentials.json file which will contain all the private information necessary to connect to your Firebase account and database.<br>
To do that, create a Firebase account and project (https://firebase.google.com/). In this project, on the Firestore Database, create a new collection called "animals".
Then in project settings, go to service accounts and click on "generate a new private key". Download and rename the file "credentials.json".

You can now clone this repository and place your json file inside it. Congratulations, you can now GET, PATCH, POST & DELETE animals in your firebase database !

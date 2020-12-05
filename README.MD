# CabBuddies / Travel Buff

## Mobile App

### [Client Mobile App for CabBuddies](https://github.com/CabBuddies/ClientMobileApp)

### Setup

- clone the repository
- run `yarn install` in a terminal on the project root.
- this shows up the expo log and opens a new window in your browser.
- Install Expo mobile app and scan the QR code on the browser.
- voila, enjoy the app.

### scripts

```json
yarn run start: "expo start", starts the project normally
yarn run android: "expo start --android", starts on an android device/emulator
yarn run ios: "expo start --ios", starts on an iOS device/emulator.
yarn run web: "expo start --web", starts on browser.
yarn run refresh-nro: "yarn remove node-rest-objects && yarn add CabBuddies/Node-REST-Objects#master && yarn start",
yarn run eject: "expo eject"
```

### Dev Dependencies

- Expo
- expo-cli
- Reactatoron
- typescript

## Microservices - Node JS

### [Node-Library](https://github.com/nihalkondasjsu/Node-Library)

- General purpose library for node application development. Designed and developed by our team.

#### NL-Setup

- clone this repository(skip this step if using zip files).
- get to the root folder of this project
- run `npm install`

### [Node-REST-Objects](https://github.com/CabBuddies/Node-REST-Objects)

- General purpose library for robust communication between client side mobile app and the Microservices.

#### NRO-Setup

- clone this repository(skip this step if using zip files).
- get to the root folder of this project
- run `npm install`
- additionally, run `npm run refresh-nl`

### [UserManagement](https://github.com/CabBuddies/UserManagement/tree/nihal-branch)

- User management Microservice for the CabBuddies/Travel Buff app.

#### UM-Setup

- clone this repository(skip this step if using zip files).
- get to the root folder of this project
- run `npm install`
- additionally, run `npm run refresh-nl`

### [Node-Queries](https://github.com/CabBuddies/Node-Queries)

- Query Platform Microservice for the CabBuddies/Travel Buff app.

#### TQ-Setup

- clone this repository(skip this step if using zip files).
- get to the root folder of this project
- run `npm install`
- additionally, run `npm run refresh-nl`

### [Node-Groups](https://github.com/CabBuddies/Node-Groups)

- Travel Groups Platform Microservice for the CabBuddies/Travel Buff app.

#### TG-Setup

- clone this repository(skip this step if using zip files).
- get to the root folder of this project
- run `npm install`
- additionally, run `npm run refresh-nl`

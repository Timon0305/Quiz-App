# ionic-react-test
## Getting started :
```bash
brew install npm
npm install -g @ionic/cli cordova-res
npm install
```
Ionic react components : https://ionicframework.com/docs/api/action-sheet

## Web version for devellopment purpose
```bash
npm run start
```
Go to http://localhost:3000/

## Launching android :
Install and launch Android studio : https://developer.android.com/studio
```bash
npm run build
npx cap sync
npx cap open android
```

## Launching ios :
Install xcode
```bash
npm run build
npx cap sync
npx cap open ios
```
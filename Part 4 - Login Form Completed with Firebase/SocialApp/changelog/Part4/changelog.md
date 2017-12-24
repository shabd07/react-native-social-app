#Changelog
1. npm install --s redux-thunk. [Read this to understand better what redux-thunk is all about](https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559).
2. npm install --s firebase.
3. react-native link react-native-vector-icons. [Click here to learn more on how to setup](https://github.com/oblador/react-native-vector-icons).
4. Added configuration for firebase in setup.js. Note that you have to set up your own Firebase console then get the config codes for your specific firebase project and paste it in the correct location in setup.js.
5. Added Log-in / Sign-up Switcher. By now you should have gotten used to Redux, and thus have awareness on the codes needed to be added and where they are being added. From which you can then verify the exact codes used.
6. Replaced OnLoginPressed with an asynchronous firebase function. Check ./actions/auth.js for more details.
7. Added LoginSuccess and Login Failure actions and states. Updated logginIn action to also reset the various inputs
8. Added Error Message below Login Button.
9. Disabled Login Button when at least one of email and password are not keyed in yet.

#Preview
![Preview Gif](./part4.gif)

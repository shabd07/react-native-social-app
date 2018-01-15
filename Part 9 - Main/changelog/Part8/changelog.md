# Part 8
## Changelog
1. Added Submit Button in CreateProfile.js (leave the onPress event handler aside first)
2. Created new states and updated the reducers to have control of the states. These states are meant to allow for linking the complete/incomplete status to colour changes.
3. In CreateProfile.js, linked the newly created ____Valid props to the component. Updated buttonStyle. Also, for each tab's styling, referenced and destructured buttonStyle to include backgroundColor through validity props.
4. Created an overall allValid state that allows Submit button to work only when all tabs are properly filled, else an alert will show instead.
5. npm installed react-native-router-flux
6. In setup.js, added Router, Stack and Scene within the tags of StyleProvider where our single main Component was supposed to be at. (Ignore Main and SplashScreen first and take it that our main Component is the LoginForm.)
7. Update our OnLoginPressed action to include router-flux actions to swap to CreateProfile after signing up completed. 
8. Now the app will require you to be signed in to do up a profile, necessary so that a user info actually exists which we will need to use to create a database and storage account for that specific user on the firebase cloud.
9. As an extention to point 8, link user from authState to the component CreateProfile.
10. We now add a function for our Submit button event handler, by destructuring various prop items and passing them into the function. We shall do up the function inside the /actions/profile.js then import it to CreateProfile so the event handler recognises the function.
11. Added firebase database back-end to our function. If failed to upload, alert an error, and user can try submitting again. If succeed, go on to uploading image.
12. To upload images, we make use of react-native-fetch-blob, so do an npm install followed by a react-native-link.
13. Under /actions/profile.js, we import the module, and add some boilerplate at the top. Next we create an UploadImage function to be called only after a successful database upload.
14. Like the submit function, we have alerts depending on the success or failure.
15. Now we would like to create a Main component for future events that occur after user has signed in. First we create a template component.
16. We can update the uploading functions in CreateProfile to route to Main only after the consecutive successful uploads.
17. Back to setup.js, we want the app to detect if the user is already logged in earlier and has yet to log out. In such a case, we route the user straight to Main without having to log in. Else we bring the user to the LoginForm instead. To do so, this has to be done when setup.js first mounts.

## Preview
![Preview Gif](./part8.gif)

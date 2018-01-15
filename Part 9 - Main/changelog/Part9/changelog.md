# Part 9
## Changelog
1. First, we are missing an input in CreateProfile - MyAge. To do so, the following things need to be updated - the UI in CreateProfile.js, the actions/reducers/props and the styling and dimensions of the updated popUp box
2. Next, we update our Main.js, adding various Components and styles that are self-explanatory (OptionsTab is our custom Component imported from a different file, which we focus later on).
3. Suppose we have closed the app, but our status is still logged in, firebase already auto logs in for us. However, our props are reseted to INITIAL_STATE. As such, upon Main being mounted, we would like to retrieve User UID and his/her own data, which will be useful later on, which we then create a couple of actions and reducers to do so. Actions are placed in main.js whereas since reducers need access to the already created states in auth and profile, we place the reducers there instead.
4. Now we create an OptionsTab custom component and place a reference/instance inside the options tab in Main.js.
5. Our OptionsTab has 2 purposes as of now, one to edit profile and the other to log out. As such, we first set up the buttons and their stylings
6. For the log out button, we import firebase module and simply call the signOut() method.
7. Meanwhile, for the Update Profile button, we use Actions to transit ourselves to the Profile scene. This is where having retrieved the profile and user states in point 3 becomes useful, as now when the user edits profile, his/her original info barring the image is downloaded and he/she can edit from there.

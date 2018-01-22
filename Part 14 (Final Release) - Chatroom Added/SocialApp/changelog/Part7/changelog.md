# Part 7
## Changelog
1. What we want our users to do in this page is to fill up all these details, and then clicking a confirm button that will send data up to the server (which we will add in later parts)
2. As such, our next actions will be to create states to stores details of the user inputs, before finally pushing them onto Firebase in the next part. Hence back-end will be left for a later part for now, while our focus will be on getting the redux settings up.
3. Added basic redux codes for the 'Name', 'Bio', 'Gender' popUps.
4. Added redux for 'Age' that uses multi-slider, as well as linked the states to the text "Age Range: ".
5. npm install react-native-image-picker@latest --save (See the github/npm for more details on installation since there is a need link the assets to the app)
6. In the Image popUp component, added a TouchOpacity (not nativebase's button that has its own styling, since we just need a clickable wrapper for our image).
7. Having done the front end UI, we need to supply the button's eventHandler with an action to open up the ImagePicker. As the ImagePicker event is Promise-based i.e. depending on what errors we get, or what good outcomes we obtained, there has to be a unique action to be dispatched. In such a situation, redux-thunk comes into mind, as we manually pass dispatch into the action creator and then dispatch actions accordingly.
8. For our imageSource, we set a default image which is saved inside assets/images/
9. We want to keep our user's image square and uniform, so we allow for editing using iOS's native image cropper. Nevertheless, we need to ensure the user crops a full square rather than one with only full height/width, thus adding those errors.


## Preview
![Preview Gif](./part7.gif)

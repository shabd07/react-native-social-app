# Part 5
## Changelog
1. npm install --s native-base for a different theming capability.
2. Ejected native-base theme and placed StyleProvider on top of nachos-ui theme in setup.js
3. npm install react-native-animatable --save
4. Added fontFamily Kelson Sans, as well as buttons and bubble into CreateProfile. To install a custom font, you need to first create an assets folder at the root of your project, create a fonts folder, then copy the custom font file into the fonts folder. Following which, add the rnpm segment code from package.json (which basically states the path which you need to perform a link with). Finally perform a react-native link command on Terminal. And the fonts will be linked up automatically.

### Newly created ChangeProfile.js
5. First we swapped LoginForm in setup.js to CreateProfile temporarily so any testing on CreateProfile can be seen. We will be linking the pages up in a later part.
6. First created a Bubble using Nachos-UI and 5 buttons below from Native-Base. 
7. Adding stylings for the 6 items such that they will be distributed evenly in the screen.
8. Having made 6 items (5 buttons and 1 bubble) wrapped inside a View component, we now want to animate the items. To do so, we can use 2 different methods.
* Use Animatable.CreateAnimatableComponent() method 
* Use the built-in Animatable.View to wrap around your component.
We have chosen to use the latter method as it avoids technicalities. Despite this, good programmers are likely to adopt the first approach as it significantly shortens and simplifies the code.
9. Added ref and animation to the various items.
10. Our next intentions are to (1) hide the current buttons and (2) allow the corresponding section to pop up upon clicking a button. We shall focus on the first intention. To do so, add an eventListener and pass the argument this.refs in. Animate the components through the refs argument.
11. Now focusing on the second intention, we would like to create pop-ups. To create a pop-up, logically speaking, we can structure our code in the following method.
* We can first set our pop-ups to be in the same layer as the button items, but initially outside the screen. 
* This is done by just adding the pop-up code below the buttons, then using the position: 'absolute' styling to separate the stylings from the buttons. 
* However, this requires us to program our own animation that is specific to the component's position, size etc. 
12. Instead we would like to be able to use the Animatable module. We shall employ the following trick instead.
* Likewise, set position to be absolute, but rather than placing the pop-up outside the screen, we will centralise it instead. 
* Set initial opacity of the pop-up to be 0.0 so that when you load the screen, the pop-up cannot be seen. Next, set zIndex to be an integer smaller than the main buttons so that the main buttons will not be blocked and become unclickable.

13. Regarding our pop-up, we do not want to be constantly re-creating a pop-up component for every option. Instead, we will recycle the pop-up View (and its styles/animations), but instead load its appropriate component as a child-prop, which we can then break the components into different files for better organisation.
14. But first we will need to add a switch in our eventListener that acts according to the button clicked. The easiest way to control is by using integers from 0 to 4 as the cases, and pass a value as an argument into our eventListener.

## Preview
![Preview Gif](./part5.gif)

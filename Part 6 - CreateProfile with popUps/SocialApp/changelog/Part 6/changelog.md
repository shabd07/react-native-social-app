# Part 6
## Changelog
1. npm install --s @ptomasroos/react-native-multi-slider
2. Added unique components to each button, but without redux and back-end features yet (will be implemented in the next part)

## Understanding the logical process involved
1. Our current intention will be to set-up unique popUp designs for each button, but using the same popUp component that we had created in Part 5.
2. To do so, the key thing we need to do is to register the btnNo that we click such as Name or Age as a state. This allows us to receive instant updates on the latest button clicked, so the popUp knows what to display. 
3. Doing so is one half of the solution, whereas the other half involves embedding a method inside the popUp component, a very useful feature of React (which you would have seen even in previous parts and this is meant as a revision) that allows for greater dynamics in Component designing. 
> To elaborate on how a method is being used, what is usually done (and can be seen) is a method being defined within the class, in this case currentPopUp(). Depending on the state btnNo (once again, it is a simple redux activity), a corresponding Component will be returned and rendered. 

> ### Notes:
>- Perhaps what you need to take note is the location where you dispatch the action to change the btnNo state. You can either place it inside the button's eventHandler then call the function popUp to get the popUp to appear. OR you can do it inside the function popUp (which is our choice here), in which case you would have to pass the action creator as an argument into the function so it has access to the action creator outside of the CreateProfile Component. 
>- We have replaced the switch and btnNo from a zero-indexing to one-indexing, so as to leave 0 for when the popUp is empty. 

4. Having set the correct popUp to appear, we also need to ensure that the size of the popUp fits the components embeded within. Since the sizes are bound to be different, we will make use of the animation "transitionTo()" to transform the size of the popUp to fit the corresponding component. Note that zIndex is raised to 2 so as to be on a layer above the main buttons and be clickable. 
5. Now that we are able to display the popUps, we would like to perform a similar process for the reverse - removing the popUp upon confirmation of the details in the component. While removing the popUp does involve the same animations regardless of button clicked, as the various popUps have different number and types of variables that needs to be obtained, it is much more straightforward to have the confirm buttons linked to a unique eventHandler than the same eventHandler like before (i.e. popUp()). As such, each unique eventHandler will run the same animation function removePopUp(), followed by their additional requirements.


## Preview
![Preview Gif](./part6.gif)

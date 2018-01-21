# Part 12
## Changelog
1. Updated minor fix on 'Nice Picture' not being displayed after signing in and updating profile image, by adding imageError state to line 65 in profile.js
2. Replaced all componentDidMount() lifecycle methods to componentWillMount(). 
3. In auth reducers, case(LOGGING_IN), removed the switchStatus state change that caused the bug sign-up fail -> switcher still at sign-up but functions at log-in
4. Added actions/reducers/states to deactivate the Main when logging on. 
5. Added actions/reducers/states to deactivate the Deck when Main is mounted to fix the following bug:
- Suppose you placed the deactivation when logged out, when someone logs out while the Deck data is still being loaded in the background, when it is loaded, the Deck will get switched from spinner to the deck swiper.
- Logging back in results in Deck component being mounted, so deck = [], and next is the rendering of the component which returns the Deck itself. Since new data has yet to be received, user will see the renderEmpty component.
> This is a temporary fix as in theory, if the user logs in faster than the first data loads, then the same issue will arise. But practically it is unlikely, unless user connection is bad.
5. Added like() callback for onSwipeRight event handler, as well as the swipeRight button.
6. Under the like() method, we are carrying out what is stated below in pseudocode form. This will be how we control the match system. 
>Given persons A and B.
>Step 1: A likes B => add to path /pairings/uid(A)/ with value uid(B): msgid
>Step 2: B likes A back => check that in A's pairings, there is B => if there is => change value to A, create uid(A): msgid in /pairings/uid(B) create message database under the /messages/msgid
>Note: msgid will be a string 'A_B' for uniqueness.
7. Our like() method also deletes from Deck
8. Changed deck = [] from a global variable to a state so that our DeckSwiper can recognise the state change and update accordingly.
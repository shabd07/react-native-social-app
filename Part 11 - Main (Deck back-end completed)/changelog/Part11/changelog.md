# Part 11
## Changelog
### With the intention of adding back-end support for DeckSwiper, it is best to come up with a strong pseudocode for the various mechanisms required, especially given that we are working with server data fetching, we need to have queue in mind for our aynchronous actions calling.
___A. Firebase actions___
1. From firebase database, we open up a reference at /userkey/ and take a snapshot
2. For each object in the snapshot, we just need the key. Take the keys and for an array, under the following condition: if keys > 10 we will want to load up 10 cards for now (Only when the deck is empty => then unmount this component and reload deck. *We need to remove the keys as well from the array!!*), else add all cards to the deck.
3. Then we attempt to retrieve images. Once all images retrieved then dispatch a done signal.
>Note that RNFetchBlob fires the events synchronously (like the firebase database but since database is much faster, this is not of our concern). As such, the event that finishes last varies each time. To overcome this issue, we first try to launch the dispatch only at the last event triggered. Furthermore, we add a 3 second delay (using react-native-timer), although this is a temporary solution merely.

___B. Loading Deck Component___
1. While Deck is still loading at the componentDidMount() lifecycle method, we switch the Deck display to a Spinner. Only after done signal is dispatched, do we turn the Deck on, so that the Deck is rendered after completition and therefore the dataSource is complete before sent into the component as a parameter. Hence a deck_loaded state is created.
2. At the componentDidMount() in Deck, we also realise that to make a reference to the database and storage, we need user uid so when pushing the keys, we do not add our own profile for display. Consequently, we need to make sure that the user data is first loaded into the state before mounting the Deck component. Hence a main_loaded state is created. 

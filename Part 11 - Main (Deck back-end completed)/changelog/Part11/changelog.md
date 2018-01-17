# Part 11
## Changelog
### With the intention of adding back-end support for DeckSwiper, it is best to come up with a strong pseudocode for the various mechanisms required, especially given that we are working with server data fetching, we need to have queue in mind for our aynchronous actions calling.
___A. Firebase actions___
1. From firebase database, we open up a reference at /userkey/ and take a snapshot
2. For each object in the snapshot, we just need the key. Take the keys and for an array, under the following condition: if keys > 10 we will want to load up 10 cards for now (Only when the deck is empty => then unmount this component and reload deck. *We need to remove the keys as well from the array!!*), else add all cards to the deck.
3. Then we attempt to retrieve images. Once all images retrieved then dispatch a done signal

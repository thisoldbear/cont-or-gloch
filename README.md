# cont-or-gloch

A Twitter bot that tweets the time in "CONT", triggered by [Cloud Functions for Firebase](https://firebase.google.com/docs/functions).

[@cont_or_gloch](https://twitter.com/cont_or_gloch)

## Meaning

‘Cont’ is a Welsh term of endearment. In Caernarfon there is a widely used term that often causes confusion or offence to out of towners. But it’s not what it sounds like. No one is sure where it comes from — some historians speculate it comes from the Roman fort Se-gont-ium (g’s mutate into c’s in Welsh), around which the town was built. In any case, don’t be offended when greeted with “Iawn cont?” (Alright, cont?) - [Matador Network](https://matadornetwork.com/life/13-things-everyone-wales-explain-outsiders/)

## Dev

`npm` commands are run in the `functions` directory.

### Keys

Add Twitter API keys to `.env` (see `.env.example`).

Add Firebase service account JSON file in `functions/src`.

Run `npm run keys` to generate the JSON files (which are copied into `functions/lib` so they are bundled when deployed). This is also run by the `build` task.

### Firebase emulation

`firebase` commands are run in the root directory.

To start the emulator, run:

`firebase emulators:start`

In a second terminal, run:

`firebase functions:shell`

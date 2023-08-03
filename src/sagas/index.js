/**
 * Root sagas:
 *      - In each module, we will only export array of sagas, not yield them yet.
 *      - In root sagas, we combine all sagas in one array and run them all for better performance.
 */
import { all } from 'redux-saga/effects';
import {enabledModules} from "../config";

let allSagas = [];
enabledModules.forEach(modName => {
    const modSaga = require(`../modules/${modName}/sagas`).default;
    allSagas = [
        ...allSagas,
        ...modSaga
    ];
    // console.log("All sagas after ", modName, ": ", allSagas, ". Mod saga: ", modSaga);
});

export default function* rootSaga() {
    yield all(allSagas)
}
import {takeLatest, call,put,all } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import {
    firestore,
    convertCollectionsSnapshotToMap
  } from '../../firebase/firebase.utils';
  import {fetchCollectionsSuccess,fetchCollectionsFailure} from './shop.actions';


export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        //const collectionsMap = yield convertCollectionsSnapshotToMap(snapshot); //this is also fine
        const collectionsMap  = yield call(convertCollectionsSnapshotToMap,snapshot) //we write this this way in case this call takes longer than expeced
         
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}
export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
} 

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}
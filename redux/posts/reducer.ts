import { combineReducers } from 'redux';

import list from './list/reducer';
import newPost from './new/reducer';
import single from './single/reducer';

export default combineReducers({ list, newPost, single });

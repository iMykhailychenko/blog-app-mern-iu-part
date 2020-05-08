import { TOGGLE_LOCALE, ActionTypes } from '../../types';
import { setDataToLocalStorage } from '../../helpers/storage';

const setData = (store: any) => (next: (action: ActionTypes) => any) => (
  action: ActionTypes,
) => {
  next(action);

  switch (action.type) {
    case TOGGLE_LOCALE:
      setDataToLocalStorage('locale', action.payload);
      break;
  }
};

export default setData;

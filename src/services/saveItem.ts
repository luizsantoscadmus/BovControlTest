import {IChecklist} from '../store/realm/schema';
import {BASE_URL} from './utils';

/**
 * Saves item on the API
 */
function saveItem(data: IChecklist) {
  return fetch(`${BASE_URL}checklists`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export default saveItem;

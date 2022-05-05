import {IChecklist} from '../store/realm/schema';
import {BASE_URL} from './utils';

/**
 * Updates item on the API
 */
function updateItem(item: IChecklist) {
  return fetch(`${BASE_URL}checklists/${item.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: item.type,
      had_supervision: item.had_supervision,
      farmer: item.farmer,
      from: item.from,
      to: item.to,
      amount_of_milk_produced: item.amount_of_milk_produced,
      number_of_cows_head: item.number_of_cows_head,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }),
  });
}

export default updateItem;

import ChecklistSchema, {IChecklist} from '../store/realm/schema';
import {BASE_URL} from './utils';

function saveDateInRemote(realm: Realm, list: IChecklist[]) {
  // Update
  // 1 - check the local elements that are newer
  // 2 - update the elements on the API
  let itemsToUpdate = [];

  // Insert
  // 1 - list the elements no saved
  // 2 - save the elements on the API
  let itemsLocalOnly: IChecklist[] = [];
  let list2 = realm
    .objects<IChecklist>(ChecklistSchema.schema.name)
    .filtered(`id > ${list.length}`);

  list2.forEach(item => {
    itemsLocalOnly.push({
      id: item.id,
      type: item.type,
      had_supervision: item.had_supervision,
      farmer: item.farmer,
      from: item.from,
      to: item.to,
      amount_of_milk_produced: item.amount_of_milk_produced,
      number_of_cows_head: item.number_of_cows_head,
      created_at: item.created_at,
      updated_at: item.updated_at,
    });
  });

  console.log('list2', list2);

  if (itemsLocalOnly.length > 0) {
    fetch(`${BASE_URL}api/checklistCollection`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemsLocalOnly),
    });
  }
}

export default saveDateInRemote;

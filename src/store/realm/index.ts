import {createRealmContext} from '@realm/react';

import ChecklistSchema from './schema';

export default createRealmContext({
  schema: [ChecklistSchema],
  // deleteRealmIfMigrationNeeded: true,
});

import ChecklistSchema from '../store/realm/schema';

/**
 * Use this to save the data retrived from the API locally when first starting
 */
function saveDataInLocal(realm: Realm, list: any[]) {
  realm.write(() => {
    list.forEach(item => {
      let items = realm
        .objects(ChecklistSchema.schema.name)
        .filtered(`id == ${item.id}`);

      if (items.length === 0) {
        realm.create(
          ChecklistSchema.schema.name,
          ChecklistSchema.generate(item, realm),
        );
      }
    });
  });
}

export default saveDataInLocal;

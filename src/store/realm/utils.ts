import ChecklistSchema from './schema';

export function autoIncrement(realmInstance: any) {
  const lastUser = realmInstance
    .objects(ChecklistSchema.schema.name)
    .sorted('id', true)[0];
  const highestId = lastUser == null ? 0 : lastUser.id;
  return highestId == null ? 1 : highestId + 1;
}

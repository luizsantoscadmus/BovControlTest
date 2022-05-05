import {IChecklist} from '../../../store/realm/schema';

export interface IItemProps {
  item: IChecklist;
  onPress: (item: IChecklist) => void;
}

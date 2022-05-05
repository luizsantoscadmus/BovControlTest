import moment from 'moment';
import {autoIncrement} from './utils';

export type TChecklistType = 'BPA' | 'Antibiotico' | 'BPF';

export interface IChecklist {
  id?: any;
  type: TChecklistType;
  amount_of_milk_produced: number;
  number_of_cows_head: number;
  had_supervision: boolean;
  // Suggestion: change property name to 'farm'
  farmer: IFarmer;
  from: IPerson;
  to: IPerson;
  created_at?: string;
  updated_at?: string;
}

export interface IFarmer {
  name: string;
  city: string;
}

export interface IPerson {
  name: string;
}

export default class ChecklistSchema {
  static generate(data: IChecklist, realmInstance: any) {
    return {
      id: autoIncrement(realmInstance),
      ...data,
      created_at: data.created_at || moment.utc().format(),
    };
  }

  static schema = {
    name: 'Checklist',
    primaryKey: 'id',
    properties: {
      id: 'int',
      type: 'string',
      amount_of_milk_produced: 'int',
      number_of_cows_head: 'int',
      had_supervision: 'bool',
      farmer: '{}',
      from: '{}',
      to: '{}',
      created_at: 'string',
      updated_at: 'string?',
    },
  };
}

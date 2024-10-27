export interface IPersonalData {
  id: string;
  isActive: boolean;
  name: string;
  surName: string;
  documents: string;
}

export interface IWorkRecord {
  id: string;
  profile: IPersonalData;
  workDate: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  status: string;
}

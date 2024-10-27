import { IPersonalData, IWorkRecord } from "../../interface";

export const recordType = (data: IWorkRecord[] | IPersonalData[]): string => {
  if (!Array.isArray(data) || data.length === 0) {
    return "Unknown";
  }
  const firstRecord = data[0];

  if ("startTime" in firstRecord) {
    return "WorkRecord";
  } else if ("name" in firstRecord) {
    return "PersonalData";
  }

  return "Unknown";
};

export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  dateOfBirth: string;
  dateOfHire: string;
  married: boolean;
  avatar: string;
}
//#toFix??
export function sortbyDescDate(objA: IEmployee, objB: IEmployee) {
  return new Date(objB.dateOfHire).getTime() - new Date(objA.dateOfHire).getTime();
}

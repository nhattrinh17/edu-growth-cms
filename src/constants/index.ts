export * from './bank.statics';
export * from './message';

export const StatusPaymentTranSaction = {
  processing: 0,
  success: 1,
  cancel: 2,
};

export const TypePaymentTranSaction = {
  deposit: 0,
  withdrawMoney: 1,
};

export const TypeGamePoint = {
  main: 0,
  sub: 1,
};

export const typeNotification = {
  System: 'system',
  User: 'individual',
};

export const TypeSort = {
  DESC: 'DESC',
  ASC: 'ASC',
};

export const TypeUser = {
  Tutor: 'Tutor',
  Admin: 'Admin-CMS',
};

export const Status = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
};

export const StatusClass = {
  stillEmpty: 0, // Trống,
  received: 1, // Đã có người nhận,
  assignedClass: 2, // Đã giao lớp
  cancelClass: 3, // Hủy lớp
};

export const TypeRequireClass = {
  student: 0,
  maleStudent: 1,
  femaleStudent: 2,
  lecturers: 3,
};

export const GenderStudent = {
  Male: 0,
  Female: 1,
};

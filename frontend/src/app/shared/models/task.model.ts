export interface Task {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  groupId: string;
  groupName: string;
  groupColor: string;
  isCompleted: boolean;
  createdAt: Date;
}

export interface Group {
  id: string;
  name: string;
  color: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
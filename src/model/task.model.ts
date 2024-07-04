export interface Task {
  id: number | string;
  title: string;
  status?: 'Completed' | 'In progress';
  priority: 'Low' | 'Medium' | 'High';
  description?: string;
}

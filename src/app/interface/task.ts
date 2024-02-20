export interface Task {
   id?: number; // Optional
   title: string;
   description: string;
   priorityLevel: string;
   status: string;
   dueDate: Date;
}

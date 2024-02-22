export interface Task {
    id: string;
    createdAt: Date;
    title: string;
    content: string;
    isDone: boolean;
    employeeId: string;
    employee: {
        email: string
    }
} 

export interface TaskDetailPageProps {
    params: {
        id: string
    }
}

export interface sessionAuthProps {
    sessionAuth: {
      session: { user: {} } | null;
      status: string;
    };
}

export interface FormData {
    title: string;
    content: string;
    userEmail: string
}

export interface userSelectProps {
    id: string,
    email: string
}
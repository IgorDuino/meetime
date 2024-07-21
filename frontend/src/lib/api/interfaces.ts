export interface User {
    id: number;
    username: string;
}

export interface Meeting {
    id: number;
    title: string;
    description: string | null;
    access_code: string;
    created_by: string;
    created_at: string;
    timeslots: TimeSlot[];
    users_time_slots: UserTimeSlot[];
}

export interface TimeSlot {
    id: number;
    meeting: number;
    start_time: string;
    end_time: string;
}

export interface UserTimeSlot {
    id: number;
    user: string;
    timeslot: number;
}

export interface AuthResponse {
    token: string;
}

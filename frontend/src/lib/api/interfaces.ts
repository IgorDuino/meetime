export interface User {
    id: number;
    username: string;
}

export interface BestTimeSlot {
    id: number;
    start_time: string;
    end_time: string;
    users: string[];
}

export interface Meeting {
    id: number;
    title: string;
    description: string | null;
    call_link: string | null;
    access_code: string;
    created_by: string;
    created_at: string;
    timeslots: TimeSlot[];
    best_time_slots: BestTimeSlot[];
    users_time_slots: UserTimeSlot[];
}

export interface MeetingCreate {
    title: string;
    description: string | null;
    start_date: string;
    end_date: string;
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
    key: string | PromiseLike<string>;
    token: string;
}

export interface JoinLeftMeetingRequest {
    timeslot_id: number;
}
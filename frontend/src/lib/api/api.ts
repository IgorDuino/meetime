import {  type Meeting ,type AuthResponse } from './interfaces';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export function isAuthenticated(): boolean {
  const token = getToken();
  return token !== undefined;
}

export function clearToken(): void {
    localStorage.removeItem('token');
}

const apiRequest = async <T>(url: string, method: string, body?: unknown, useToken = true): Promise<T> => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (useToken && isAuthenticated()) {
        headers.Authorization = `Token ${getToken()}`;
    }
    console.log(localStorage)

    const response = await fetch(`${API_BASE_URL}${url}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const error: unknown = await response.json();
        throw new Error(JSON.stringify(error) || 'API request failed');
    }

    return response.json() as Promise<T>;
};

export const login = async (username: string, password: string): Promise<string> => {
    const response = await apiRequest<AuthResponse>('/auth/login/', 'POST', { username, password }, false);
    return response.key;
};

export const fetchMeetings = async (): Promise<Meeting[]> => {
    return apiRequest<Meeting[]>('/meetings/', 'GET');
};

export const fetchMeeting = async (id: number, token: string, accessCode?: string): Promise<Meeting> => {
    const url = accessCode ? `/meetings/${id}/?access_code=${accessCode}` : `/meetings/${id}/`;
    return apiRequest<Meeting>(url, 'GET', token);
};

export const createMeeting = async (meetingData: Partial<Meeting>): Promise<Meeting> => {
    return apiRequest<Meeting>('/meetings/', 'POST', meetingData);
};

// // Join a meeting with a specific time slot
// export const joinMeeting = async (id: number, joinRequest: JoinMeetingRequest): Promise<void> => {
//     await apiRequest<void>(`/meetings/${id}/join/`, 'POST', joinRequest);
// };

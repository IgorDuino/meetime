import {  type Meeting ,type AuthResponse, type JoinLeftMeetingRequest } from './interfaces';

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

export const fetchMeetings = async (participant=false): Promise<Meeting[]> => {
    const url = participant ? '/meetings/?participant' : '/meetings/';
    return apiRequest<Meeting[]>(url, 'GET');
};

export const fetchMeeting = async (id: number, accessCode?: string): Promise<Meeting> => {
    const url = accessCode ? `/meetings/${id}/?access_code=${accessCode}` : `/meetings/${id}/`;
    return apiRequest<Meeting>(url, 'GET');
};

export const createMeeting = async (meetingData: Partial<Meeting>): Promise<Meeting> => {
    return apiRequest<Meeting>('/meetings/', 'POST', meetingData);
};

export const joinMeeting = async (meetingId: number, data: JoinLeftMeetingRequest): Promise<void> => {
    await apiRequest<void>(`/meetings/${meetingId}/join/`, 'POST', data);
};

export const leftMeeting = async (meetingId: number, data: JoinLeftMeetingRequest): Promise<void> => {
    await apiRequest<void>(`/meetings/${meetingId}/left/`, 'POST', data);
};
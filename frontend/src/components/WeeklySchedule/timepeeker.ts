export enum TimePeekerSlotType {
    Busy = 'Busy',
    Available = 'Available',
}

type TimeSlots = Record<string, TimePeekerSlotType>;

export type WeeklySchedule = Record<string, TimeSlots>;

function defaultWeeklySchedule(): WeeklySchedule {
    const schedule: WeeklySchedule = {};
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach(day => {
        schedule[day] = {}; 
        ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"].forEach(time => {
            (schedule[day]!)[time] = TimePeekerSlotType.Available;
        });
    });
    return schedule;
}

export type TimePeekerProps = {
    schedule: WeeklySchedule;
    onSlotClick: (day: string, time: string) => void;
};

export const schedule = defaultWeeklySchedule();


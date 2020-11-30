import { BriefcaseOutline, Car, PartyPopper, Home, Calendar, Cog } from "mdue";

export const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const daySufix = ["st", "nd", "rd", "th"];

export const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const taskTypes = {
    work: {
        id: 0,
        color: "bg-blue-400",
        icon: BriefcaseOutline,
        iconColor: "bg-blue-500",
    },
    travel: {
        id: 1,
        color: "bg-yellow-500",
        icon: Car,
        iconColor: "bg-yellow-600",
    },
    fun: {
        id: 2,
        color: "bg-green-400",
        icon: PartyPopper,
        iconColor: "bg-green-500",
    },
};

export const navItems = {
    home: {
        id: 0,
        icon: Home,
    },
    calendar: {
        id: 1,
        icon: Calendar,
    },
    settings: {
        id: 2,
        icon: Cog,
    },
};

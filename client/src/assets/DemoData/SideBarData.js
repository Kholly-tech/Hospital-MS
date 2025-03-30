import {
    AudioWaveform,
    CalendarCheck,
    Command,
    GalleryVerticalEnd,
    Pill,
    Settings2,
    User,
  } from "lucide-react"

export const data = {
  user: {},
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Appointments",
      url: "#",
      icon: CalendarCheck,
      isActive: true,
      items: [
        {
          title: "View Appointments",
          url: "/appointments",
        },
        {
          title: "Shecdule Appointment",
          url: "/appointments/new",
        },
      ],
    },
    {
      title: "Prescription",
      url: "#",
      icon: Pill,
      items: [
        {
          title: "View My Prescriptions",
          url: "/prescriptions",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
      ],
    },
  ],
  dotorNavMain: [
    {
      title: "Appointments",
      url: "#",
      icon: CalendarCheck,
      isActive: true,
      items: [
        {
          title: "View Appointments",
          url: "/appointments",
        },
        {
          title: "Shecdule Appointment",
          url: "/appointments/new",
        },
      ],
    },
    {
      title: "Prescription",
      url: "#",
      icon: Pill,
      items: [
        {
          title: "Issue a Prescription",
          url: "/prescription/view",
        },
        {
          title: "Manage Prescriptions",
          url: "/prescription/view",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
      ],
    },
  ],
  adminNavMain: [
    {
      title: "Users",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Manage Users",
          url: "users",
        },
      ],
    },
    {
      title: "Doctors",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Manage Doctors",
          url: "doctors",
        },
      ],
    },
    {
      title: "Appointments",
      url: "#",
      icon: CalendarCheck,
      items: [
        {
          title: "View All Appointments",
          url: "appointments",
        },
      ],
    },
    {
      title: "Prescriptions",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Manage Prescriptions",
          url: "prescriptions",
        },
      ],
    },
  ],
};
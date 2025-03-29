import {
    AudioWaveform,
    CalendarCheck,
    Command,
    GalleryVerticalEnd,
    Pill,
    Settings2,
  } from "lucide-react"

export const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
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
        icon: CalendarCheck,
        isActive: true,
        items: [
          {
            title: "Manage Users",
            url: "/users",
          },
          {
            title: "Add User",
            url: "/users/new",
          },
        ],
      },
      {
        title: "Appointments",
        url: "#",
        icon: Pill,
        items: [
          {
            title: "View All Appointments",
            url: "/appointments",
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
  }
export const user = {
  id: 7,
  name: "Oleta",
  imageUrl: "https://robohash.org/Oleta.png?set=set4",
}; // Randomly selected Dummyjson user.

export type SidebarItem = {
  name: string;
  href: string;
  isActive: boolean;
  badgeCount?: number;
};

export const sidebarItems: SidebarItem[] = [
  {
    name: "Tasks",
    href: "#",
    isActive: true,
    badgeCount: 4,
  },
  {
    name: "Notifications",
    href: "#",
    isActive: false,
    badgeCount: 7,
  },
  {
    name: "Analytics",
    href: "#",
    isActive: false,
  },
  {
    name: "Team",
    href: "#",
    isActive: false,
    badgeCount: 2,
  },
];

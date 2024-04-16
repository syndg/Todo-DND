import {
  BellIcon,
  UserIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  ChevronDownIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarItem as SidebarItemType, sidebarItems } from "@/lib/constants";

type HeroIcon = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>
>;

const Icons: Record<string, HeroIcon> = {
  Tasks: Squares2X2Icon,
  Notifications: BellIcon,
  Analytics: ChartBarSquareIcon,
  Team: UserIcon,
  Settings: Cog6ToothIcon,
};

const Sidebar = () => {
  return (
    <nav className="fixed left-0 min-w-[320px] h-screen p-6 pb-4 flex flex-col justify-between">
      <div className="grid gap-8">
        <div className="group py-3 px-[10px] flex items-center justify-between hover:bg-muted transition-colors duration-200 rounded-md cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-[24px] h-[24px] bg-primary rounded-[4px] text-primary-foreground grid place-content-center font-bold">
              S
            </div>
            <span className="font-bold">Company</span>
          </div>
          <ChevronDownIcon
            className="w-4 h-4 text-gray-400 group-hover:translate-y-[2px] transition-transform duration-200"
            strokeWidth={4}
          />
        </div>
        <div className="grid gap-1">
          {sidebarItems.map((item) => {
            return <SidebarItem key={item.name} item={item} />;
          })}
        </div>
      </div>
      <SidebarItem
        item={{
          name: "Settings",
          href: "#",
          isActive: false,
        }}
      />
    </nav>
  );
};

export default Sidebar;

export const SidebarItem = ({ item }: { item: SidebarItemType }) => {
  const Icon = Icons[item.name];

  return (
    <Button
      variant={item.isActive ? "secondary" : "ghost"}
      className={cn(
        "py-3 px-2 flex items-center justify-between font-bold rounded-[8px]",
        !item.isActive && "text-gray-500",
      )}
    >
      <span className="flex items-center gap-2">
        <Icon
          strokeWidth={2}
          className={cn(
            "w-6 h-6 text-gray-400",
            item.isActive && "text-primary",
          )}
        />
        {item.name}
      </span>
      {item.badgeCount && (
        <span
          className={cn(
            "w-[20px] h-[20px] rounded-[6px] bg-muted text-muted-foreground",
            item.isActive && "bg-primary text-primary-foreground",
          )}
        >
          {item.badgeCount}
        </span>
      )}
    </Button>
  );
};

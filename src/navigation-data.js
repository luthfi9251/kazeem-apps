import { PAGE_NAME } from "./security-config";
import { Home, User, UserRoundCog, Users, UsersRound } from "lucide-react";

export const URL_PATH = [
    {
        name: "Users",
        icon: <User className="h-5 w-5" />,
        page_name: PAGE_NAME.MANAGE_USER_PAGE,
        href: "",
        hasChild: true,
        children: [
            {
                name: "User",
                href: "/dashboard/users",
                icon: <UserRoundCog className="h-5 w-5" />,
            },
            {
                name: "Group",
                href: "/dashboard/users/groups",
                icon: <Users className="h-5 w-5" />,
            },
        ],
    },
    {
        name: "Santri",
        icon: <UsersRound className="h-5 w-5" />,
        page_name: PAGE_NAME.MANAGE_SANTRI_PAGE,
        href: "",
        hasChild: true,
        children: [
            {
                name: "Kelola Santri",
                href: "/dashboard/santri",
                icon: <Home className="h-5 w-5" />,
            },
            {
                name: "Another Santri",
                href: "/dashboard/groups",
                icon: <Home className="h-5 w-5" />,
            },
        ],
    },
];

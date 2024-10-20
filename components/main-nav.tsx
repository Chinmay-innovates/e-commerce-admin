"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";

export const MainNav = ({
	className,
	...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
	const pathname = usePathname();
	const params = useParams();
	const routes = [
		{
			id: 1,
			href: `/${params.storeId}`,
			label: "Overview",
			active: pathname === `/${params.storeId}`,
		},
		{
			id: 2,
			href: `/${params.storeId}/billboards`,
			label: "Billboards",
			active: pathname === `/${params.storeId}/billboards`,
		},
		{
			id: 3,
			href: `/${params.storeId}/categories`,
			label: "Categories",
			active: pathname === `/${params.storeId}/categories`,
		},
		{
			id: 4,
			href: `/${params.storeId}/sizes`,
			label: "Sizes",
			active: pathname === `/${params.storeId}/sizes`,
		},
		{
			id: 5,
			href: `/${params.storeId}/colors`,
			label: "Colors",
			active: pathname === `/${params.storeId}/colors`,
		},
		{
			id: 6,
			href: `/${params.storeId}/products`,
			label: "Products",
			active: pathname === `/${params.storeId}/products`,
		},
		{
			id: 7,
			href: `/${params.storeId}/orders`,
			label: "Orders",
			active: pathname === `/${params.storeId}/orders`,
		},
		{
			id: 8,
			href: `/${params.storeId}/settings`,
			label: "Settings",
			active: pathname === `/${params.storeId}/settings`,
		},
	];
	return (
		<nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
			{routes.map(({ active, href, label, id }) => (
				<Button key={label} asChild variant="ghost">
					<Link
						key={id}
						href={href}
						className={cn(
							"text-sm font-medium transition-colors hover:text-primary",
							active ? "text-black dark:text-white" : "text-muted-foreground"
						)}
					>
						{label}
					</Link>
				</Button>
			))}
		</nav>
	);
};

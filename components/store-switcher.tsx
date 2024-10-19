"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import { Store } from "@prisma/client";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";
import { useStoreModal } from "@/hooks/use-store-modal";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
	typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
	items: Store[];
}
export const StoreSwitcher = ({
	className,
	items = [],
}: StoreSwitcherProps) => {
	const [open, setOpen] = useState(false);
	const storeModal = useStoreModal();

	const params = useParams();
	const router = useRouter();

	const formattedItems = items.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	const currentStore = formattedItems.find(
		(item) => item.value === params.storeId
	);

	const onStoreSelect = (store: { value: string; label: string }) => {
		setOpen(false);
		router.push(`/${store.value}`);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					size="sm"
					role="combobox"
					variant="outline"
					aria-expanded={open}
					aria-label="Select a store"
					className={cn("w-[200px] justify-between", className)}
				>
					<StoreIcon className="mr-2 size-4" />
					{currentStore?.label}
					<ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandList>
						<CommandInput placeholder="Search store..." />
						<CommandEmpty>No store found.</CommandEmpty>
						<CommandGroup heading="Store">
							{formattedItems.map((store) => (
								<CommandItem
									key={store.value}
									onSelect={() => onStoreSelect(store)}
									className="text-sm"
								>
									<StoreIcon className="mr-2 size-4" />
									{store.label}
									<Check
										className={cn(
											"ml-auto size-4",
											currentStore?.value === store.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									setOpen(false);
									storeModal.onOpen();
								}}
							>
								<PlusCircle className="size-5 mr-2" />
								Create Store
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

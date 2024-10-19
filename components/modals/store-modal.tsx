"use client";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/use-store-modal";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	Form,
} from "@/components/ui/form";
import toast from "react-hot-toast";

const formSchema = z.object({
	name: z.string().min(1, {
		message: "Name is required",
	}),
});

type FormSchema = z.infer<typeof formSchema>;

export const StoreModal = () => {
	const storeModal = useStoreModal();
	const [loading, setLoading] = useState(false);

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (values: FormSchema) => {
		try {
			setLoading(true);
			const response = await axios.post("/api/stores", values);
			window.location.assign(`
			/${response.data.id}	
			`);
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	};
	return (
		<Modal
			title="Create Store"
			description="Add a new store to manage your products and categories"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div>
				<div className="space-y-4 py-2 pb-2">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												disabled={loading}
												placeholder="Enter the name of your store"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="pt-6 space-x-2 flex items-center justify-end w-full">
								<Button
									disabled={loading}
									variant="outline"
									onClick={storeModal.onClose}
								>
									Cancel
								</Button>
								<Button disabled={loading} type="submit">
									Continue
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};

"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { SizeColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface SizesClientProps {
	data: SizeColumn[];
}

export const SizesClient = ({ data }: SizesClientProps) => {
	const params = useParams();
	const router = useRouter();
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Sizes (${data.length})`}
					description="Manage sizes for your store"
				/>
				<Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
					<Plus className="size-4 mr-2" />
					Add new
				</Button>
			</div>
			<Separator />
			<DataTable filterKey="name" columns={columns} data={data} />
			<Heading title="API" description="API calls for Sizes" />
			<Separator />
			<ApiList entityName="sizes" entityIdName="sizeId" />
		</>
	);
};

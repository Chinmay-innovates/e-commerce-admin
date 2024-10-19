"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { BillboardColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProps {
	data: BillboardColumn[];
}

export const BillboardClient = ({ data }: BillboardClientProps) => {
	const params = useParams();
	const router = useRouter();
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Billboards (${data.length})`}
					description="Manage billboards for your store"
				/>
				<Button
					onClick={() => router.push(`/${params.storeId}/billboards/new`)}
				>
					<Plus className="size-4 mr-2" />
					Add new
				</Button>
			</div>
			<Separator />
			<DataTable filterKey="label" columns={columns} data={data} />
			<Heading title="API" description="API calls for Billboards" />
			<Separator />
			<ApiList entityName="billboards" entityIdName="billboardId" />
		</>
	);
};

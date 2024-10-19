import db from "@/prisma/db";
import React from "react";
import { BillboardForm } from "./components/billboard-form";

const Billboardpage = async ({
	params,
}: {
	params: { billboardId: string };
}) => {
	const billboard = await db.billboard.findUnique({
		where: {
			id: params.billboardId,
		},
	});
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<BillboardForm initialData={billboard} />
			</div>
		</div>
	);
};

export default Billboardpage;

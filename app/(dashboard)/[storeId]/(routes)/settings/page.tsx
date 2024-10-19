import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import db from "@/prisma/db";
import { SettingsForm } from "./components/settings-form";

interface DashboardSettingsPageProps {
	params: {
		storeId: string;
	};
}
const DashboardSettingsPage = async ({
	params,
}: DashboardSettingsPageProps) => {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const store = await db.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		},
	});

	if (!store) {
		redirect("/");
	}

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SettingsForm initialData={store} />
			</div>
		</div>
	);
};

export default DashboardSettingsPage;

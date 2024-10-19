import { Navbar } from "@/components/navbar";
import db from "@/prisma/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { storeId: string };
}) {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-up");
	}

	const store = await db.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		},
	});

	if (!store) redirect("/");

	return (
		<>
			<Navbar />
			{children}
		</>
	);
}

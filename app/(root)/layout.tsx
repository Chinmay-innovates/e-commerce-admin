import db from "@/prisma/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId } = auth();

	if (!userId) redirect("/sign-up");

	const store = await db.store.findFirst({
		where: {
			userId,
		},
	});

	if (store) redirect(`/${store.id}`);

	return <>{children}</>;
}

import db from "@/prisma/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { name } = body;

		if (!userId) {
			return new NextResponse("Unauthticated", { status: 401 });
		}
		if (!name) {
			return new NextResponse("Name is required", { status: 401 });
		}

		const store = await db.store.create({
			data: {
				name,
				userId,
			},
		});
		return NextResponse.json(store);
	} catch (error) {
		console.log("[STORES_POST]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

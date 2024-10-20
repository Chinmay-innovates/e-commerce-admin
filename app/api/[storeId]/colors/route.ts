import db from "@/prisma/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { name, value } = body;

		if (!userId) {
			return new NextResponse("Unauthticated", { status: 401 });
		}
		if (!name) {
			return new NextResponse("Name is required", { status: 400 });
		}
		if (!value) {
			return new NextResponse("Value is required", { status: 400 });
		}
		if (!params.storeId) {
			return new NextResponse("Store id is required", { status: 400 });
		}

		const storeByUserId = await db.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse("Unauthorized", { status: 403 });
		}
		const color = await db.color.create({
			data: {
				name,
				value,
				storeId: params.storeId,
			},
		});
		return NextResponse.json(color);
	} catch (error) {
		console.log("[COLORS_POST]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function GET(
	_req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		if (!params.storeId) {
			return new NextResponse("Store id is required", { status: 400 });
		}

		const color = await db.color.findMany({
			where: {
				storeId: params.storeId,
			},
		});
		return NextResponse.json(color);
	} catch (error) {
		console.log("[COLORS_GET]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

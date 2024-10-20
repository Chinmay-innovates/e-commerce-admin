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
		const size = await db.size.create({
			data: {
				name,
				value,
				storeId: params.storeId,
			},
		});
		return NextResponse.json(size);
	} catch (error) {
		console.log("[SIZES_POST]", error);
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

		const size = await db.size.findMany({
			where: {
				storeId: params.storeId,
			},
		});
		return NextResponse.json(size);
	} catch (error) {
		console.log("[SIZES_GET]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

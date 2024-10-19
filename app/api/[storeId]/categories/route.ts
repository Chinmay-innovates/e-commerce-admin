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

		const { name, billboardId } = body;

		if (!userId) {
			return new NextResponse("Unauthticated", { status: 401 });
		}
		if (!name) {
			return new NextResponse("Name is required", { status: 400 });
		}
		if (!billboardId) {
			return new NextResponse("billboard id is required", { status: 400 });
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
		const category = await db.category.create({
			data: {
				name,
				billboardId,
				storeId: params.storeId,
			},
		});
		return NextResponse.json(category);
	} catch (error) {
		console.log("[CATEGORIES_POST]", error);
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

		const category = await db.category.findMany({
			where: {
				storeId: params.storeId,
			},
		});
		return NextResponse.json(category);
	} catch (error) {
		console.log("[CATEGORIES_GET]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

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

		const {
			name,
			price,
			categoryId,
			colorId,
			sizeId,
			images,
			isFeatured,
			isArchived,
		} = body;

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 403 });
		}

		if (!name) {
			return new NextResponse("Name is required", { status: 400 });
		}

		if (!images || !images.length) {
			return new NextResponse("Images are required", { status: 400 });
		}

		if (!price) {
			return new NextResponse("Price is required", { status: 400 });
		}

		if (!categoryId) {
			return new NextResponse("Category Id is required", { status: 400 });
		}

		if (!sizeId) {
			return new NextResponse("Size Id is required", { status: 400 });
		}

		if (!colorId) {
			return new NextResponse("Color Id is required", { status: 400 });
		}

		if (!params.storeId) {
			return new NextResponse("Store Id is required", { status: 400 });
		}

		const storeByUserId = await db.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		// check to make sure the user can modify this store
		if (!storeByUserId) {
			return new NextResponse("Unauthorized", { status: 405 });
		}

		const product = await db.product.create({
			data: {
				name,
				price,
				isFeatured,
				isArchived,
				categoryId,
				colorId,
				sizeId,
				storeId: params.storeId,
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log("[PRODUCTS_POST]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { searchParams } = new URL(req.url);
		const categoryId = searchParams.get("categoryId") || undefined;
		const colorId = searchParams.get("colorId") || undefined;
		const sizeId = searchParams.get("sizeId") || undefined;
		const isFeatured = searchParams.get("isFeatured") || undefined;

		if (!params.storeId) {
			return new NextResponse("Store ID is required", { status: 400 });
		}

		const products = await db.product.findMany({
			where: {
				storeId: params.storeId,
				categoryId,
				colorId,
				sizeId,
				isFeatured: isFeatured ? true : undefined,
				isArchived: false,
			},
			include: {
				category: true,
				images: true,
				color: true,
				size: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json(products);
	} catch (error) {
		console.log("[PRODUCTS_GET]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
	disabled?: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}
export const ImageUpload = ({
	disabled,
	onChange,
	onRemove,
	value,
}: ImageUploadProps) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onUpload = (result: any) => {
		onChange(result.info.secure_url);
	};

	if (!isMounted) {
		return null;
	}
	return (
		<div>
			<div className="mb-4 flex items-center gap-4">
				{value.map((url) => (
					<div
						key={url}
						className="relative size-[200px] rounded-md overflow-hidden"
					>
						<div className="z-10 absolute top-2 right-2">
							<Button
								type="button"
								onClick={() => onRemove(url)}
								variant="destructive"
								size="sm"
							>
								<Trash className="size-4" />
							</Button>
						</div>
						<Image fill className="object-cover" alt="Image" src={url} />
					</div>
				))}
				<CldUploadWidget onSuccess={onUpload} uploadPreset="ecommerce-admin">
					{({ open }) => {
						const onClick = () => {
							open();
						};

						return (
							<Button
								type="button"
								disabled={disabled}
								variant="secondary"
								onClick={onClick}
							>
								<ImagePlus className="size-4 mr-2" />
								Upload an image
							</Button>
						);
					}}
				</CldUploadWidget>
			</div>
		</div>
	);
};

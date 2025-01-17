'use client'

import { URL_API } from '@/constants'
import placeholder from '@/public/placeholder.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
interface IProductImage {
	sizes?: Record<number, number>[] | undefined
	size?: number | undefined
	alt: string | undefined
	src: string | undefined
	type?: string
	isLoading?: boolean
}

export default function ImageProduct({
	sizes,
	size,
	alt,
	src,
	isLoading,
}: IProductImage) {
	const [err, setErr] = useState(false)
	useEffect(() => {
		setErr(false)
	}, [src])
	const getSelectValue = (key: number) => {
		const foundObject = sizes?.find(obj => obj.hasOwnProperty(key))
		return foundObject ? foundObject[key] : 400
	}
	return (
		<div className={`relative w-full h-full flex justify-center items-center`}>
			{isLoading || err ? (
				<Image
					width={getSelectValue(size ? size : 0)}
					height={getSelectValue(size ? size : 0)}
					alt={alt ?? 'image'}
					src={placeholder}
				/>
			) : (
				<Image
					className={'flex justify-center items-center'}
					onError={() => setErr(true)}
					width={getSelectValue(size ? size : 0)}
					height={getSelectValue(size ? size : 0)}
					alt={alt ?? 'image'}
					src={`${URL_API}/${src}`}
				/>
			)}
		</div>
	)
}

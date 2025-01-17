'use client'

import { URL_API } from '@/constants'
import { DATADOUGHTYPE } from '@/data/dough-type'
import { ICartItem } from '@/interface/interface-cart-item'
import Image from 'next/image'
import CartButtonCounter from './CartButtonCounter'
import CartButtonDelete from './CartButtonDelete'

export default function CartItemCard({ data }: { data: ICartItem }) {
	const totalPrice = data?.subCartItem.map(
		val =>
			(val.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0) +
				val.size.price) *
			val.quantity
	)

	// const chooseItem =  TypeProduct[data.typeProduct] === TypeProduct.PIZZA_HALF
	console.log(data)
	return (
		<>
			{data?.subCartItem.map(item => (
				<>
					<li className={'relative flex items-start gap-x-2'} key={item.id}>
						<div>
							<Image
								width={60}
								height={60}
								src={`${URL_API}/${item.productVariant?.image}`}
								alt={item.product.name}
							/>
						</div>
						<div>
							<h3 className={'font-bold'}>{item.product.name}</h3>
							<div
								className={
									'flex items-center gap-x-3 dark:text-gray-200 text-black/60 text-sm'
								}
							>
								{item.productVariant.doughName && (
									<span>
										{
											DATADOUGHTYPE.find(
												val => val.value === item.productVariant.doughName
											)?.name
										}
									</span>
								)}
								{item.productVariant.productAttribute?.name && (
									<span> {item.productVariant.productAttribute.name}</span>
								)}
								<span> {item.size.proportion?.value}</span>
								{Number(item.size.weight) > 0 && (
									<span>{item.size.weight} г</span>
								)}
							</div>
							{item.ingredients.length > 0 && (
								<div
									className={
										'dark:text-gray-200 text-black/60 text-xs flex gap-x-1'
									}
								>
									+{' '}
									{item.ingredients
										.map(ingredient => ingredient.name)
										.join(', ')}
								</div>
							)}
						</div>
						<div className={'absolute top-0 right-0  bg-transparent'}>
							<CartButtonDelete id={item.id} />
						</div>
					</li>
					<div className={'flex items-center justify-between'}>
						<CartButtonCounter
							quantity={item.quantity}
							cartId={data.cartId}
							id={item.id}
						/>
						<span className={'flex items-center gap-x-2'}>
							Цена: <b className={'text-primary'}>{totalPrice} ₽</b>
						</span>
					</div>
					<span className={'w-full h-[1px] bg-primary/40 rounded-lg'} />
				</>
			))}
		</>
	)
}

import { QueryProduct } from '@/app/api/query-product'
import ButtonCounter from '@/components/ButtonCounter'
import ImageProduct from '@/components/ImageProduct'
import ChooseSize from '@/components/shared/choose/ChooseSize'
import ChooseVariant from '@/components/shared/choose/ChooseVariant'
import { Title } from '@/components/shared/Title'
import TooltipInfo from '@/components/tooltips/TooltipInfo'
import { Switch } from '@/components/ui/switch'
import useGetSizeByCategory from '@/hooks/useGetSizeByCategory'
import { TypeProduct } from '@/interface/enums'
import { ProductService } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ChooseButton from './ChooseButton'

interface IProps {
	productId: number
	defaultSize?: number
	defaultVariant?: number
	defaultCount?: number
	defaultIsReplace?: boolean
}
function ChooseCardModal({
	productId,
	defaultSize,
	defaultVariant,
	defaultCount,
	defaultIsReplace,
}: IProps) {
	const { data: product } = useQuery({
		queryKey: ['get-id-product', productId],
		queryFn: () => QueryProduct.id(productId),
		enabled: !!productId,
	})
	const { data } = useGetSizeByCategory(product?.categoryId)
	const [size, setSize] = useState<number>()
	const [variant, setVariant] = useState<number>()
	const [count, setCount] = useState<number>(1)
	const [isReplace, setIsReplace] = useState<boolean>(
		defaultIsReplace === false ? false : true
	)
	const weight = ProductService.getWeight(product, variant, size)
	const image = ProductService.getImage(product, variant)
	const getVariant = ProductService.getVariant(product, variant)
	useEffect(() => {
		if (defaultCount) {
			setCount(defaultCount)
		}
		if (defaultIsReplace) {
			setIsReplace(defaultIsReplace)
		}
	}, [defaultSize, defaultVariant, defaultCount, defaultIsReplace])

	if (!product) return
	return (
		<>
			<div key={product.id}>
				<div>
					<ImageProduct src={image} size={200} alt={product.name} />
				</div>
			</div>

			<div className='w-full'>
				<Title
					size={'lg'}
					className={'font-bold text-black dark:text-white'}
					text={product?.name ?? ''}
				/>
				<div className='flex items-center gap-x-2 pb-1'>
					<span>{data?.find(val => val.id === size)?.value}</span>
					{product.type === TypeProduct.PIZZA && (
						<span>{getVariant?.toLowerCase()} тесто</span>
					)}
					{Number(weight) > 0 && weight + ' г'}
				</div>
				<p className={'text-black/70 dark:text-gray-200'}>
					{product?.ingredients?.map(val => val.name).join(', ')}
				</p>
				<div className='pt-3'>
					<ChooseVariant
						defaultVariantProps={defaultVariant}
						setSelectVariant={setVariant}
						data={product}
					/>
					<ChooseSize
						defaultSizeProps={defaultSize}
						setSelectSize={setSize}
						selectedVariant={variant}
						data={product}
					/>
				</div>
				<div className='pt-3 flex flex-col gap-y-3'>
					<div>
						<h3>Количество</h3>
						<ButtonCounter count={count} setCount={setCount} />
					</div>
					<div className=''>
						<h3>
							Можно ли заменить?{' '}
							<TooltipInfo
								contentClass='text-base'
								contentText='Определяет, можно ли заменить продукт на другой в наборе.'
							/>
						</h3>
						<Switch checked={isReplace} onCheckedChange={setIsReplace} />
					</div>
				</div>
				<div className='w-full pt-3'>
					<ChooseButton
						data={product}
						selectedSize={size}
						selectedVariant={variant}
						count={count}
						isReplace={isReplace}
					/>
				</div>
			</div>
		</>
	)
}

export default ChooseCardModal
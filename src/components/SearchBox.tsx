import Image from 'next/image'
import searchSvg from '../../public/search.svg'
import { cn } from '@/utils/cn'

type Props = {
    className?:string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined,
}

export default function SearchBox(props: Props) {
  return (
    <form onSubmit={props.onSubmit} className={cn(
        "flex relative items-center justify-center h-10",
        props.className
    )}>
        <input 
            value={props.value}
            onChange={props.onChange}
            type="text" 
            placeholder="Search location..." 
            className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-yellow-500 h-full" />
        <button className="px-4 py-[9px] bg-yellow-400 text-white rounded-r-md focus:outline-none hover:bg-yellow-500 h-full">
            <Image
                src={searchSvg}
                alt="Search SVG"
                width={23}
                height={23}
            />
        </button>
    </form>
  )
}



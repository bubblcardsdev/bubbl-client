import {FullArrowIcon} from "../common/icons";
import { BreadCrumbsProps } from '@/src/lib/interface';
function BreadCrumbs(props:BreadCrumbsProps){
    
    return(
        <div className=' flex  items-center  space-x-2'><a className='inter text-[14px] text-gray-400 '>Product</a>
        <span className='text-center '><FullArrowIcon /></span>
        <a className='inter text-[16px] text-black text-semibold'>{props.value}</a>
      </div>

    )

}

export default BreadCrumbs
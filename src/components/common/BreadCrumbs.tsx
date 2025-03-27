import Arrow_icon from '@/src/assets/icons/productIcon/productList_Arrow_icon'
function BreadCrumbs(props:BreadCrumbsProps){
    console.log(props,"props");
    return(
        <div className='ml-4 flex  items-center  space-x-2'><a className='inter text-[14px] text-gray-400 px-2'>Product</a>
        <span className='text-center '><Arrow_icon /></span>
        <a className='inter text-[16px] text-black text-semibold'>{props.value}</a>
      </div>

    )

}

export default BreadCrumbs
import Image from 'next/image';

interface TreeConfig {
  left?: string;
  right?: string;
  width: number;
  height: number;
  blur?: boolean;
  bottomOffset?: string;
}

const TreeRow = ({ count = 0 }: { count?: number }) => {
  const topRowTrees: TreeConfig[] = [
    { left: '0%', width: 60, height: 65, blur: true },
    { left: '20%', width: 75, height: 81 },
    { left: '40%', width: 90, height: 98 }, // center
    { right: '25%', width: 75, height: 81 },
    { right: '0%', width: 60, height: 65, blur: true },
  ];

  const bottomRowTrees: TreeConfig[] = [
    { left: '0%', width: 50, height: 54, blur: true, bottomOffset: '40px' },
    { left: '20%', width: 65, height: 70, bottomOffset: '20px' },
    { left: '40%', width: 80, height: 87, bottomOffset: '20px' }, // center
    { right: '25%', width: 65, height: 70, bottomOffset: '20px' },
    { right: '0%', width: 50, height: 54, blur: true, bottomOffset: '40px' },
  ];

  const twoXlTopTrees: TreeConfig[] = [
    { left: '0%', width: 70, height: 75, blur: true,bottomOffset: '80px' },
    { left: '22%', width: 85, height: 92,bottomOffset: '60px' },
    { left: '45%', width: 100, height: 110,bottomOffset: '40px' }, // center
    { right: '22%', width: 85, height: 92,bottomOffset: '60px' },
    { right: '0%', width: 70, height: 75, blur: true,bottomOffset: '80px' },
  ];

  const twoXlBottomTrees: TreeConfig[] = [
    { left: '0%', width: 60, height: 66, blur: true, bottomOffset: '60px' },
    { left: '25%', width: 75, height: 82, bottomOffset: '60px' },
    { left: '45%', width: 90, height: 100, bottomOffset: '60px' }, // center
    { right: '20%', width: 75, height: 82, bottomOffset: '60px' },
    { right: '0%', width: 60, height: 66, blur: true, bottomOffset: '60px' },
  ];

  const mobileTrees: TreeConfig[] = [
    { left: '0%', width: 50, height: 54, blur: true, bottomOffset: '15px' },
    { left: '20%', width: 65, height: 70, bottomOffset: '10px' },
    { left: '40%', width: 80, height: 87, bottomOffset: '10px' }, // center
    { right: '14%', width: 65, height: 70, bottomOffset: '10px' },
    { right: '0%', width: 50, height: 54, blur: true, bottomOffset: '15px' },
  ];

  const topOrder = [2, 0, 4, 1, 3];
  const bottomOrder = [2, 0, 4, 1, 3];
  const mobileOrder = [2, 0, 4, 1, 3];
  const twoXlOrder = [2, 0, 4, 1, 3];

  const visibleTopIndexes = topOrder.slice(0, count);
  const visibleBottomIndexes = bottomOrder.slice(0, Math.max(0, count - topRowTrees.length));
  const visibleMobileIndexes = mobileOrder.slice(0, count);
  const visibleTwoXlTopIndexes = twoXlOrder.slice(0, Math.min(count, twoXlTopTrees.length));
const visibleTwoXlBottomIndexes = twoXlOrder.slice(
  0,
  Math.max(0, count - twoXlTopTrees.length)
);

  return (
    <>
      {/* 2XL Trees */}
      <div className="hidden 2xl:flex flex-col w-full relative h-[260px] scale-[0.95]">
        {/* Top Row */}
        <div className="relative h-1/2">
          {twoXlTopTrees.map((tree, index) => (
            <Image
              key={`2xl-top-${index}`}
              src="/HomePageIcons/treeImg.png"
              width={tree.width}
              height={tree.height}
              alt="tree"
              style={{
                position: 'absolute',
                bottom: tree.bottomOffset ?? '0px',
                ...(tree.left && { left: tree.left }),
                ...(tree.right && { right: tree.right }),
                filter: tree.blur ? 'blur(1px)' : 'none',
                opacity: visibleTwoXlTopIndexes.includes(index) ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
              }}
            />
          ))}
        </div>
        {/* Bottom Row */}
        <div className="relative h-1/2">
          {twoXlBottomTrees.map((tree, index) => (
            <Image
              key={`2xl-bottom-${index}`}
              src="/HomePageIcons/treeImg.png"
              width={tree.width}
              height={tree.height}
              alt="tree"
              style={{
                position: 'absolute',
                bottom: tree.bottomOffset ?? '0px',
                ...(tree.left && { left: tree.left }),
                ...(tree.right && { right: tree.right }),
                filter: tree.blur ? 'blur(1px)' : 'none',
                opacity: visibleTwoXlBottomIndexes.includes(index) ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
              }}
            />
          ))}
        </div>
      </div>

      {/* XL Trees */}
      <div className="hidden xl:flex 2xl:hidden flex-col w-full relative h-[220px]">
        {/* Top Row */}
        <div className="relative h-1/2">
          {topRowTrees.map((tree, index) => (
            <Image
              key={`xl-top-${index}`}
              src="/HomePageIcons/treeImg.png"
              width={tree.width}
              height={tree.height}
              alt="tree"
              style={{
                position: 'absolute',
                bottom: '0px',
                ...(tree.left && { left: tree.left }),
                ...(tree.right && { right: tree.right }),
                filter: tree.blur ? 'blur(1px)' : 'none',
                opacity: visibleTopIndexes.includes(index) ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
              }}
            />
          ))}
        </div>
        {/* Bottom Row */}
        <div className="relative h-1/2">
          {bottomRowTrees.map((tree, index) => (
            <Image
              key={`xl-bottom-${index}`}
              src="/HomePageIcons/treeImg.png"
              width={tree.width}
              height={tree.height}
              alt="tree"
              style={{
                position: 'absolute',
                bottom: tree.bottomOffset ?? '0px',
                ...(tree.left && { left: tree.left }),
                ...(tree.right && { right: tree.right }),
                filter: tree.blur ? 'blur(1px)' : 'none',
                opacity: visibleBottomIndexes.includes(index) ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile Trees */}
      <div className="flex xl:hidden w-full relative h-[120px]">
        {mobileTrees.map((tree, index) => (
          <Image
            key={`mobile-${index}`}
            src="/HomePageIcons/treeImg.png"
            width={tree.width}
            height={tree.height}
            alt="tree"
            style={{
              position: 'absolute',
              bottom: tree.bottomOffset ?? '0px',
              ...(tree.left && { left: tree.left }),
              ...(tree.right && { right: tree.right }),
              filter: tree.blur ? 'blur(1px)' : 'none',
              opacity: visibleMobileIndexes.includes(index) ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
        ))}
      </div>
    </>
  );
};

export default TreeRow;

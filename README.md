This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Common Components

1.  Modal

Props:

- visible?: boolean (default: false)
- onClose?: () => void
- title?: React.ReactNode
- headerContent?: React.ReactNode (custom header area; shown beside/under title)
- footerContent?: React.ReactNode
- showHeader?: boolean (default: true)
- showFooter?: boolean (default: true)
- stickyHeader?: boolean (default: true)
- stickyFooter?: boolean (default: true)
- closeOnBackdrop?: boolean (default: true)
- className?: string (extra classes for the modal panel)
- headerClassName?: string;
- footerClassName?: string;
- backdropClassName?: string (extra classes for the backdrop)

Accessibility:

- ARIA roles, ESC to close, focus handled on open.

---

## Example usage (drop into a client component)

"use client";
import React from "react";
import Modal from "./Modal";

export default function Demo() {
const [open, setOpen] = React.useState(false);

return (

<div className="min-h-screen grid place-items-center p-6">
<button
onClick={() => setOpen(true)}
className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700" >
Open Modal
</button>

      <Modal
        visible={open}
        onClose={() => setOpen(false)}
        title="Dynamic Pop-up"
        headerContent={<span className="text-xs sm:text-sm">Optional subtext goes here</span>}
        showHeader={true}
        showFooter={true}
        stickyHeader={true}
        stickyFooter={true}
        closeOnBackdrop={true}
      >
        <p className="text-sm md:text-base">
          This modal is responsive across mobile, tablet, and desktop breakpoints.
          Use the props to toggle sticky header/footer and visibility.
        </p>
      </Modal>
    </div>

);
}

     ---------------------------------------------

2. Three Dot Menu

   Props

   - options: Array<{ label: string; onClick: () => void; className?: string; icon?: React.ReactNode; disabled?: boolean }>
   - visible?: boolean // controlled open state
   - onOpenChange?: (open: boolean) => void
   - icon?: React.ReactNode // trigger icon
   - triggerClassName?: string
   - iconClassName?: string
   - menuClassName?: string // popup panel container classes
   - closeOnSelect?: boolean // default true

   Features

- Custom options with per-item onClick + styles
- Custom trigger icon
- Custom classnames for trigger, icon, popup container, and items
- Controlled or uncontrolled open state
- Click outside to close
- ESC to close, Arrow key navigation, ARIA roles
- Keeps original visual style (no UI changes)

Example Usage (drop into a client component)

---

import ThreeDotMenu, { ThreeDotMenuOption } from "./ThreeDotMenu";
import { MoreVertical, Edit3, Hash, Power, Trash2 } from "lucide-react";

export default function DemoMenu() {
const menuOptions: ThreeDotMenuOption[] = [
{ label: "Rename Device", onClick: () => alert("Rename clicked"), icon: <Edit3 className="h-4 w-4"/> },
{ label: "Claim Name", onClick: () => alert("Claim clicked"), icon: <Hash className="h-4 w-4"/> },
{ label: "Deactivate Device", onClick: () => alert("Deactivate clicked"), className: "text-yellow-400", icon: <Power className="h-4 w-4"/> },
{ label: "Remove Device", onClick: () => alert("Remove clicked"), className: "text-red-400", icon: <Trash2 className="h-4 w-4"/> },
];

return (

<div className="p-8">
<ThreeDotMenu
options={menuOptions}
icon={<MoreVertical size={18} />}
triggerClassName="relative shrink-0"
iconClassName="text-gray-400 cursor-pointer focus:outline-none"
menuClassName="bg-[#1D1D1D] rounded-lg shadow-lg z-10 w-40"
/>
</div>
);
}

import SiteHeader from "./siteHeader";
import { ReactNode } from 'react';

interface SiteLayoutProps {
  children?: ReactNode;

}


export default function SiteLayout(props: SiteLayoutProps) {
  return (
    <div>
      <div style={{ position: "fixed", width: "100%", zIndex: "9999", top: 0 }}>
        <SiteHeader />
      </div>
      {/* style={{ position: 'relative',height:"100vh",overflow:'auto' }} */}
      <main>
        {props?.children}
        </main>
    </div>
  );
}

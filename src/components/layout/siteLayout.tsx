
import SiteHeader from './siteHeader'
export default function SiteLayout(props:any) {
  return (<div>

    <div style={{ position: 'fixed', width: '100%', zIndex: '9999' }}>
      <SiteHeader />
    </div>
{/* style={{ position: 'relative',height:"100vh",overflow:'auto' }} */}
    <main >
      {props?.children}
    </main>
  </div>)
}
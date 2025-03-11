
import SiteHeader from './siteHeader'


export default function SiteLayout(props:any) {
  return (<div>

    <div style={{ position: 'fixed', width: '100%', zIndex: '9999' }}>
      <SiteHeader />
    </div>

    <main style={{ position: 'relative' }}>
      {props?.children}
    </main>
  </div>)
}
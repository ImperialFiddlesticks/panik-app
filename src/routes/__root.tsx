
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    
      <div className="main-container">
        <header><button><img className="settings-icon" alt="Settings Icon" src="/gear.png"/></button><img className="header-logo" alt="Panik Logo" src="/paniklogo.png"/><button><img className="settings-icon" alt="Tooltip Icon" src="/question-mark.png"/></button></header>
        <Outlet />
      </div>
      
    
  )
}

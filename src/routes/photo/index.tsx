import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/photo/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/photo/"!</div>
}

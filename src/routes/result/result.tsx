import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/result/result')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/result/result"!</div>
}

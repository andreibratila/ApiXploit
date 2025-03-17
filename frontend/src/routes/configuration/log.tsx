import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/configuration/log")(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  return <div>Hello "/configuration/_configurationLayout/log"!</div>;
}

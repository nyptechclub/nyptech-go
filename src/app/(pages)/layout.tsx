import NavigationBar from "@/components/navigation-bar";
import { LayoutProps } from "@/types";

export default function Layout(props: LayoutProps) {
  return (
    <div className={"grid size-full grid-rows-[auto,1fr]"}>
      <NavigationBar />
      {props.children}
    </div>
  );
}
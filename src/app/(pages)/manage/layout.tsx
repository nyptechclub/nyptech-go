import ProtectedPage from "@/app/(pages)/protected";
import { LayoutProps } from "@/types";
import { Protect } from "@clerk/nextjs";

export default function Layout(props: LayoutProps) {
  return <Protect fallback={<ProtectedPage />}>{props.children}</Protect>;
}
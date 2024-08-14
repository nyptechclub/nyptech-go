export type RouteProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
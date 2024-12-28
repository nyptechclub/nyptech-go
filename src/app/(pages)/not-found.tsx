export default function NotFoundPage() {
  return (
    <main className={"grid place-items-center"}>
      <div className={"card bg-base-300"}>
        <div className={"card-body items-center"}>
          <h2 className={"card-title"}>Oops!</h2>
          <p>The page you requested does not exist.</p>
        </div>
      </div>
    </main>
  );
}
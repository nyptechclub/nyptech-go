export default function ProtectedPage() {
  return (
    <main className={"grid place-items-center"}>
      <div className={"card bg-base-300"}>
        <div className={"card-body items-center"}>
          <h2 className={"card-title"}>Oops!</h2>
          <p>You cannot access this page.</p>
        </div>
      </div>
    </main>
  );
}
export default async function Page({ params }: { params: { id: string } }) {
  // Next.js states that params need to be awaited
  const { id } = await params;

  return (
    <div>
      <h1>Group Details</h1>
      <p>Group id: {id}</p>
      {/* Add group details here */}
    </div>
  );
}

export function ServerErrorFallback() {
  return (
    <div className="flex flex-col items-center p-3 border-2 border-red-200 rounded-lg text-xs">
      <p className="mb-2 font-semibold text-lg">
        Whoops, something went wrong.
      </p>
      <p>Please either refresh the page</p>
      <p>or</p>
      <p>
        Contact the dev at{" "}
        <span className="font-semibold">bayuadhyawiratama@gmail.com</span>
      </p>
    </div>
  );
}

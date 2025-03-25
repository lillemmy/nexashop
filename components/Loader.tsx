function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 border-b-2 border-blue-500" />
      <p className="text-3xl text-blue-500">Loading...</p>
    </div>
  );
}

export default Loader;

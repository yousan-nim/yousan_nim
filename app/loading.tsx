export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-black">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white" />
    </div>
  );
}
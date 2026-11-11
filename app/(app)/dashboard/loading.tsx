import { MoonLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <MoonLoader color="#00181c" speedMultiplier={0.6} />;
    </div>
  );
}

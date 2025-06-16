import Logo from "./Logo";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-[#363636] px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <Logo />
        <h2 className="text-lg font-bold tracking-tight">Stock Predictor</h2>
      </div>
    </header>
  );
}

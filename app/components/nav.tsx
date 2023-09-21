export default function Nav() {
  return (
    <div className="bg-stone-100 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:justify-start gap-2">
            <img
              className="opacity-60 h-7 w-auto sm:animate-[spin_3s_linear_infinite]"
              src="img/yin-yang.png"
              alt="chatgpt"
            />
            <span className="text-stone-600">AI 算卦</span>
          </div>
        </div>
      </div>
    </div>
  );
}

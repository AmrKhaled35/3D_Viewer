export function Header() {
  return (
    <header className="bg-black shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg font-bold">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Ma 3lena
              </h1>
              <p className="text-sm text-gray-400 italic">3la ma tofrag marka mosagalla</p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#2E333A] px-6 py-3 bg-[#1A1D21] z-20">
      <div className="flex items-center gap-4">
        <div className="size-6 text-primary">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Untitled Workflow</h2>
      </div>
      <div className="flex flex-1 justify-end gap-4">
        <div className="flex gap-2">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
            <span className="truncate">Run</span>
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#2E333A] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#3a4049] transition-colors">
            <span className="truncate">Save</span>
          </button>
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#2E333A] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#3a4049] transition-colors">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
        <div className="flex items-center border-l border-[#2E333A] pl-4 gap-2">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#2E333A] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#3a4049] transition-colors">
            <span className="material-symbols-outlined">zoom_in</span>
          </button>
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#2E333A] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#3a4049] transition-colors">
            <span className="material-symbols-outlined">zoom_out</span>
          </button>
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#2E333A] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#3a4049] transition-colors">
            <span className="material-symbols-outlined">fit_screen</span>
          </button>
        </div>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="User avatar image" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsL1fl4tCmN6tC_ncbE8oco3M4kPdgQ0L8Z7vqmz-ffWqbYdRJsGkjNOM8EDZnPDe1j2QsLDMpu7xw-EiiEvxGhRb6CZ6p6X4do5YwH_OomOiJWyIlTc8KtJ9uPZVX7tN4uQ5FcYeZN7WmcDKbkHm-2C2gAha7rGnh4ZvEh5Ycw-Ge7D8GgRz2QEMFaB74xaGgFyhu_x5GPCd9e5P4ToWb2ex2eX5qKFL_oQ53SR4NXOpSMP4iMWLuBOPNjf9c4OQCWefkzrC-s-U")'}}></div>
      </div>
    </header>
  )
}

/**
 *
 * @returns: En MenuButton-komponent ...
 * @example: <MenuButton />
 * @alias: MenuButton
 * @summary: Denne komponent bruges til at ...
 * @version: 1.0.0
 * @property: [...]
 * @author: Kasper Buchholtz
 *
 **/

type MenuButtonProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const MenuButton = ({ isOpen, setIsOpen }: MenuButtonProps) => {
  return (
    <button
      aria-controls="menu"
      aria-expanded="true"
      aria-label={isOpen ? 'Luk menu' : 'Åben menu'}
      data-isopen={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      className="relative z-999999999 size-11.5 group cursor-pointer my-auto"
    >
      <span
        className={`block absolute transition-all h-0.5 w-full bg-skovgaard-dark group-hover:bg-skovgaard-turkis transform duration-700 ease-custom ${isOpen ? 'rotate-45 ' : '-translate-y-1.5 group-hover:w-10'}`}
        aria-hidden="true"
      />
      <span
        className={`block absolute transition-all h-0.5 w-full bg-skovgaard-dark group-hover:bg-skovgaard-turkis transform duration-700 ease-custom ${isOpen ? 'opacity-0 ' : ''}`}
        aria-hidden="true"
      />
      <span
        className={`block absolute transition-all h-0.5 w-full bg-skovgaard-dark group-hover:bg-skovgaard-turkis transform duration-700 ease-custom ${isOpen ? '-rotate-45 ' : 'translate-y-1.5 group-hover:w-5'}`}
        aria-hidden="true"
      />
    </button>
  )
}

export default MenuButton

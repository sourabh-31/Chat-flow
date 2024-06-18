function Header({ children }) {
  return (
    <header className="bg-[#f3f3f3] absolute top-0 left-0 right-0 z-20 py-2">
      {children}
    </header>
  );
}

export default Header;

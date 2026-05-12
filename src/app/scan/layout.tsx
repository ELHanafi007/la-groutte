export default function ScanLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Scanner page bypasses the global Navbar/Footer — it renders full screen */}
      {children}
    </>
  );
}

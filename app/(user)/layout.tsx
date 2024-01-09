import ProtectedRoute from "@/components/Providers/ProtectedRoute";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProtectedRoute>
        {children}
      </ProtectedRoute>
    </>
  )
}
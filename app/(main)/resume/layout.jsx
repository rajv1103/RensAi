import { HashLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="px-5">
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
            <HashLoader color="green" size={100} />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}

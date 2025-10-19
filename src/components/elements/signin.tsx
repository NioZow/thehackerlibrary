import { X, Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
}

export default function SignInPopup({
  isOpen,
  setIsOpen,
  message = "Sign in to continue to your account",
}: IProps) {
  return (
    isOpen && (
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-10 text-white overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:rotate-90 z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="relative flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-5 border border-white/20 shadow-lg">
                <FaGithub className="w-9 h-9" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-400 mt-3 text-center text-sm leading-relaxed max-w-xs">
                {message}
              </p>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-950">
            <button
              onClick={() => signIn("github")}
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden border border-gray-700"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Github
                size={22}
                className="group-hover:rotate-12 transition-transform duration-300 relative z-10"
              />
              <span className="relative z-10">Continue with GitHub</span>
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export const Button: React.FC<{
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'normal' | 'popup' | 'red';
  children: React.ReactNode;
}> = ({ onClick, type = 'button', variant = 'normal', children }) => {
  switch (variant) {
    case 'normal':
      return (
        <button
          type={type}
          className="group flex w-full items-center rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 font-medium text-white hover:from-green-400 hover:to-blue-600 hover:text-white"
          onClick={onClick}
        >
          <span className="flex w-full items-center justify-center rounded-md bg-neutral-800 px-6 py-3 transition-all group-hover:bg-opacity-0">
            {children}
          </span>
        </button>
      );
    case 'popup':
      return (
        <button
          type="button"
          className="group flex w-fit items-center rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 font-medium text-white hover:from-green-400 hover:to-blue-600 hover:text-white"
          onClick={onClick}
        >
          <span className="flex w-fit items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm transition-all group-hover:bg-opacity-0">
            {children}
          </span>
        </button>
      );
    case 'red':
      return (
        <button
          type="button"
          className="rounded-lg border-2 border-red-500 px-4 py-2 text-sm font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white"
          onClick={onClick}
        >
          {children}
        </button>
      );
  }
};

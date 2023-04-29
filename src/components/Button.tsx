type Variant = 'normal' | 'small' | 'small-red';

const computeOuterClasses = (variant: Variant) => {
  const base =
    'group flex items-center rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 font-medium hover:from-green-400 hover:to-blue-600 text-white';

  switch (variant) {
    case 'normal':
      return `${base} w-full text-gray-800`;
    case 'small':
      return `${base} w-fit text-gray-900`;
    case 'small-red':
      return 'rounded-lg border-2 border-red-500 px-4 py-2 text-sm font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white';
  }
};

const computeInnerClasses = (variant: Variant) => {
  const base =
    'flex w-full items-center justify-center rounded-md transition-all group-hover:bg-opacity-0';

  switch (variant) {
    case 'normal':
      return `${base} px-6 py-3 bg-neutral-800`;
    case 'small':
      return `${base} px-4 py-2 text-sm bg-neutral-900`;
    case 'small-red':
      return '';
  }
};

export const Button: React.FC<{
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  children: React.ReactNode;
}> = ({ onClick, type = 'button', variant = 'normal', children }) => (
  <button type={type} className={computeOuterClasses(variant)} onClick={onClick}>
    <span className={computeInnerClasses(variant)}>{children}</span>
  </button>
);

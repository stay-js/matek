import { Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';

export const Popup: React.FC<{
  isOpen: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsOpen, isLoading, isSuccess }) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" />
      </Transition.Child>

      <div className="content fixed inset-0 grid place-items-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-neutral-900 p-6 shadow-xl">
            <div className="flex flex-col gap-2">
              <Dialog.Title className="text-lg font-bold text-neutral-50">
                {isLoading
                  ? 'Feldolgozás alatt...'
                  : isSuccess
                  ? 'Sikeresen elküldve'
                  : 'Hiba csúszott a gépezetbe'}
              </Dialog.Title>

              <Dialog.Description className="mb-0 text-sm text-neutral-200">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-2 ">
                    <svg className="h-8 w-8 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="stroke-green-500 opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        strokeWidth="4"
                      />
                      <path
                        className="fill-green-500"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Feldolgozás alatt...
                  </div>
                ) : isSuccess ? (
                  'Válaszait sikeresen feldolgoztuk. Az ön által megadott e-mail címre elküldtük az eredményeket.'
                ) : (
                  <>
                    Sikertelen, kérjük próbálja újra később! Ha a probléma továbbra is fennáll
                    küldjön emailt az alábbi e-mail címre{' '}
                    <Link
                      className="bg-gradient-to-r from-teal-400 to-green-500 bg-clip-text text-transparent"
                      href="mailto:nagyzeteny6@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      nagyzeteny6@gmail.com
                    </Link>
                    .
                  </>
                )}
              </Dialog.Description>
            </div>

            <button
              type="button"
              className="group flex w-fit items-center rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 font-medium text-white hover:from-green-400 hover:to-blue-600 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex w-fit items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm transition-all group-hover:bg-opacity-0">
                Bezárás
              </span>
            </button>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
);

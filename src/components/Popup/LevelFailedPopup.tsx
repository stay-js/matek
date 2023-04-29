import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@components/Button';

export const LevelFailedPopup: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsDone: (isDone: boolean) => void;
}> = ({ isOpen, setIsOpen, setIsDone }) => (
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
                Úgy tűnik a szint teljesítése nem sikerült
              </Dialog.Title>

              <Dialog.Description className="mb-0 text-sm text-neutral-200">
                Sajnáljuk, de a szint teljesítése nem sikerült. Két lehetőséged van: vagy újra
                próbálod a szintet, vagy befejezed a játékot.
              </Dialog.Description>
            </div>

            <div className="flex gap-2">
              <Button
                variant="small"
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Újra próbálom
              </Button>

              <Button
                variant="small-red"
                onClick={() => {
                  setIsOpen(false);
                  setIsDone(true);
                }}
              >
                Befejezem
              </Button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
);

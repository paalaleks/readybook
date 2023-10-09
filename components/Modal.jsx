'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Modal({ isOpen, setIsOpen, children }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        as="div"
        className="relative z-10"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 cursor-pointer" />
        </Transition.Child>
        <Dialog.Panel className="transform overflow-hidden shadow-xl transition-all fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-floral-white rounded-xl pt-8 px-8 pb-8 max-w-md w-full">
          {children}
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}

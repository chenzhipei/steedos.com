import { Fragment, useState } from 'react'
import { TrashIcon } from '@heroicons/react/outline'
import { Dialog, Transition } from '@headlessui/react'
export default function Trash({title, onRemove}) {

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
        <button className="quantity__button no-js-hidden" name="remove" type="button" onClick={openModal}>
            <TrashIcon className="h-6 w-6" aria-hidden="true"></TrashIcon>
        </button>
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  删除确认
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {title}
                  </p>
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-600">
                        <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={async ()=>{
                      await onRemove();
                      closeModal();
                    }}
                  >
                    继续
                  </button>
                        </dt>
                        <dd class="text-sm font-medium text-gray-900">
                        <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    取消
                  </button>
                        </dd>
                    </div>
                 
                  
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
        </>
    )
}

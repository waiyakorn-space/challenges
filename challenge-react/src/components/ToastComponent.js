import React from 'react';
import { toast } from 'react-toastify';

export const ToastComponent = (message, type) => {
  const Content = () => (
    <>
      <div className="grid grid-cols-8 w-full">
        <div className="col-span-1 flex items-center justify-center">
          {type === 'success' ? (
            <img
              src="icons/circle-check.svg"
              alt="circle-check"
              draggable="false"
            />
          ) : (
            <img src="icons/circle-x.svg" alt="circle-x" draggable="false" />
          )}
        </div>
        <div className="col-span-7 flex w-full flex-col pl-2 text-base text-black md:text-xl">
          <p>{message}</p>
        </div>
      </div>
    </>
  );
  toast.dismiss();
  toast(<Content />, {
    className: `rounded-5 border-l-8 min-w-[360px] ${
      type === 'success' ? 'border-green-600' : 'border-red-600'
    }`,
    closePosition: 'center',
  });
};

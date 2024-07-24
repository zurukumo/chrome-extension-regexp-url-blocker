import React, { useEffect, useState } from 'react';

const Popup: React.FC = () => {
  const [status, setStatus] = useState(true);

  // statusの初期値を取得
  useEffect(() => {
    chrome.storage.local.get(['status'], (data) => {
      if (typeof data.status === 'boolean') setStatus(data.status);
    });
  }, []);

  const turnOn = async () => {
    chrome.storage.local.set({ status: true }, () => setStatus(true));
  };

  const turnOff = async () => {
    chrome.storage.local.set({ status: false }, () => setStatus(false));
  };

  return (
    <div className="flex w-[300px] flex-col items-center gap-y-10 bg-slate-100 py-6">
      <h1 className="text-2xl font-bold">RegExp URL Filter</h1>
      <div className="flex flex-col items-center gap-y-2">
        <p className="text-base">
          Current Status:{' '}
          {status ? (
            <span className="text-green-600">Working</span>
          ) : (
            <span className="text-red-600">Stopped</span>
          )}
        </p>
        <div
          onClick={status ? turnOff : turnOn}
          className="block h-10 w-40 cursor-pointer rounded border border-amber-500 bg-amber-400 text-center leading-10 text-white hover:border-amber-600 hover:bg-amber-500"
        >
          Turn {status ? 'Off' : 'On'}
        </div>
      </div>
      <a
        className="block h-10 w-40 cursor-pointer rounded border border-gray-300 bg-white text-center leading-10 text-black hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        href="/options.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to Settings
      </a>
    </div>
  );
};

export default Popup;

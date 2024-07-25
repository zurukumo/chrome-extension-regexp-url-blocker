import React, { useEffect, useState } from 'react';

const Popup: React.FC = () => {
  const [until, setUntil] = useState<Date>(new Date('1900-01-01T00:00:00Z'));

  const hours = String(until.getHours()).padStart(2, '0'); // 時間を取得し、2桁に整形
  const minutes = String(until.getMinutes()).padStart(2, '0'); // 分を取得し、2桁に整形
  const untilString = `${hours}:${minutes}`;

  // untilの初期値を取得
  useEffect(() => {
    chrome.storage.local.get(['until'], (data) => {
      if (data.until) setUntil(new Date(data.until));
    });
  }, []);

  const disable = async () => {
    const newUntil = new Date(Date.now() + 60 * 1000);
    chrome.storage.local.set({ until: newUntil.toString() }, () =>
      setUntil(newUntil)
    );
  };

  return (
    <div className="flex w-[300px] flex-col items-center gap-y-10 bg-slate-100 py-6">
      <h1 className="text-2xl font-bold">RegExp URL Filter</h1>
      <div className="flex flex-col items-center gap-y-2">
        <p className="text-base">
          Current Status:{' '}
          {until < new Date() ? (
            <span className="text-green-600">Active</span>
          ) : (
            <span className="text-red-600">Disabled until {untilString}</span>
          )}
        </p>
        <div
          onClick={disable}
          className="block h-10 w-40 cursor-pointer rounded border border-amber-500 bg-amber-400 text-center leading-10 text-white hover:border-amber-600 hover:bg-amber-500"
        >
          Disable for a minute
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

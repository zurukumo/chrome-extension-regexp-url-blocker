import React, { FormEventHandler, useEffect, useState } from 'react';

const Options: React.FC = () => {
  const [patterns, setPatterns] = useState<string[]>([]);
  const [regexp, setRegexp] = useState('');
  const [target, setTarget] = useState('');

  const validate = (pattern: string) => {
    try {
      new RegExp(pattern);
      return true;
    } catch (e) {
      return false;
    }
  };

  const [isMatch, setIsMatch] = useState(false);
  const isEmpty = regexp === '';
  const isInvalid = !validate(regexp);

  // patternsの初期値を取得
  useEffect(() => {
    chrome.storage.local.get(['patterns'], (data) => {
      if (Array.isArray(data.patterns)) setPatterns(data.patterns as string[]);
    });
  }, []);

  useEffect(() => {
    if (!isEmpty && !isInvalid) {
      setIsMatch(new RegExp(regexp).test(target));
    }
  }, [regexp, target, isEmpty, isInvalid]);

  const addRegexp: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (regexp === '') return;

    const newPatterns = [...patterns, regexp];
    chrome.storage.local.set({ patterns: newPatterns }, () => {
      setPatterns(newPatterns);
      setRegexp('');
    });
  };

  const deleteRegexp = async (index: number) => {
    const newPatterns = patterns.filter((_, i) => i !== index);
    chrome.storage.local.set({ patterns: newPatterns }, () => {
      setPatterns(newPatterns);
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-y-10 bg-slate-100 py-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* 入力エリア */}
      <form
        onSubmit={addRegexp}
        className="flex w-[800px] flex-col items-center gap-y-2"
      >
        <div className="flex gap-x-4">
          <label className="h-10 w-44 text-right text-base leading-10">
            URL RegExp
          </label>
          <input
            type="text"
            placeholder="(twitter|x)\.com"
            value={regexp}
            onChange={(e) => setRegexp(e.target.value)}
            className="h-10 w-96 border px-4 text-base leading-10"
          />
          <div className="h-10 w-40 px-4 text-center text-base leading-10">
            {isEmpty ? (
              <span className="text-red-500">Empty</span>
            ) : isInvalid ? (
              <span className="text-red-500">Invalid</span>
            ) : (
              <span className="text-green-500">Valid</span>
            )}
          </div>
        </div>
        <div className="flex gap-x-4">
          <label className="h-10 w-44 text-right text-base leading-10">
            Target URL - For Test
          </label>
          <input
            type="text"
            placeholder="https://x.com/zurukumo"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="h-10 w-96 border px-4 text-base leading-10"
          />
          <div className="h-10 w-40 px-4 text-center text-base leading-10">
            {isEmpty || isInvalid ? (
              <span className="text-gray-500">None</span>
            ) : isMatch ? (
              <span className="text-green-500">Matched</span>
            ) : (
              <span className="text-red-500">Not Matched</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isEmpty || isInvalid}
          className="h-10 w-40 cursor-pointer rounded border border-gray-300 bg-white text-center leading-10 text-black hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        >
          Add URL RegExp
        </button>
      </form>

      {/* 一覧テーブル */}
      <div className="flex w-[800px] flex-col items-center gap-y-[2px] border">
        {/* テーブルヘッダー */}
        <div className="flex w-full items-center bg-gray-500 py-2">
          <div className="w-[700px] px-4 text-base leading-10 text-white">
            URL RegExp
          </div>
          <div className="w-[100px]">
            <div className="h-10 w-20 cursor-pointer rounded text-center text-base leading-10 text-white">
              Action
            </div>
          </div>
        </div>
        {/* テーブルボディー */}
        {patterns.map((pattern, index) => (
          <div key={index} className="flex w-full items-center bg-white py-2">
            <div className="w-[700px] break-words px-4 text-base leading-10">
              {pattern}
            </div>
            <div className="w-[100px]">
              <div
                className="h-10 w-20 cursor-pointer rounded bg-red-600 text-center leading-10 text-white hover:bg-red-700"
                onClick={() => deleteRegexp(index)}
              >
                Delete
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-[800px] text-center text-base">
        If you have any feedback, please share it at{' '}
        <a
          href="https://github.com/zurukumo/chrome-extension-regexp-url-blocker"
          rel="noopener noreferrer"
          target="_blank"
          className="text-blue-600 hover:underline dark:text-blue-500"
        >
          GitHub
        </a>{' '}
        or{' '}
        <a
          href="https://x.com/zurukumo"
          rel="noopener noreferrer"
          target="_blank"
          className="text-blue-600 hover:underline dark:text-blue-500"
        >
          X
        </a>
        .
      </div>
    </div>
  );
};

export default Options;

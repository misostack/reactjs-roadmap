import React from 'react';

export default function StateManagementFormValidation() {
  return (
    <div className="container">
      <div className="flex justify-center">
        <div className="lg:w-1/3 md:w-2/3 w-full p-8 shadow">
          <h1 className="mb-4">Nhan thong bao va qua tang dinh ky</h1>
          <p className="text-gray-400 mb-4">
            Bang cach dang ky thanh vien cua cong dong NEXTJSVIETNAM
          </p>
          <form>
            <div className="mb-4">
              <input
                type="text"
                id="fullname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your name"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <button className="bg-red-600 text-white leading-8 block w-full">
                Subcribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

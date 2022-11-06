import React from "react";

export default function Title() {
  return (
    <nav className="font-mono text-white flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-slate-900 shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <a
          href="/home"
          className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
        >
          To-Do List 📋
        </a>
      </div>
      {
        // Enable sub header navigation
        /* <div>
                <a href="/one" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">One</a>
                <a href="/two" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Two</a>
                <a href="/three" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Three</a>
        </div> */
      }
    </nav>
  );
}

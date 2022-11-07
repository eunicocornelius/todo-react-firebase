import React from "react";

function Notification({ notif }) {
  return (
    // Unhide on trigger
    <div
      className={`bg-transparent text-center lg:px-4 rounded-md ${
        notif === true ? "" : "invisible"
      }`}
    >
      <div
        className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none rounded-full flex lg:inline-flex"
        role="alert"
      >
        <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3 animate-pulse">
          Warning
        </span>
        <span className="font-semibold mr-2 text-left flex-auto">
          Todo already exists...
        </span>
      </div>
    </div>
  );
}

export default Notification;

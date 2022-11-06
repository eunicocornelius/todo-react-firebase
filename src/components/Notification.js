import React from "react";

function Notification() {
  return (
    // Unhide on trigger
    <div class="bg-yellow-900 text-center py-2 lg:px-4 rounded-md hidden">
      <div
        class="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex"
        role="alert"
      >
        <span class="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3 animate-pulse">
          Warning
        </span>
        <span class="font-semibold mr-2 text-left flex-auto">
          The todo title you are trying to add already existed!
        </span>
      </div>
    </div>
  );
}

export default Notification;

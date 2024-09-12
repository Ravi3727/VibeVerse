import React from "react";

function SearchBar() {
  return (
    <>
      <div>
        <div className="flex flex-col p-2">
          <div
            className="bg-white items-center border-2 border-opacity-60 border-black justify-between w-9/12 h-12 flex rounded-full shadow-lg p-2 mb-5 sticky"
            style={{ top: "5px" }}
          >
            <div>
              <div className="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer">
                <svg
                  className="h-6 w-6 text-black opacity-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <input
              className="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-900 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs h-8"
              type="text"
              placeholder="Search"
            />
            <div className="bg-black opacity-90 p-2 hover:bg-black-600 hover:opacity-50 cursor-pointer mx-2 rounded-full">
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="pt-2 relative mx-auto text-gray-600 flex flex-row w-9/12 justify-evenly ">
        <input className="border-2 border-gray-300 bg-white w-full h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search" name="search" placeholder="Search"/>
        <button type="submit" className="ml-4">
        <svg className="text-gray-300 text-3xl h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
            viewBox="0 0 56.966 56.966"  xml:space="preserve" width="512px" height="512px"
            >
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div> */}
    </>
  );
}

export default SearchBar;

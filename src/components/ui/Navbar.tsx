import React from 'react'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import { BsYoutube } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { changeSearchTerm, clearSearchTerm, clearVideos } from '../../store'
import { getSearchPageVideos } from '../../store/reducers/getSearchPageVideos'

export const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

    const handleSearch = () => {
        if (location.pathname !== "/search") navigate("/search");
        else {
          dispatch(clearVideos());
          dispatch(getSearchPageVideos(false));
        }
    };
    return (
        <div className='flex justify-between items-center px-14 h-14 bg-[#212121] opacity-95 sticky top-0 z-50'>
            <div className="flex gap-8 items-center text-2xl">
                
                <Link to='/'>
                    <div className="flex gap-1 items-center justify-center">
                        <BsYoutube className='text-3xl text-red-600' />
                        <span className="text-xl font-medium">YouTube</span>
                    </div>
                </Link>
            </div>
            <div className="flex items-center justify-center gap-5">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                >
                    <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0">
                        <div className="flex gap-4 items-center pr-5">
                            <div>
                                <AiOutlineSearch className='text-xl' />
                            </div>
                            <input type="text" placeholder='Search' className="w-96 bg-zinc-900 focus:outline-none border-none" value={searchTerm} onChange={(e) => dispatch(changeSearchTerm(e.target.value))}/>
                            <AiOutlineClose 
                                className={`text-xl cursor-pointer ${
                                    !searchTerm ? "invisible" : "visible"
                                }`}
                                onClick={() => dispatch(clearSearchTerm())}
                            />
                        </div>
                        <button className="h-10 w-16 flex items-center justify-center bg-zinc-800">
                            <AiOutlineSearch className='text-xl' />
                        </button>
                    </div>
                </form>
                
            </div>
            <div className="flex gap-5 items-center text-xl">
                
            </div>
        </div>
    )
}

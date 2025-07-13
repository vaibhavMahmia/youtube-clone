import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [recommend, setRecommend] = useState('');
  const [videoId, setVideoId] = useState('');
  const navigate = useNavigate();
  const handleSetKey = () => {
    localStorage.setItem('apiKey',apiKey);
    setApiKey('');
  }
  const handleSetRecommend = () => {
    localStorage.setItem('recommend', recommend);
    setRecommend('');
  }
  return (
    <div className='p-4 w-1/4 bg-[#77747441] bg-opacity-80 backdrop-blur-md'>
      <div className='p-1 w-full gap-2'>
        <input type="text" placeholder='set your API key' value={apiKey} className='text-white bg-[#ffffff00] bg-opacity-100 backdrop-blur-md p-0.5 rounded w-3/4' onChange={(e) => setApiKey(e.target.value)}/>
        <button className='w-1/4 text-white bg-[#ff723a] bg-opacity-80 backdrop-blur-md rounded' onClick={handleSetKey}>Set</button>
      </div>
      <div className='p-1 w-full gap-0.5'>
        <input type="text" placeholder='set your homepage recommendation' value={recommend} className='text-white bg-[#ffffff00] bg-opacity-100 backdrop-blur-md p-0.5 rounded w-3/4' onChange={(e) => setRecommend(e.target.value)}/>
        <button className='w-1/4 text-white bg-[#ff723a] bg-opacity-80 backdrop-blur-md rounded' onClick={handleSetRecommend}>Set</button>
      </div>
      <div className='p-1 w-full gap-0.5'>
        <input type="text" placeholder='direct video id' value={videoId} className='text-white bg-[#ffffff00] bg-opacity-100 backdrop-blur-md p-0.5 rounded w-3/4' onChange={(e) => setVideoId(e.target.value)}/>
        <button className='w-1/4 text-white bg-[#238366] bg-opacity-80 backdrop-blur-md rounded' onClick={() => {navigate(`/watch/${videoId}`); setVideoId('');}}>Go</button>
      </div>
      <br />
      <hr />
      <br />
      <div className='items-center text-center p-1'>
          <div>
            <table>
              <thead>
                <tr>
                  <th className='text-white bg-[#fa445c] bg-opacity-80 backdrop-blur-md'>key</th>
                  <th className='text-white bg-[#fa445c] bg-opacity-80 backdrop-blur-md'>value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='text-white bg-[#ffffff00] bg-opacity-100 backdrop-blur-md'>api_key</td>
                  <td className='text-white bg-[#ffffff00] bg-opacity-100 backdrop-blur-md'>{localStorage.getItem('apiKey') && localStorage.getItem('apiKey')}</td>
                </tr>
                <tr>
                  <td className='text-white bg-[#ffffff00] bg-opacity-100 backdrop-blur-md'>recommended</td>
                  <td className='text-white bg-[#ffffff00] bg-opacity-100 backdrop-blur-md'>{localStorage.getItem('recommend') && localStorage.getItem('recommend')}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
      <br />
      <hr />
      <br />
      <div className='items-center text-center'>
        <h3 className='text-blue-500 underline'><a href="https://developers.google.com/youtube/v3/getting-started" target='_blank'>how to generate youtube api key v4?</a></h3>
      </div>
      <br />
      <hr />
      <br />
      <div className='items-center text-center'>
        <h1 className='sign text-white bg-[#00000000] bg-opacity-100 backdrop-blur-md rounded'>author: <span className='text-slate-300'>vaibhav</span><span className='text-slate-400'>M</span></h1>
      </div>
    </div>
  )
}
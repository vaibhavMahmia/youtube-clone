import React, { useState } from 'react'

export const Sidebar: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [recommend, setRecommend] = useState('');
  const handleSetKey = () => {
    localStorage.setItem('apiKey',apiKey);
    setApiKey('');
  }
  const handleSetRecommend = () => {
    localStorage.setItem('recommend', recommend);
    setRecommend('');
  }
  return (
    <div className='p-4 w-2/5'>
      <div className='p-1 w-full gap-0.5'>
        <input type="text" placeholder='Set your API key' value={apiKey} className='text-white bg-red-900 p-0.5 rounded w-3/4' onChange={(e) => setApiKey(e.target.value)}/>
        <button className='w-1/4 text-red-900 bg-white rounded' onClick={handleSetKey}>Set</button>
      </div>
      <div className='p-1 w-full gap-0.5'>
        <input type="text" placeholder='Set your homepage recommendation' value={recommend} className='text-white bg-red-900 p-0.5 rounded w-3/4' onChange={(e) => setRecommend(e.target.value)}/>
        <button className='w-1/4 text-red-900 bg-white rounded' onClick={handleSetRecommend}>Set</button>
      </div>
      <br />
      <hr />
      <br />
      <div className='items-center text-center p-3'>
          <div>
            <table>
              <thead>
                <tr>
                  <th>KEY</th>
                  <th>VALUE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>API KEY</td>
                  <td>{localStorage.getItem('apiKey') && localStorage.getItem('apiKey')}</td>
                </tr>
                <tr>
                  <td>Recommended</td>
                  <td>{localStorage.getItem('recommend') && localStorage.getItem('recommend')}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
      <br />
      <hr />
      <br />
      <div className='items-center text-center'>
        <h1 className='sign'><span className='text-red-400'>Author: </span><span className='text-red-500'>vaibhav</span><span className='text-red-600'>M</span></h1>
      </div>
    </div>
  )
}
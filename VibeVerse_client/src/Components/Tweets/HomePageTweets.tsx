import react from 'react';
import TweetHomePage from './TweetHomePage';

function HomePageTweets() {
    const URL = "http://localhost:3000/api/v1/tweets/";
  return (
    <div className='w-full h-full'>
        <TweetHomePage URL = {URL}/>
    </div>
  )
}

export default HomePageTweets;
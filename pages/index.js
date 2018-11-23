import Layout from '../components/PageLayout';

import Link from 'next/link';
// Import fech library
import fetch from 'isomorphic-unfetch';

// New source
const newsSource = 'buzzfeed';


//(free version) API key from  https://newsapi.org/
// Get your own key!
const apiKey = 'ee34a56b67664a7ba03ca0fcebe9a524';


// Build the url which will be used to get the data
// See https://newsapi.org/s/the-irish-times-api
const url = `https://newsapi.org/v2/top-headlines?sources=${newsSource}&apiKey=${apiKey}`;


// Format date function - to be completed
function formatDate(input) {
  const date = new Date(input);

  // To do: output date and time as 01 December 2018 09:00
  const outputDate = `${date.toDateString}`

  return outputDate;
}

// Pass this content as 'props' to child components
const Index = props => (
  <Layout>
    <h3>News from {newsSource.split("-").join(" ")}</h3>
    <div>
      { /* Iterate through articles using Array map) */}
      { /* Display author, publishedAt, image, description, and content */}
      { /* for each story. Also a link for more.. */}
      {props.articles.map((article, index) => (
        <section key={index}>
          <h3>{article.title}</h3>
          { /* Note formatDate used here */ }
          <p className="author">{article.author} {formatDate(article.publishedAt)}</p>
          <img src={article.urlToImage} alt="article image" className="img-article"></img>
          <p>{article.description}</p>
          <p>{article.content}</p>
          <p><Link href="/story"><a>Read More</a></Link></p>
        </section>
      ))}
    </div>

    <style jsx>{`

        section {
          width: 50%;
          border: 1px solid gray;
          background-color: rgb(240, 248, 255);
          padding: 1em;
          margin: 1em;
        }

      .author {
          font-style: italic;
          font-size: 0.8em;
        }
      .img-article {
          max-width: 50%;
        }
    `}</style>
  </Layout>
  );
  // Get initial data on server side using an AJAX call
  // This will initialise the 'props' for the News page         
  Index.getInitialProps = async function() {
    
    // Make async call
    const res = await fetch(url);
  
    // get json data when it arrives
    const data = await res.json();
    // Log on server side (Node.js + Express)
    console.log(`Show data fetched. Count: ${data.articles.length}`);
  
    // return an array of the articles contained in the data
    // see https://newsapi.org/s/the-irish-times-api for json
    return {
      articles: data.articles
    }
  }
  
export default Index;

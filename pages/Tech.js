import Layout from '../components/PageLayout';

import Link from 'next/link';

import fetch from 'isomorphic-unfetch';


const newsSource = 'techradar';
const newsSource2 = 'buzzfeed';

const apiKey = 'ee34a56b67664a7ba03ca0fcebe9a524';


const url = `https://newsapi.org/v2/top-headlines?sources=${newsSource,newsSource2}&apiKey=${apiKey}`;


function formatDate(input) {
  const date = new Date(input);

 
  const outputDate = `${date.toDateString}`

  return outputDate;
}


const Tech = props => (
  <Layout>
    <h3>News from {newsSource.split("-").join(" ")}</h3>
    <div>
    
      {props.articles.map((article, index) => (
        <section key={index}>
          <h3>{article.title}</h3>
          
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
      
  Tech.getInitialProps = async function() {
    
    
    const res = await fetch(url);
   
    const data = await res.json();
   
    console.log(`Show data fetched. Count: ${data.articles.length}`);
  
    
    return {
      articles: data.articles
    }
  }
  
export default Tech;

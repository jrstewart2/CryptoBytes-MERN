import { useState, useEffect } from 'react';
import axios from 'axios';
import NewsDisplay from './NewsDisplay.jsx'
import { Container, Col, Row } from 'react-bootstrap';

const News = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        console.log('Loaded');
        setArticles([])
        const getArticles = async () => {
            const response = await axios.get('http://localhost:4417/news');
            //console.log("RES: ", response)
            const data = response.data.articles;
            //console.log("DATA: ", data)
            let cloneArticles = articles;
            for (let i = 0; i < data.length; i++){
                if (data[i].author){
                let newArticle = {
                    author: data[i].author,
                    date: data[i].date,
                    title: data[i].title,
                    source: data[i].url
                }
                
                cloneArticles.push(newArticle);
                }
            }
            setArticles(cloneArticles);
            //console.log(articles);
        };
    getArticles();
    }, []);


    return (
        <div>
         <Container>
              <Row xs={'auto'} md={'auto'} className="g-4">
                {
                    articles.map((item, key) => (
                        <Col>
                            <NewsDisplay
                                id= {key}
                                author={item.author}
                                date={item.date}
                                title={item.title}
                                source={item.source}
                                />
                        </Col>
                    ))
                }
              </Row>
          </Container>
        </div>
    )
}

export default News;
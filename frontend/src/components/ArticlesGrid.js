import React from "react";
import { Container, Row, Col, Alert, Figure, Button } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import '../components-css/ArticleGrid.css';

const ARTICLES = gql`
query Articles{
    articles{
      data{
        id
          attributes{
            title
            content
            image{
              data{
                attributes{
                  url
                }
              }
            }
          }
      }
    }
  }
`

export const ArticlesGrid = () => {
    const {loading, error, data} = useQuery(ARTICLES);
    if(loading) return (
        <Container>
            <Alert variant="primary" className="m-5 text-center">Loading please wait... ⌛</Alert>
        </Container>
    );
    if (error) return (
        <Container>
            <Alert variant="danger">⚠️ Error detected: {JSON.stringify(error)}</Alert>
        </Container>
    );

    if(data.articles.data.length > 0)
        return (
            <Container fluid>
                <Row sm={1} md={2} lg={3}>
                    {data.articles.data.map((article) => (
                        <Col key={article.id}>
                            <div className="border bg-dark p-2 m-2 text-white">
                                <h3 className="text-center">{article.attributes.title}</h3>
                                {article.attributes.image.data && (
                                    <Figure>
                                        <Figure.Image
                                        alt={article.attributes.title}
                                        src={`${process.env.REACT_APP_BACKEND_URL}${article.attributes.image.data.attributes.url}`}
                                        rounded
                                        />
                                        <Figure.Caption>
                                            Picture: {article.attributes.title}
                                        </Figure.Caption>
                                    </Figure>
                                )}
                                <p>{article.attributes.content.substring(0,90)}...</p>
                                <div className="d-grid">
                                <Button
                                variant="outline-light"
                                href={`/articles/${article.id}`}
                                >
                                    More info
                                </Button>   
                                </div>
                               
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
        else{
            return (
                <Container>
                    <Alert variant="info" className="text-center">Oi lads. Apologies but we had to sell all o' the articles ☕🧐</Alert>
                </Container>
            )
        }
}
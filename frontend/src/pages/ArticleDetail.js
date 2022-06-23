import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Alert, Figure} from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

const ARTICLE = gql`
  query Article($id: ID!) {
    article(id: $id) {
      data {
        id
        attributes {
          title
          content
          note
          category {
            data {
              id
              attributes {
                name
                description
              }
            }
          }
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export default function ArticleDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(ARTICLE, { variables: { id: id } });
  if(loading) return (
    <Container>
      <Alert variant="primary" className="m-5 text-center">Loading please wait... ⌛</Alert>
    </Container>
  )
  if (error) return (
    <Container>
        <Alert variant="danger">⚠️ Error detected: {JSON.stringify(error)}</Alert>
    </Container>
  );
  const article = data.article.data;
  return (
    <Row>
      <h2 className="text-white bg-dark p-3 m-3 text-center">{article.attributes.title}</h2>
      <Col className="text-white">
        <h5>Short description: {article.attributes.category.data.attributes.description}</h5>
        <p>{article.attributes.note}</p>
        <ReactMarkdown
          children={article.attributes.content}
          remarkPlugins={[remarkGfm]}
        />
      </Col>
      <Col>
        {article.attributes.image.data && (
          <Figure>
            <Figure.Image
              alt={article.attributes.title}
              src={`${process.env.REACT_APP_BACKEND_URL}${article.attributes.image.data.attributes.url}`}
              rounded
            />
            <Figure.Caption>Picture: {article.attributes.title}</Figure.Caption>
          </Figure>
        )}
      </Col>
    </Row>
  );
}

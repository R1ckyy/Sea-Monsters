import React from "react";
import { Container, Alert,} from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

const HOMEPAGE = gql`
query Homepage {
    homepage {
      data {
        attributes {
          content
        }
      }
    }
  }
`

export default function Homepage () {
    const {loading, error, data} = useQuery(HOMEPAGE);
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
    return (
        <Container className="text-white p-4 homepage">
            <ReactMarkdown
                children={data.homepage.data.attributes.content}
                remarkPlugins={[remarkGfm]}
            />
        </Container>
    );
}
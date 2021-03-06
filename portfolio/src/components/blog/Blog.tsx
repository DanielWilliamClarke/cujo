import React, { Component, Fragment } from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { Card, CardColumns, Col, Nav, Row } from "react-bootstrap";
import moment from "moment";

import { BlogServiceProps } from "./BlogService";
import BlogPost from "./BlogPost";
import { Post } from "../../model/BlogPostModel";

import { SharePanel } from "../nav/SharePanel";

import "../shared/Portfolio.scss";
import "./Blog.scss";

const Fade = require("react-reveal/Fade");

type BlogState = {
  blog: Post[];
};

type BlogRouteParams = { id: string };

class Blog extends Component<
  BlogServiceProps & RouteComponentProps,
  BlogState
> {
  componentWillMount(): void {
    this.setBlogState([]);
    this.props.service
      .FetchAllBlogPosts()
      .then(this.setBlogState.bind(this))
      .catch((err) => console.log(err));
  }

  render(): JSX.Element {
    return (
      <Fragment>
        <Switch location={this.props.location}>
          <Route
            exact
            path={`${this.props.match.path}`}
            children={this.blogPosts.bind(this)}
          />
          <Route
            path={`${this.props.match.path}/:id`}
            children={this.showPost.bind(this)}
          />
        </Switch>
      </Fragment>
    );
  }

  private setBlogState(blog: Post[]) {
    this.setState({ blog });
  }

  private showPost({
    match,
  }: RouteComponentProps<BlogRouteParams>): JSX.Element {
    return (
      <BlogPost service={this.props.service} id={parseInt(match.params.id)} />
    );
  }

  private blogSummaryPanel(data: Post): JSX.Element {
    return (
      <Fade bottom>
        <Card key={data.id} bg="dark">
          {data.mediaUrl && (
            <Nav navbarScroll>
              <Nav.Link
                href={`${this.props.match.url}/${data.id}#blogpost`}
              >
                <Card.Img variant="top" src={data.mediaUrl} />
              </Nav.Link>
            </Nav>
          )}
          <Card.Body>
            <Nav navbarScroll>
              <Nav.Link
                href={`${this.props.match.url}/${data.id}#blogpost`}
              >
                <Card.Title>{data.title}</Card.Title>
              </Nav.Link>
            </Nav>
            <Card.Text>
              Published {this.toDateSentence(data.date)}{" "}
            </Card.Text>
            <Card.Text
              className="text-muted"
              dangerouslySetInnerHTML={{
                __html: data.excerpt,
              }}
            />
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Last updated {this.toDateSentence(data.modified)}
            </small>
          </Card.Footer>
        </Card>
      </Fade>
    );
  }

  private blogPosts(): JSX.Element {
    return (
      <section id="blog" className="section blog">
        <SharePanel
          url={window.location.href}
          title="Blog"
          body="A blog about software engineering, magic, family life and other hobbies"
          hashtag="DCTechBlog"
        />
        <Fade bottom>
          <Row>
            <Col>
              <h2 className="section-title">Blog</h2>
              <div className="centered line" />
            </Col>
          </Row>
          <CardColumns className="section-content">
            {this.state.blog.map(
              (data: Post): JSX.Element => (
                <Fragment>{this.blogSummaryPanel(data)}</Fragment>
              )
            )}
          </CardColumns>
        </Fade>
      </section>
    );
  }

  private toDateSentence(date: string): string {
    if (date === "Present") {
      return date;
    }
    return moment(date).format("Do MMMM YYYY HH:mm:ss");
  }
}

export default withRouter(Blog);

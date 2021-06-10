import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StickyContainer, Sticky } from "react-sticky";
import WPAPI from "wpapi";

import { SketchBackstretch } from "./components/backstretch/SketchBackstretch";
import { CVProps } from "./model/CVModel";
import { NavPanel } from "./components/nav/NavPanel";
import { Copyright } from "./components/backstretch/Copyright";

import { Profile } from "./components/profile/Profile";
import Blog from "./components/blog/Blog";
import { BlogService } from "./components/blog/BlogService";

import "./App.scss";

declare global {
  interface Window {
    _env_: any;
  }
}

export class App extends Component<CVProps> {
  private bService: BlogService;

  constructor(props: CVProps) {
    super(props);
    this.bService = new BlogService(
      new WPAPI({
        endpoint: `${window._env_.WORDPRESS_HOST}/wp-json`,
      })
    );
  }

  render(): JSX.Element {
    return (
      <div>
        <SketchBackstretch cv={this.props.cv}></SketchBackstretch>
        <StickyContainer>
          <Router>
            <Sticky>
              {({ style }) => <NavPanel style={style}></NavPanel>}
            </Sticky>
            <div className="app">
              <Switch>
                <Route exact path="/">
                  <Profile cv={this.props.cv} />
                </Route>
                <Route path="/blog">
                  <Blog service={this.bService} />
                </Route>
              </Switch>
              <footer id="footer">
                <Copyright />
              </footer>
            </div>
          </Router>
        </StickyContainer>
      </div>
    );
  }
}

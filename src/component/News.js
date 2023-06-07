import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProp = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}
                 &pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    await fetch(url, {
      Method: "GET",
      Headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          totalResults: data.totalResults,
          loading: false,
        });

        console.log(data);
      });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    // this.setProgress(0)

    this.updateNews();
    // this.setProgress(100)
  }

  fetchMore = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    console.log("hey");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    await fetch(url, {
      Method: "GET",
      Headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: this.state.articles.concat(data.articles),
          totalResults: data.totalResults,
          loading: false,
        });
        console.log(data);
      });
  };

  render() {
    return (
      <>
        <div className="container my-4">
          <h2 className="my-4 text-center">Top Headlines</h2>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMore}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 45) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 88)
                            : ""
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}
